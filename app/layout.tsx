import './globals.css';
import React from 'react';

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
      <body>{children}</body>
    </html>
  );
}
