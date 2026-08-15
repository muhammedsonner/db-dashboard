import React, { useEffect } from "react";
import { supabase } from "./supabase";

function App() {
  useEffect(() => {
    const veritabaniTest = async () => {
      console.log("Supabase'e bağlanılıyor...");

      const { data, error } = await supabase
        .from("kritik_stok_kontrol")
        .select("*");

      if (error) {
        console.log("Bağlantı Hatası", error.message);
      } else {
        console.log("Başarılı! Gelen Veri: ", data);
      }
    };

    veritabaniTest();
  }, []);

  return (
    <div className="bg-amber-300 font-bold text-4xl underline">
      Hello World!
    </div>
  );
}

export default App;
