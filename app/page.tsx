import React from 'react';
import Link from 'next/link';

// กำหนดโครงสร้างข้อมูลสำหรับ Card เพื่อให้โค้ดดูเป็นระเบียบ
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "Fast Performance",
    description: "รองรับการทำงานที่รวดเร็วด้วย Next.js App Router",
    icon: "⚡"
  },
  {
    id: 2,
    title: "Modern UI",
    description: "ออกแบบด้วย Tailwind CSS สวยงามและแก้ไขง่าย",
    icon: "🎨"
  },
  {
    id: 3,
    title: "GitHub Ready",
    description: "โครงสร้างโค้ดผ่านมาตรฐานการ Build และ ESLint",
    icon: "✅"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <header className="border-b border-gray-100">
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            MyDevProject
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition">
              Home
            </Link>
            <Link 
              href="https://github.com/New155700" 
              target="_blank"
              className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
            >
              GitHub Profile
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-6 tracking-tight">
            Build Something <span className="text-blue-600">Great</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            โปรเจกต์นี้เริ่มต้นขึ้นเพื่อสร้างสรรค์นวัตกรรมใหม่ๆ 
            รองรับระบบอัตโนมัติและโครงสร้างเว็บที่ทันสมัย
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div 
              key={item.id} 
              className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:border-blue-200 transition-all shadow-sm"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 mt-10">
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} New155700. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
