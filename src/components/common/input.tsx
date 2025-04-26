'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  label: string;
  unit: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder: string;
  isNumberic?: boolean;
}

const NumberInput = ({
  label,
  unit,
  value,
  onChange,
  placeholder = '',
  isNumberic = true,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/,/g, '');

    raw = raw.replace(/[^0-9.]/g, '');

    // 3) 점으로 나눠서 정수/소수 구분
    const [intPart, ...rest] = raw.split('.');
    const fracPart = rest.join(''); // 여러 점 방어용

    // 4) 정수 부분만 천 단위 콤마 적용
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 5) raw 에 점이 하나라도 있으면 점+소수부(빈 문자열도 포함) 붙이기
    const newValue = raw.includes('.')
      ? `${formattedInt}.${fracPart}`
      : formattedInt;

    onChange(newValue);
  };

  return (
    <div className="relative grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="number">{label}</Label>
      <Input
        className={`pr-6 text-gray-700 dark:text-white ${
          value ? 'text-right' : 'text-left'
        }`}
        id="number"
        type="text"
        inputMode={isNumberic ? 'numeric' : 'decimal'}
        pattern="[0-9.,]*"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <span className="absolute top-6.5 right-2.5 dark:text-white">{unit}</span>
    </div>
  );
};

export default NumberInput;
