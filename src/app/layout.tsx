import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/common/theme-provider';
import Header from '@/components/common/header';
import Nav from '@/components/common/nav';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadataBase = new URL('https://stack-money-flow.vercel.app/'); // ← 실제 배포 도메인으로 바꿔주세요

export const metadata: Metadata = {
  // ■ 기본 제목 설정: default와 template을 분리해 가독성↑
  title: {
    default: '적립식 투자 계산기',
    template: '%s | 나만의 금융 도우미',
  },

  // ■ 설명문: 검색결과에 노출될 문구를 좀 더 구체적으로 작성
  description:
    '매월 일정 금액을 적립 투자하여 10년·20년 후 내 자산 가치를 예측해보세요.',

  // ■ 키워드: SEO 보조용도로 활용
  keywords: [
    '적립식 투자',
    '투자 계산기',
    '나스닥',
    'S&P500',
    '미국 주식',
    '지수 추종',
    'schd',
    '배당 투자',
  ],

  // ■ 저자·발행사 정보
  authors: [{ name: 'Mr.Jeon' }],
  creator: 'DevJerryPro',

  // ■ 기본 URL (metadataBase + alternates.canonical 로 canonical 태그 자동 생성)
  alternates: {
    canonical: '/', // 내 사이트 루트
  },

  // ■ Open Graph (페이스북, 카카오톡 등 링크 공유 시 사용)
  openGraph: {
    title: '적립식 투자 계산기',
    description:
      '매월 적립 투자로 10년 뒤·20년 뒤 자산 가치를 손쉽게 확인하세요.',
    url: '/',
    siteName: '적립식 투자 계산기',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // OG용 이미지 (1200×630 추천)
        width: 1200,
        height: 630,
        alt: '매월 적립 투자로 미래 자산 예측하기',
      },
    ],
  },

  // ■ Twitter Card
  twitter: {
    title: '적립식 투자 계산기',
    description: '매월 적립 투자로 10년·20년 후 자산 가치를 쉽게 계산해보세요.',
  },

  // ■ 파비콘·아이콘
  icons: {
    icon: '/favicon.ico',
  },

  // ■ robots 메타: 검색엔진 로봇 제어
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ■ 기타
  referrer: 'strict-origin-when-cross-origin',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#1a202c' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="z26MSovhLjtSbVs75Zlf-_uVHeNTuswPTSJuPUnc_iM"
        />
        <meta
          name="naver-site-verification"
          content="0b1ef49f9afcceb8a29a4bd2cc45effdb887c74e"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex h-dvh justify-center bg-gray-100">
            <div className="relative w-full max-w-md overflow-auto bg-white shadow-md dark:bg-gray-900">
              <Header />
              <div className="min-h-[calc(100dvh-120px)] bg-white px-8 py-8 dark:bg-gray-900">
                {children}
                <Analytics />
                <SpeedInsights />
              </div>
              <Nav />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
