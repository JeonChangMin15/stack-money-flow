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
    <div className="grid gap-5">
      <NumberInput
        label="초기 투자 금액"
        unit="원"
        value={initialAmount}
        onChange={setInitialAmount}
      />
      <NumberInput
        label="월 적립 금액"
        unit="원"
        value={monthAmount}
        onChange={setMonthAmount}
      />
      <NumberInput
        label="적립 기간"
        unit="년"
        value={investTerm}
        onChange={setInvestTerm}
      />
      <NumberInput
        label="연 평균 수익률"
        unit="%"
        value={averageProfit}
        onChange={setAverageProfit}
      />
      <Button
        className="transition-transform duration-150 active:scale-95 active:shadow-inner dark:active:bg-gray-800"
        variant="secondary"
        onClick={updateInvestResult}
      >
        계산하기
      </Button>
      <div className="grid gap-3 dark:text-white">
        {infoItems.map(({ label, value, unit }) => (
          <div key={label} className="flex gap-3">
            <span>{label}:</span>
            <span className="font-bold text-gray-700 dark:text-white">
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
    </div>
  );
}
