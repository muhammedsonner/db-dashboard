import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Dashboard() {
  const [kritikStoklar, setKritikStoklar] = useState([]);
  const [istatistikler, setIstatistikler] = useState({
    urun: 0,
    sube: 0,
    siparis: 0,
  });
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const verileriGetir = async () => {
      try {
        // 1. Kritik stokları çekiyoruz
        const { data: stokData, error: stokError } = await supabase
          .from("kritik_stok_kontrol")
          .select("*");

        if (stokError) throw stokError;

        // 2. İstatistikleri hesaplamak için sadece satır sayılarını çekiyoruz (head: true veriyi indirmez, sadece sayar)
        const { count: urunSayisi } = await supabase
          .from("urun")
          .select("*", { count: "exact", head: true });
        const { count: subeSayisi } = await supabase
          .from("sube")
          .select("*", { count: "exact", head: true });
        const { count: siparisSayisi } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true });

        if (stokData) setKritikStoklar(stokData);
        setIstatistikler({
          urun: urunSayisi || 0,
          sube: subeSayisi || 0,
          siparis: siparisSayisi || 0,
        });
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error.message);
      } finally {
        setYukleniyor(false);
      }
    };

    verileriGetir();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Mağaza Yönetim Paneli
        </h1>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Kart 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Toplam Kayıtlı Ürün
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {yukleniyor ? "..." : istatistikler.urun}
              </h3>
            </div>
          </div>

          {/* Kart 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Aktif Şube Sayısı
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {yukleniyor ? "..." : istatistikler.sube}
              </h3>
            </div>
          </div>

          {/* Kart 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Toplam Alınan Sipariş
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {yukleniyor ? "..." : istatistikler.siparis}
              </h3>
            </div>
          </div>
        </div>

        {/* Kritik Stok Tablosu */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-red-50/50">
            <h2 className="text-lg font-semibold text-red-700 flex items-center gap-2">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              Kritik Stok Uyarısı (25 Adet ve Altı)
            </h2>
          </div>

          <div className="p-0">
            {yukleniyor ? (
              <div className="p-8 text-center text-slate-500">
                Veriler yükleniyor...
              </div>
            ) : kritikStoklar.length === 0 ? (
              <div className="p-8 text-center text-emerald-600 font-medium">
                Kritik seviyede ürün bulunmuyor.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                      <th className="p-4 border-b border-slate-200 font-medium">
                        Şube
                      </th>
                      <th className="p-4 border-b border-slate-200 font-medium">
                        Ürün
                      </th>
                      <th className="p-4 border-b border-slate-200 font-medium text-right">
                        Stok Adedi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {kritikStoklar.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 text-slate-700 font-medium">
                          {item.sube_ismi}
                        </td>
                        <td className="p-4 text-slate-600">{item.urun_ismi}</td>
                        <td className="p-4 text-right">
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-700">
                            {item.adet}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
