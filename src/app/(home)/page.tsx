'use client';

import { useState } from 'react';
import NumberInput from '@/components/common/input';
import { Button } from '@/components/ui/button';
import ProfitTable from '@/components/feature/home/table';
import {
  calculateTotal,
  calculateReturnRate,
  calculatePrincipal,
  calculateTotalYearTable,
} from '@/util/calUtils';

import { InfoItem, TotalYearData } from '@/types/type';

export default function Home() {
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [monthAmount, setMonthAmount] = useState<string>('');
  const [investTerm, setInvestTerm] = useState<string>('');
  const [averageProfit, setAverageProfit] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCapital, setTotalCapital] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [yearRecord, setYearRecord] = useState<TotalYearData[]>([]);

  const infoItems: InfoItem[] = [
    { label: '최종 금액', value: totalAmount, unit: '원' },
    { label: '총 수익', value: totalProfit, unit: '원' },
    { label: '투자 원금', value: totalCapital, unit: '원' },
    { label: '수익률', value: rateOfReturn, unit: '%' },
  ];

  const updateInvestResult = () => {
    const total = calculateTotal({
      initialAmount,
      monthAmount,
      investTerm,
      averageProfit,
    });
    const capital = calculatePrincipal({
      initialAmount,
      monthAmount,
      investTerm,
    });
    const ratio = calculateReturnRate({
      initialAmount,
      monthAmount,
      investTerm,
      averageProfit,
    });
    const profit = total - capital;
    const table = calculateTotalYearTable({
      initialAmount,
      monthAmount,
      investTerm,
      averageProfit,
    });
    setTotalAmount(total);
    setTotalProfit(profit);
    setTotalCapital(capital);
    setRateOfReturn(ratio);
    setYearRecord(table);
  };

  return (
    <section className="grid gap-5">
      <NumberInput
        label="초기 투자 금액"
        unit="원"
        value={initialAmount}
        onChange={setInitialAmount}
        placeholder="초기 투자 금액을 입력하세요"
      />
      <NumberInput
        label="월 적립 금액"
        unit="원"
        value={monthAmount}
        onChange={setMonthAmount}
        placeholder="월 적립 금액을 입력하세요"
      />
      <NumberInput
        label="적립 기간"
        unit="년"
        value={investTerm}
        onChange={setInvestTerm}
        placeholder="적립 기간을 입력하세요"
      />
      <NumberInput
        label="연 평균 수익률"
        unit="%"
        value={averageProfit}
        onChange={setAverageProfit}
        placeholder="연 평균 수익률을 입력하세요"
        isNumberic={false}
      />
      <Button
        className="btn-pressable"
        variant="secondary"
        onClick={updateInvestResult}
      >
        계산하기
      </Button>
      <div className="grid gap-3 dark:text-white">
        {infoItems.map(({ label, value, unit }) => (
          <div key={label} className="flex items-baseline">
            {/* w-24 (6rem) 정도가 한글 레이블 최대 길이에 맞춰 충분할 거예요 */}
            <span className="inline-block min-w-18 text-right">{label}:</span>
            <span className="ml-2 font-bold text-gray-700 dark:text-white">
              {value > 0 ? `${value.toLocaleString()} ${unit}` : ''}
            </span>
          </div>
        ))}
      </div>
      {yearRecord.length > 0 && (
        <div className="grid gap-4">
          <span className="text-xl">연도별 투자 성과</span>
          <ProfitTable yearRecord={yearRecord} />
        </div>
      )}
    </section>
  );
}
