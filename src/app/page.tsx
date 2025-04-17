"use client";

import { useState } from "react";
import NumberInput from "@/components/common/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [initialAmount, setInitialAmount] = useState<string>("");
  const [monthAmount, setMonthAmount] = useState<string>("");
  const [investTerm, setInvestTerm] = useState<string>("");
  const [averageProfit, setAverageProfit] = useState<string>("");

  return (
    <div className="grid gap-5 bg-white dark:bg-gray-900 px-8 pt-8">
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
      <Button variant="secondary">계산하기</Button>
    </div>
  );
}
