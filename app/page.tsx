"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { ShoppingCart, ShieldCheck, LogIn, LogOut, Package, Home } from "lucide-react";

export default function UnifiedPage() {
  const { data: session } = useSession();
  const [view, setView] = useState("home");

  // --- หน้าหลังบ้าน ---
  if (view === "admin" && session?.user?.role === "OWNER") {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold italic text-purple-500">NNSHOP ADMIN</h1>
          <button onClick={() => setView("home")} className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 font-bold"><Home size={18}/> กลับหน้าหลัก</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-8 rounded-2xl border border-white/5 text-center">
            <p className="text-gray-400">ยอดขายวันนี้</p>
            <h2 className="text-5xl font-black mt-2">0 ฿</h2>
          </div>
        </div>
      </div>
    );
  }

  // --- หน้าหลัก / หน้าซื้อของ ---
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <nav className="flex justify-between items-center p-6 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-black text-purple-500 italic">NNSHOP</div>
        <div className="flex gap-4 items-center">
          {!session ? (
            <button onClick={() => signIn("google")} className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-all"><LogIn size={18}/> Login with Google</button>
          ) : (
            <div className="flex items-center gap-4">
              {session.user?.role === "OWNER" && (
                <button onClick={() => setView("admin")} className="bg-purple-600/20 text-purple-400 border border-purple-500/50 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-600 hover:text-white transition-all"><ShieldCheck size={18}/> จัดการร้าน</button>
              )}
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">ยินดีต้อนรับ</span>
                <span className="text-sm font-bold">{session.user?.name}</span>
              </div>
              <button onClick={() => signOut()} className="bg-red-500/10 text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all"><LogOut size={20}/></button>
            </div>
          )}
        </div>
      </nav>

      <div className="text-center py-24 px-4">
        <h1 className="text-7xl font-black mb-6 tracking-tighter uppercase">Premium <span className="text-purple-600">Accounts</span></h1>
        <p className="text-gray-400 text-xl max-w-xl mx-auto">ระบบออโต้ ปลอดภัย 100% มั่นใจได้ทุกการสั่งซื้อ</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 pb-20">
        {[ {n: "Netflix 4K", p: "150"}, {n: "YouTube Premium", p: "45"}, {n: "Disney+ Hotstar", p: "99"} ].map((item, i) => (
          <div key={i} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 hover:border-purple-500/50 transition-all group">
            <div className="bg-purple-500/10 w-fit p-4 rounded-2xl mb-6 text-purple-500 group-hover:scale-110 transition-transform"><Package size={32}/></div>
            <h3 className="text-2xl font-bold mb-2">{item.n}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-white">{item.p}</span>
              <span className="text-gray-500 font-bold">฿ / เดือน</span>
            </div>
            <button className="w-full bg-white/5 py-4 rounded-2xl font-bold hover:bg-purple-600 transition-all flex items-center justify-center gap-3"><ShoppingCart size={20}/> สั่งซื้อทันที</button>
          </div>
        ))}
      </div>
    </div>
  );
}
