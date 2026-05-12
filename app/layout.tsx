import './globals.css';
import React from 'react';
import Providers from './providers';

export const metadata = {
  title: 'NNSHOP | Premium Store',
  description: 'Premium Store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
