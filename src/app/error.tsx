'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100dvh-120px)] flex-col items-center justify-center p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="mb-4 text-4xl font-bold">문제가 발생했습니다</h1>
      <p className="mb-6 text-center text-base">
        죄송합니다. 페이지를 로드하는 중에 오류가 발생했습니다.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          className="btn-pressable"
          variant="secondary"
        >
          다시 시도
        </Button>
        <Link href="/">
          <Button className="btn-pressable">홈으로 이동</Button>
        </Link>
      </div>
    </div>
  );
}
