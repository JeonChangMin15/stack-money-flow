export type InfoItem = {
  label: string;
  value: number;
  unit: string;
};

export interface TotalYearData {
  /** 연차 (1부터 시작) */
  year: number;
  /** 해당 연도 말 예상 총액 */
  totalAmount: number;
  /** 해당 연도 말 누적 원금 대비 수익률 (%) */
  rateOfReturn: number;
}
