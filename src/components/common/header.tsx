import { ModeToggle } from './darkMode';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 text-black shadow-sm dark:bg-gray-900 dark:text-white">
      <h1 className="text-lg font-semibold">적립식 계산기</h1>
      <ModeToggle />
    </header>
  );
}
