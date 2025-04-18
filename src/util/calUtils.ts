import { TotalYearData } from "@/types/type";

interface TotalParams {
  initialAmount: string;
  monthAmount: string;
  investTerm: string;
  averageProfit: string;
}

function parseNumber(value: string): number {
  const cleaned = value.trim().replace(/,/g, ""); // 콤마 제거

  return parseFloat(cleaned);
}

/**
 * 초기 투자금액, 월 적립 금액, 투자 기간(년), 수익률(%)을 받아
 * 만기 총액(FV)을 계산합니다.
 *
 * FV = P0 * (1 + r/12)^(12*n)
 *    + PMT * [ ((1 + r/12)^(12*n) - 1) / (r/12) ]
 */
export function calculateTotal({
  initialAmount,
  monthAmount,
  investTerm,
  averageProfit,
}: TotalParams): number {
  const P0 = parseNumber(initialAmount); // 초기 원금
  const PMT = parseNumber(monthAmount); // 매월 적립액
  const years = parseNumber(investTerm); // 기간(년)
  const annualRate = parseNumber(averageProfit) / 100; // 연 수익률(소수)

  const months = years * 12;
  const monthlyRate = annualRate / 12;

  if (monthlyRate === 0) {
    return Math.floor(P0 + PMT * months);
  }

  const fvLump = P0 * Math.pow(1 + monthlyRate, months);
  const fvAnnuity =
    PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return Math.floor(fvLump + fvAnnuity);
}

export function calculateReturnRate({
  initialAmount,
  monthAmount,
  investTerm,
  averageProfit,
}: TotalParams): number {
  const P0 = parseNumber(initialAmount);
  const PMT = parseNumber(monthAmount);
  const years = parseNumber(investTerm);

  const totalMonths = years * 12;
  const totalPrincipal = P0 + PMT * totalMonths;

  const fv = calculateTotal({
    initialAmount,
    monthAmount,
    investTerm,
    averageProfit,
  });
  const profit = fv - totalPrincipal;

  return Math.floor((profit / totalPrincipal) * 100);
}

export function calculatePrincipal({
  initialAmount,
  monthAmount,
  investTerm,
}: Omit<TotalParams, "averageProfit">): number {
  const P0 = parseNumber(initialAmount); // 초기 원금
  const PMT = parseNumber(monthAmount); // 매월 적립액
  const years = parseNumber(investTerm); // 투자 기간(년)

  const months = years * 12;
  return Math.floor(P0 + PMT * months);
}

export const calculateTotalYearTable = ({
  initialAmount,
  monthAmount,
  investTerm,
  averageProfit,
}: TotalParams): TotalYearData[] => {
  const P0 = parseNumber(initialAmount); // 초기 원금
  const PMT = parseNumber(monthAmount); // 매월 적립액
  const years = parseNumber(investTerm); // 기간(년)
  const annualRate = parseNumber(averageProfit) / 100; // 연 수익률(소수)

  const monthlyRate = annualRate / 12;

  const table: TotalYearData[] = [];

  for (let y = 1; y <= years; y++) {
    const months = y * 12;

    // 누적 원금(총 납입액)
    const totalPrincipal = P0 + PMT * months;

    // 원금에 대한 복리 계산
    const fvLump = P0 * Math.pow(1 + monthlyRate, months);
    // 적립식(annuity) 계산
    const fvAnnuity =
      monthlyRate === 0
        ? PMT * months
        : PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalAmount = fvLump + fvAnnuity;

    // 수익률 계산
    const profit = totalAmount - totalPrincipal;
    const rateOfReturn = (profit / totalPrincipal) * 100;

    table.push({
      year: y,
      totalAmount: Math.floor(totalAmount),
      rateOfReturn: Math.floor(rateOfReturn),
    });
  }

  return table;
};
