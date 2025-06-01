import React from "react";
import Article from "@/components/ArticleComponent/Article";
import AktivitasTable from "@/components/ArticleComponent/AktivitasTable";

const Article3 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">Menghitung TDEE</h2>
          <p className="text-gray-700 mb-4">
            Setelah mengetahui BMR Anda, langkah selanjutnya adalah mengalikannya dengan faktor aktivitas fisik untuk mendapatkan TDEE. Faktor aktivitas ini mencerminkan seberapa aktif gaya hidup Anda sehari-hari.
          </p>
          <div className="mt-6">
            <AktivitasTable />
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Contoh Perhitungan TDEE</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <p className="font-semibold">Misalkan:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>BMR = 1500 kalori</li>
              <li>Level aktivitas = Sedentary (1.2)</li>
              <li>TDEE = 1500 × 1.2 = 1800 kalori/hari</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Tips Menggunakan TDEE</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-semibold">Untuk menurunkan berat badan:</span>
              <p className="text-gray-700 mt-1">Kurangi 500 kalori dari TDEE Anda</p>
            </li>
            <li>
              <span className="font-semibold">Untuk menambah berat badan:</span>
              <p className="text-gray-700 mt-1">Tambahkan 500 kalori ke TDEE Anda</p>
            </li>
            <li>
              <span className="font-semibold">Untuk mempertahankan berat badan:</span>
              <p className="text-gray-700 mt-1">Konsumsi kalori sesuai dengan TDEE Anda</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Penting untuk Diingat</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>TDEE adalah perkiraan, bukan angka yang pasti</li>
            <li>Faktor aktivitas bisa berubah setiap hari</li>
            <li>Perlu penyesuaian berdasarkan hasil dan tujuan Anda</li>
            <li>Konsultasikan dengan ahli gizi untuk hasil yang lebih akurat</li>
          </ul>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="Menghitung TDEE: Panduan Lengkap"
      content={content}
      imageSrc="/tdee3.jpg"
      showBmiTable={false}
    />
  );
};

export default Article3;