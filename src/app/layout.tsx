import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common/theme-provider";
import Header from "@/components/common/header";
import Nav from "@/components/common/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "적립식 투자 계산기",
  description: "적립식 투자 계산기 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <main className="flex justify-center bg-gray-100 h-dvh">
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-md overflow-auto">
              <Header />
              <div className="min-h-[calc(100dvh-120px)] bg-white dark:bg-gray-900 px-8 py-8">
                {children}
              </div>
              <Nav />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
