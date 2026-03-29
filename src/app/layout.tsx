import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { AuthModal } from "@/components/AuthModal";
import { AuthSearchParamsSync } from "@/components/AuthSearchParamsSync";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PLACEHOLDER_IMAGES, SITE_URL } from "@/lib/constants";

const siteName = "Crista Home";
const title =
  "Crista Home - Đồ gia dụng gia đình hiện đại, tinh giản và bền bỉ";
const description =
  "Đồ gia dụng gia đình hiện đại, tinh giản và bền bỉ. Thủy tinh, pha lê, gốm sứ cao cấp CRISTA & TEWA. Giao nhanh, đổi trả linh hoạt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  robots: { index: true, follow: true },
  icons: {
    shortcut: "/favicon.ico",
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    locale: "vi_VN",
    type: "website",
    title,
    description,
    url: SITE_URL,
    siteName,
    images: [
      {
        url: "/logo.png",
        width: 200,
        height: 200,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
  other: {
    ...(process.env.NEXT_PUBLIC_SITE_MODIFIED_AT && {
      "article:modified_time": process.env.NEXT_PUBLIC_SITE_MODIFIED_AT,
    }),
    copyright: `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`,
  },
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
            <AuthProvider>
              <Suspense fallback={null}>
                <AuthSearchParamsSync />
              </Suspense>
              <AuthModal />
              <Suspense
                fallback={
                  <div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-100" />
                }
              >
                <Header />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Footer />
            </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
