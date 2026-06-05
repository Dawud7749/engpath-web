import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EngPath — Learn together. Compete better.',
  description: 'Platform belajar bahasa Inggris untuk dua orang — bersaing, saling review, dan track progress bersama.',
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <body className="h-full flex flex-col overflow-hidden">{children}</body>
    </html>
  );
}
