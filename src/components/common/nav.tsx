'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ChartLine, PieChart } from 'lucide-react';
import clsx from 'clsx';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 z-50 mx-auto w-full max-w-sm border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between px-6 py-2">
        {navItems.map(({ icon: Icon, label, route }) => {
          const isActive = pathname === route;

          return (
            <Link key={route} href={route}>
              <button
                className={clsx(
                  'flex flex-col items-center justify-center text-sm transition-colors',
                  isActive
                    ? 'font-semibold text-blue-500 dark:text-white'
                    : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                )}
              >
                <Icon className="mb-1 h-5 w-5" />
                <span>{label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const navItems = [
  { icon: Home, label: '홈', route: '/' },
  { icon: PieChart, label: '포트폴리오', route: '/portfolio' },
  { icon: ChartLine, label: '분석', route: '/analyze' },
];
