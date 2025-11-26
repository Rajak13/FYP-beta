import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elevare - Collaborative Learning Platform',
  description: 'A comprehensive platform for collaborative learning and academic success',
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/favicon-for-public/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-for-public/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
