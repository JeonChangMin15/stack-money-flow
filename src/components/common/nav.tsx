"use client";

import { Home, ChartLine, PieChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 w-full max-w-sm mx-auto bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex justify-between items-center px-6 py-2">
        {navItems.map(({ icon: Icon, label, route }) => {
          const isActive = pathname === route;

          return (
            <Link key={route} href={route}>
              <button
                className={clsx(
                  "flex flex-col items-center justify-center text-sm transition-colors",
                  isActive
                    ? "text-blue-500 dark:text-white font-semibold"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
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
  { icon: Home, label: "홈", route: "/" },
  { icon: PieChart, label: "포트폴리오", route: "/portfolio" },
  { icon: ChartLine, label: "분석", route: "/analyze" },
];
