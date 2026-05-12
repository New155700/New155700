"use client";

import React, { useState, useMemo } from 'react';

export default function LoveShopUltimate() {
  // --- DATABASE STATE ---
  const [categories, setCategories] = useState([
    { id: 1, name: "PREMIUM APPS", icon: "📺", desc: "แอปพลิเคชันความบันเทิง" },
    { id: 2, name: "GAMING TOPUP", icon: "💎", desc: "เติมเกมออนไลน์ทุกระบบ" },
    { id: 3, name: "GIFT CARDS", icon: "💳", desc: "บัตรเติมเงินต่างประเทศ" }
  ]);

  const [products, setProducts] = useState([
    { id: 101, catId: 1, name: "Netflix Premium 4K", price: 149, stock: 10, img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500" },
    { id: 102, catId: 1, name: "YouTube No Ads", price: 59, stock: 99, img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500" },
    { id: 201, catId: 2, name: "Valorant 1200 VP", price: 320, stock: 50, img: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=500" },
    { id: 301, catId: 3, name: "iTunes $10 Card", price: 350, stock: 5, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500" }
  ]);

  // --- SYSTEM STATE ---
  const [currentPage, setCurrentPage] = useState('home'); 
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");
  const [user, setUser] = useState({
    username: "Premium_User_01",
    balance: 9850,
    history: [] as any[]
  });

  // Form States for Admin
  const [newCatName, setNewCatName] = useState("");
  const [newProd, setNewProd] = useState({ name: "", img: "", price: 0, catId: 1 });

  const filteredProducts = useMemo(() => {
    return activeCat ? products.filter(p => p.catId === activeCat) : products;
  }, [activeCat, products]);

  const handleAdminAuth = () => {
    if (pin === "123456") {
      setIsAdmin(true);
      setCurrentPage('admin_dashboard');
      setPin("");
    } else {
      alert("❌ รหัสผ่านผิดพลาด!");
      setPin("");
    }
  };

  const buyProduct = (product: any) => {
    if (user.balance < product.price) return alert("❌ ยอดเงินไม่เพียงพอ!");
    if (product.stock <= 0) return alert("❌ สินค้าหมดสต็อก!");

    const orderId = "#LS-" + Math.random().toString(36).substr(2, 7).toUpperCase();
    setUser(prev => ({
      ...prev,
      balance: prev.balance - product.price,
      history: [{ id: orderId, name: product.name, price: product.price, time: new Date().toLocaleString() }, ...prev.history]
    }));
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
    alert(`✅ ซื้อสำเร็จ! รหัส: ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-purple-600">
      {/* NAV BAR */}
      <nav className="sticky top-0 z-[100] bg-[#05050a]/80 backdrop-blur-xl border-b border-purple-500/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="text-2xl font-black italic tracking-tighter cursor-pointer" onClick={() => setCurrentPage('home')}>
            LOVE<span className="text-purple-500">SHOP</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <button onClick={() => setCurrentPage('home')} className="hover:text-purple-400">Storefront</button>
            <button onClick={() => setCurrentPage('profile')} className="hover:text-purple-400">My Orders</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-purple-600/5 border border-purple-500/20 px-5 py-2 rounded-2xl flex flex-col items-end">
            <span className="text-[8px] font-black text-purple-500 uppercase">Balance</span>
            <span className="text-lg font-black text-white">{user.balance.toLocaleString()} <span className="text-xs text-purple-400">฿</span></span>
          </div>
          <button onClick={() => isAdmin ? setCurrentPage('admin_dashboard') : setCurrentPage('admin_login')} className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
            {isAdmin ? '⚙️' : '🔒'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-12">
            <div className="relative rounded-[2rem] overflow-hidden p-12 bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/10 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter">THE ULTIMATE <span className="text-purple-500">SHOP</span></h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-4">Premium Digital Goods Delivery</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              <aside className="w-full lg:w-64 space-y-2">
                <button onClick={() => setActiveCat(null)} className={`w-full text-left p-4 rounded-xl font-bold ${!activeCat ? 'bg-purple-600' : 'bg-slate-900'}`}>All Items</button>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCat(cat.id)} className={`w-full text-left p-4 rounded-xl font-bold ${activeCat === cat.id ? 'bg-purple-600' : 'bg-slate-900'}`}>{cat.icon} {cat.name}</button>
                ))}
              </aside>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden group hover:border-purple-500/50 transition-all">
                    <img src={p.img} className="h-48 w-full object-cover" alt="" />
                    <div className="p-6">
                      <h3 className="text-xl font-black uppercase italic">{p.name}</h3>
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-2xl font-black">{p.price} ฿</span>
                        <button onClick={() => buyProduct(p)} className="bg-white text-black px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-purple-600 hover:text-white transition-colors">Buy Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ADMIN LOGIN */}
        {currentPage === 'admin_login' && (
          <div className="max-w-sm mx-auto py-20 text-center">
            <h2 className="text-3xl font-black mb-8">ADMIN ACCESS</h2>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="ENTER PIN" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl mb-4 text-center text-2xl tracking-[1em]" />
            <button onClick={handleAdminAuth} className="w-full bg-purple-600 p-4 rounded-xl font-black">LOGIN</button>
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {currentPage === 'admin_dashboard' && isAdmin && (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-slate-900 p-8 rounded-3xl">
              <h2 className="text-2xl font-black italic">SYSTEM CONTROL</h2>
              <button onClick={() => {setIsAdmin(false); setCurrentPage('home')}} className="text-red-500 font-bold">LOGOUT</button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Add Product Form */}
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                <h3 className="font-black mb-4 uppercase">Add New Product</h3>
                <input placeholder="Name" className="w-full bg-black p-3 rounded-lg mb-2" onChange={e => setNewProd({...newProd, name: e.target.value})} />
                <input placeholder="Image URL" className="w-full bg-black p-3 rounded-lg mb-2" onChange={e => setNewProd({...newProd, img: e.target.value})} />
                <input type="number" placeholder="Price" className="w-full bg-black p-3 rounded-lg mb-4" onChange={e => setNewProd({...newProd, price: Number(e.target.value)})} />
                <button onClick={() => setProducts([...products, { ...newProd, id: Date.now(), stock: 100 }])} className="w-full bg-white text-black p-3 rounded-xl font-black">DEPLOY</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
