import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100dvh-120px)] flex-col items-center justify-center p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="mb-4 text-6xl font-extrabold">404</h1>
      <p className="mb-8 text-lg">죄송합니다. 페이지를 찾을 수 없습니다.</p>
      <Link href="/">
        <Button className="btn-pressable" variant="secondary">
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
