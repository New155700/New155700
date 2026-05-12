import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">MyBrand</h1>
        <div className="space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition">Home</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition">About</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          สร้างเว็บไซต์ด้วย <span className="text-blue-600">Next.js & Tailwind</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          นี่คือตัวอย่างหน้าเริ่มต้นที่เขียนด้วย TypeScript รองรับ Responsive และปรับแต่งง่ายสุดๆ
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-blue-700 transition">
            เริ่มใช้งานเลย
          </button>
          <button className="border border-gray-300 bg-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition">
            เรียนรู้เพิ่มเติม
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12">
        <FeatureCard 
          title="Fast Performance" 
          description="โหลดหน้าเว็บได้รวดเร็วด้วยการทำ Server-side Rendering" 
          icon="⚡"
        />
        <FeatureCard 
          title="Responsive Design" 
          description="แสดงผลได้สวยงามทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์" 
          icon="📱"
        />
        <FeatureCard 
          title="Modern Stack" 
          description="ใช้เทคโนโลยีล่าสุดอย่าง React 18 และ TypeScript" 
          icon="🛠️"
        />
      </section>
    </main>
  );
}

// Sub-component สำหรับการ์ดฟีเจอร์
function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:scale-105 transition-transform">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
