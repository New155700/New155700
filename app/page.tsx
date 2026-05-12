"use client";

import React from 'react';
import { ShoppingCart, User, Settings } from 'lucide-react';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>🚀 ยินดีด้วย! เว็บไซต์ของคุณออนไลน์แล้ว</h1>
      <p>ถ้าเห็นหน้านี้ แสดงว่าแก้ปัญหา 404 สำเร็จ</p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
        <ShoppingCart size={32} />
        <User size={32} />
        <Settings size={32} />
      </div>
    </main>
  );
}
