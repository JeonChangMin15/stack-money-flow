import { ModeToggle } from "./darkMode";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">적립식 계산기</h1>
      <ModeToggle />
    </header>
  );
}
