import React from 'react';

// กำหนด Interface ให้ชัดเจนเพื่อป้องกัน TS Error
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">MyBrand</h1>
        <div className="space-x-6">
          <button className="text-gray-600 hover:text-blue-600 transition">Home</button>
          <button className="text-gray-600 hover:text-blue-600 transition">About</button>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Next.js Build <span className="text-blue-600">Passed</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          โค้ดนี้ปรับปรุงให้รองรับการตรวจสอบจาก GitHub และ ESLint เรียบร้อยแล้ว
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12">
        <FeatureCard 
          title="Fast Performance" 
          description="Server-side rendering support." 
          icon="⚡"
        />
        <FeatureCard 
          title="Responsive" 
          description="Works on all devices." 
          icon="📱"
        />
        <FeatureCard 
          title="Safe Code" 
          description="TypeScript and ESLint friendly." 
          icon="🛡️"
        />
      </section>
    </main>
  );
}
