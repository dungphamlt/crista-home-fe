import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Crista Home - Đồ gia dụng gia đình hiện đại',
  description:
    'Đồ gia dụng gia đình hiện đại, tinh giản và bền bỉ. Thủy tinh, pha lê, gốm sứ cao cấp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <CartProvider>
            <Suspense fallback={<div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-100" />}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
