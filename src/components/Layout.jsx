import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const menuler = [
    {
      isim: "Ana Özet",
      yol: "/",
      ikon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      isim: "Ürün Yönetimi",
      yol: "/urunler",
      ikon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
    {
      isim: "Sipariş İşlemleri",
      yol: "/siparis",
      ikon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sol Yan Menü (Sidebar) */}
      <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-400 tracking-wider">
            STORE<span className="text-white">DB</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Yönetim Paneli</p>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          {menuler.map((menu) => {
            const aktifMi = location.pathname === menu.yol;
            return (
              <Link
                key={menu.yol}
                to={menu.yol}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  aktifMi
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={menu.ikon}
                  />
                </svg>
                <span className="font-medium">{menu.isim}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sağ Taraf - İçerik Alanı (Sayfalar Buraya Gelecek) */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
