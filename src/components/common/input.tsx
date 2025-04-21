'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  label: string;
  unit: string;
  value: string;
  onChange: (newValue: string) => void;
}

const NumberInput = ({ label, unit, value, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/,/g, '');
    const cleaned = onlyNums.replace(/\D/g, '');
    const withCommas = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    onChange(withCommas);
  };

  return (
    <div className="relative grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="number">{label}</Label>
      <Input
        className="pr-6 text-right text-gray-700 dark:text-white"
        id="number"
        type="text"
        inputMode="numeric"
        pattern="[0-9,]*"
        value={value}
        onChange={handleChange}
      />
      <span className="absolute top-6.5 right-2.5 dark:text-white">{unit}</span>
    </div>
  );
};

export default NumberInput;
