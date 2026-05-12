import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NNSHOP | Premium Store',
  description: 'ระบบร้านค้าอันดับ 1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="bg-[#050505] text-white">
        {children}
      </body>
    </html>
  )
}
