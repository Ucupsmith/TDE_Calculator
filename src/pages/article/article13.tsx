import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article13 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">Perubahan TDEE Seiring Bertambahnya Usia</h2>
          <p className="text-gray-700 mb-4">
            Seiring bertambahnya usia, tubuh kita mengalami berbagai perubahan, termasuk pada laju metabolisme dan Total Daily Energy Expenditure (TDEE). Umumnya, TDEE cenderung menurun seiring bertambahnya usia. Ada beberapa alasan utama di balik fenomena ini:
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Faktor Penyebab Penurunan TDEE pada Lansia</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Penurunan Massa Otot (Sarkopenia):</span> Massa otot adalah jaringan yang aktif secara metabolik, membakar lebih banyak kalori bahkan saat istirahat dibandingkan jaringan lemak. Penurunan massa otot yang sering terjadi seiring usia akan menurunkan BMR (Basal Metabolic Rate), komponen terbesar dari TDEE.</li>
            <li><span className="font-semibold">Penurunan Tingkat Aktivitas Fisik:</span> Banyak individu cenderung menjadi kurang aktif seiring bertambahnya usia karena berbagai faktor, termasuk kesehatan atau perubahan gaya hidup. Ini mengurangi jumlah kalori yang dibakar melalui Exercise Activity Thermogenesis (EAT) dan Non-Exercise Activity Thermogenesis (NEAT).</li>
            <li><span className="font-semibold">Perubahan Hormonal:</span> Perubahan kadar hormon tertentu seiring usia juga dapat memengaruhi metabolisme.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Implikasi dan Rekomendasi</h2>
          <p className="text-gray-700 mb-4">
            Penurunan TDEE seiring usia berarti kebutuhan kalori harian juga menurun. Mengonsumsi jumlah kalori yang sama seperti saat muda bisa menyebabkan penambahan berat badan.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Fokus pada Kualitas Nutrisi:</span> Karena anggaran kalori lebih rendah, penting untuk memilih makanan yang padat nutrisi untuk memastikan asupan vitamin dan mineral yang cukup.</li>
            <li><span className="font-semibold">Prioritaskan Latihan Kekuatan:</span> Melatih kekuatan membantu mempertahankan atau bahkan meningkatkan massa otot, yang dapat membantu menjaga BMR tetap tinggi.</li>
            <li><span className="font-semibold">Tetap Aktif:</span> Cari cara untuk tetap aktif secara fisik dalam kehidupan sehari-hari untuk meningkatkan NEAT dan total pengeluaran energi.</li>
          </ul>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="Pengaruh Usia terhadap Kebutuhan TDEE"
      content={content}
      imageSrc="/tdee1.png"
      showBmiTable={false}
    />
  );
};

export default Article13;