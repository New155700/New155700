"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { ShoppingCart, ShieldCheck, LogIn, LogOut, Package, Home } from "lucide-react";

export default function UnifiedPage() {
  const { data: session } = useSession();
  const [view, setView] = useState("home");

  if (view === "admin" && session?.user?.role === "OWNER") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-purple-500">NNSHOP ADMIN</h1>
          <button onClick={() => setView("home")} className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2">
            <Home size={18}/> กลับหน้าหลัก
          </button>
        </div>
        <div className="bg-[#111] p-10 rounded-3xl border border-white/5">
          <h2 className="text-xl mb-4 text-gray-400">ยินดีต้อนรับท่านเจ้าของร้าน</h2>
          <p className="text-4xl font-bold">ระบบจัดการกำลังเตรียมพร้อม...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="flex justify-between items-center p-6 border-b border-white/5">
        <div className="text-2xl font-black text-purple-500">NNSHOP</div>
        <div className="flex gap-4">
          {!session ? (
            <button onClick={() => signIn("google")} className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2">
              <LogIn size={18}/> Login
            </button>
          ) : (
            <div className="flex items-center gap-4">
              {session.user?.role === "OWNER" && (
                <button onClick={() => setView("admin")} className="text-purple-400 font-bold flex items-center gap-2">
                  <ShieldCheck size={18}/> หลังบ้าน
                </button>
              )}
              <button onClick={() => signOut()} className="text-red-500"><LogOut size={20}/></button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-10 text-center">
        <h1 className="text-6xl font-black mb-10">Premium <span className="text-purple-600">Store</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ {n: "Netflix", p: "150"}, {n: "YouTube", p: "45"}, {n: "Disney+", p: "99"} ].map((item, i) => (
            <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5">
              <Package className="text-purple-500 mb-4" size={32}/>
              <h3 className="text-2xl font-bold">{item.n}</h3>
              <p className="text-3xl font-black my-4">{item.p} ฿</p>
              <button className="w-full bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all">สั่งซื้อ</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
