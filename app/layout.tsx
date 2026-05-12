import React from 'react';

export const metadata = {
  title: 'ร้านค้าของฉัน',
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
