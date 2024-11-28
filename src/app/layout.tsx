'use client';

import '@/app/dashboard/globals.css';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/lib/authContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={cn('bg-gray-50', poppins.variable)}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
