"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { ShoppingCart, ShieldCheck, LogIn, LogOut, Package, Home } from "lucide-react";

interface CustomUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string; 
}

export default function UnifiedPage() {
  const { data: session } = useSession();
  const [view, setView] = useState("home");
  const user = session?.user as CustomUser;

  // ส่วนแสดงผลสำหรับเจ้าของร้าน (Admin View)
  if (view === "admin" && user?.role === "OWNER") {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">แผงควบคุมเจ้าของร้าน</h1>
          <button 
            onClick={() => setView("home")} 
            className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-gray-200 transition-all"
          >
            <Home size={18}/> กลับหน้าหลัก
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-white/10 text-center">
            <p className="text-gray-400">ยอดขายรวม</p>
            <h2 className="text-4xl font-bold">0 ฿</h2>
          </div>
        </div>
      </div>
    );
  }

  // ส่วนแสดงผลหน้าแรก (Store View)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex justify-between items-center p-6 border-b border-white/5">
        <div className="text-2xl font-black text-purple-500 italic">NNSHOP</div>
        <div className="flex gap-4">
          {!session ? (
            <button 
              onClick={() => signIn("google")} 
              className="bg-white text-black px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all"
            >
              <LogIn size={18}/> เข้าสู่ระบบ
            </button>
          ) : (
            <div className="flex items-center gap-4">
              {user?.role === "OWNER" && (
                <button 
                  onClick={() => setView("admin")} 
                  className="text-purple-400 font-bold border border-purple-400 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-purple-400/10 transition-all"
                >
                  <ShieldCheck size={18}/> หลังบ้าน
                </button>
              )}
              <button 
                onClick={() => signOut()} 
                className="text-red-500 bg-red-500/10 p-2 rounded-full hover:bg-red-500/20 transition-all"
              >
                <LogOut size={18}/>
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="text-center py-20">
        <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">
          Premium <span className="text-purple-600">Store</span>
        </h1>
        <p className="text-gray-500 text-xl font-medium">เลือกซื้อสินค้าพรีเมียมได้ที่นี่</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {[ 
          { name: "Netflix", price: "150" }, 
          { name: "YouTube", price: "45" }, 
          { name: "Disney+", price: "99" } 
        ].map((item, i) => (
          <div key={i} className="bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-purple-500/50 transition-all group">
            <Package className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" size={32}/>
            <h3 className="text-2xl font-bold">{item.name}</h3>
            <p className="text-3xl font-black my-4 text-white">{item.price} ฿</p>
            <button className="w-full bg-white/5 py-3 rounded-xl font-bold hover:bg-purple-600 transition-all flex items-center justify-center gap-2">
              <ShoppingCart size={18}/> สั่งซื้อตอนนี้
            </button>
          </div>
        ))}
      </div>
    </div>
  ); 
}
