"use client";
import React from 'react';
import { ShoppingCart, User, ShieldCheck, Zap, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ส่วนหัว (Header) */}
      <nav className="flex justify-between items-center p-6 border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="text-2xl font-black italic text-purple-500">NNSHOP</div>
        <div className="flex gap-6 items-center">
           <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all">
             <LogIn size={18} /> เข้าสู่ระบบด้วย Google
           </button>
        </div>
      </nav>

      {/* ส่วนโชว์ของ (Hero) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-24 px-4"
      >
        <h1 className="text-7xl font-black mb-6 tracking-tighter uppercase">
          Premium <span className="text-purple-600">Accounts</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-xl mx-auto">ปลอดภัย มั่นใจ ระบบออโต้ 100%</p>
      </motion.div>

      {/* รายการสินค้า */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <ProductCard name="Netflix 4K" price="150" />
        <ProductCard name="YouTube Premium" price="45" />
        <ProductCard name="Disney+ Hotstar" price="99" />
      </div>
    </div>
  );
}

function ProductCard({ name, price }: { name: string, price: string }) {
  return (
    <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/50 transition-all group">
      <div className="bg-purple-500/10 w-fit p-3 rounded-2xl mb-4 text-purple-500">
        <Zap size={24} />
      </div>
      <h3 className="text-2xl font-bold mb-1">{name}</h3>
      <p className="text-4xl font-black text-white mb-6">{price} ฿</p>
      <button className="w-full bg-white/5 py-4 rounded-2xl font-bold group-hover:bg-purple-600 transition-all flex items-center justify-center gap-2">
        <ShoppingCart size={20} /> สั่งซื้อเลย
      </button>
    </div>
  );
}
