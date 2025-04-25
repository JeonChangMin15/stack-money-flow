// app/head.tsx
export default function Head() {
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '적립식 투자 계산기',
    url: 'https://stack-money-flow.vercel.app/',
    description: '매월 적립식 투자로 10년·20년 후 자산 가치를 예측해보세요.',
    applicationCategory: 'FinanceApplication',
    author: { '@type': 'Person', name: 'Mr.Jeon' },
    image: 'https://stack-money-flow.vercel.app/og-image.png',
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </>
  );
}
