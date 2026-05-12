import React from 'react';
import './globals.css'; // ลบบรรทัดนี้ออกถ้าคุณไม่มีไฟล์ css

export const metadata = {
  title: 'My Shop',
  description: 'Next.js App',
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
