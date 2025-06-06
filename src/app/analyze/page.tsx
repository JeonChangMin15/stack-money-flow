'use client';

import { useState } from 'react';
import NumberInput from '@/components/common/input';
import { Button } from '@/components/ui/button';
import { AnalyzeChart } from '@/components/feature/analyze/chart';
import { calculateTotal } from '@/util/calUtils';

const Analyze = () => {
  const [investTerm, setInvestTerm] = useState<string>('');
  const [id, setId] = useState(2);
  const [simulation, setSimulation] = useState([
    {
      id: 1,
      initialAmount: '',
      monthAmount: '',
      averageProfit: '',
    },
  ]);
  const [simulationResult, setSimulationResult] = useState<
    Record<string, number>[]
  >([]);

  const addSimulation = () => {
    if (id === 4) return;
    setSimulation((prev) => [
      ...prev,
      { id, initialAmount: '', monthAmount: '', averageProfit: '' },
    ]);
    setId((prev) => prev + 1);
  };

  const handleInputSimulation = (value: string, id: number, type: string) => {
    setSimulation((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [type]: value,
            }
          : item
      )
    );
  };

  const analyzeSimulation = () => {
    const years = Number(investTerm);
    if (!years) return;

    const next = Array.from({ length: years }, (_, i) => {
      const year = i + 1;
      const row: Record<string, number> = { year };

      simulation.forEach(
        ({ id, initialAmount, monthAmount, averageProfit }) => {
          row[`sim${id}`] = calculateTotal({
            initialAmount,
            monthAmount,
            investTerm: String(year), // 1년차 → 2년차 … N년차
            averageProfit,
          });
        }
      );

      return row;
    });

    setSimulationResult(next);
  };

  return (
    <section className="grid gap-5">
      <div className="flex justify-between">
        <span className="text-lg">투자 시나리오 비교</span>
        <Button
          className="btn-pressable ml-auto w-[150px]"
          variant="secondary"
          onClick={addSimulation}
          disabled={simulation.length === 3}
        >
          시나리오 추가하기
        </Button>
      </div>
      <NumberInput
        label="적립 기간"
        unit="년"
        value={investTerm}
        onChange={setInvestTerm}
        placeholder="적립 기간을 입력하세요"
      />
      {simulation.map(({ id, initialAmount, monthAmount, averageProfit }) => (
        <div className="grid gap-3 rounded-md p-4 shadow-md" key={id}>
          <span>투자 {id}</span>
          <NumberInput
            label="초기 투자 금액"
            unit="원"
            value={initialAmount}
            onChange={(newValue) =>
              handleInputSimulation(newValue, id, 'initialAmount')
            }
            placeholder="초기 투자 금액을 입력하세요"
          />
          <NumberInput
            label="월 적립 금액"
            unit="원"
            value={monthAmount}
            onChange={(newValue) =>
              handleInputSimulation(newValue, id, 'monthAmount')
            }
            placeholder="월 적립 금액을 입력하세요"
          />
          <NumberInput
            label="연 평균 수익률"
            unit="%"
            value={averageProfit}
            onChange={(newValue) =>
              handleInputSimulation(newValue, id, 'averageProfit')
            }
            placeholder="연 평균 수익률을 입력하세요"
            isNumberic={false}
          />
        </div>
      ))}
      <Button
        className="btn-pressable"
        variant="secondary"
        onClick={analyzeSimulation}
      >
        시뮬레이션 분석하기
      </Button>
      {simulationResult.length > 0 && (
        <div className="grid gap-4">
          <AnalyzeChart simulationResult={simulationResult} />
          <span className="text-xl">투자별 최종 금액</span>
          {simulation.map(
            ({ id, initialAmount, monthAmount, averageProfit }) => (
              <div key={id} className="flex gap-4">
                <span>투자 {id}:</span>
                <span className="font-bold">
                  {calculateTotal({
                    initialAmount,
                    monthAmount,
                    averageProfit,
                    investTerm,
                  }).toLocaleString()}{' '}
                  원
                </span>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Analyze;
