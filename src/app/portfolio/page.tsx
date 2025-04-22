'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import NumberInput from '@/components/common/input';
import TextInput from '@/components/common/textInput';
import { AssetPieChart } from '@/components/feature/portfolio/chart';
import { calculateTotal } from '@/util/calUtils';
import { AssetResult } from '@/types/type';

const Portfolio = () => {
  const [id, setId] = useState(2);
  const [investTerm, setInvestTerm] = useState<string>('');
  const [asset, setAsset] = useState([
    {
      id: 1,
      name: '',
      monthAmount: '',
      averageProfit: '',
    },
  ]);
  const [assetResult, setAssetResult] = useState<AssetResult[]>([]);

  const addAsset = () => {
    setAsset((prev) => [
      ...prev,
      { id, name: '', monthAmount: '', averageProfit: '' },
    ]);
    setId((prev) => prev + 1);
  };

  const handleInputAsset = (value: string, id: number, type: string) => {
    setAsset((prev) =>
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

  const analyzeAsset = () => {
    if (!investTerm) return;

    const results: AssetResult[] = asset.map(
      ({ name, monthAmount, averageProfit }) => {
        const total = calculateTotal({
          // 초기 투자금이 자산별로 없다면 '0'으로 처리
          initialAmount: '0',
          monthAmount,
          investTerm,
          averageProfit,
        });

        return { name, total };
      }
    );

    setAssetResult(results);
  };

  return (
    <section className="grid gap-5">
      <div className="flex justify-between">
        <span className="text-lg">포트폴리오 분석</span>
        <Button
          className="btn-pressable ml-auto w-[150px]"
          variant="secondary"
          onClick={addAsset}
        >
          자산 추가하기
        </Button>
      </div>
      <NumberInput
        label="적립 기간"
        unit="년"
        value={investTerm}
        onChange={setInvestTerm}
      />
      {asset.map(({ id, name, monthAmount, averageProfit }) => (
        <div className="grid gap-3 rounded-md p-4 shadow-md" key={id}>
          <TextInput
            label="자산"
            value={name}
            onChange={(newValue) => handleInputAsset(newValue, id, 'name')}
          />
          <NumberInput
            label="월 적립 금액"
            unit="원"
            value={monthAmount}
            onChange={(newValue) =>
              handleInputAsset(newValue, id, 'monthAmount')
            }
          />
          <NumberInput
            label="연 평균 수익률"
            unit="%"
            value={averageProfit}
            onChange={(newValue) =>
              handleInputAsset(newValue, id, 'averageProfit')
            }
          />
        </div>
      ))}
      <Button
        className="btn-pressable"
        variant="secondary"
        onClick={analyzeAsset}
      >
        포트폴리오 분석하기
      </Button>
      {assetResult.length > 0 && <AssetPieChart assetResult={assetResult} />}
    </section>
  );
};

export default Portfolio;
