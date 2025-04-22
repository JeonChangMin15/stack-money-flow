'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const TextInput = ({ label, value, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="number">{label}</Label>
      <Input
        className="pr-6 text-gray-700 dark:text-white"
        id="number"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
