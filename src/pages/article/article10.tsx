import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article10 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">TDEE dan Proses Metabolik</h2>
          <p className="text-gray-700 mb-4">
            Total Daily Energy Expenditure (TDEE) adalah ukuran ilmiah dari total energi yang dikeluarkan tubuh Anda dalam sehari. Angka ini bukan sekadar target kalori; ia mencerminkan kompleksitas proses metabolik yang terjadi di dalam tubuh untuk menjaga Anda tetap hidup dan berfungsi.
          </p>
          <p className="text-gray-700 mb-4">
            Metabolisme adalah serangkaian reaksi kimia yang mengubah makanan menjadi energi. Proses ini terjadi setiap saat, bahkan saat istirahat total, dan TDEE adalah cerminan dari total energi yang digunakan dalam semua proses metabolik tersebut, ditambah dengan energi untuk aktivitas fisik dan pencernaan.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Komponen Ilmiah TDEE</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Basal Metabolic Rate (BMR):</span> Energi yang dibutuhkan untuk fungsi vital organ saat istirahat. Ini adalah bagian terbesar dari TDEE dan diukur dalam kondisi basal.</li>
            <li><span className="font-semibold">Thermic Effect of Food (TEF):</span> Energi yang digunakan untuk mencerna, menyerap, dan memproses nutrisi dari makanan. TEF menyumbang sekitar 10% dari TDEE.</li>
            <li><span className="font-semibold">Exercise Activity Thermogenesis (EAT):</span> Kalori yang dibakar selama olahraga terstruktur. Ini sangat bervariasi antar individu.</li>
            <li><span className="font-semibold">Non-Exercise Activity Thermogenesis (NEAT):</span> Kalori yang dibakar dari semua aktivitas fisik selain olahraga terstruktur, seperti berjalan, berdiri, mengetik, dll. NEAT bisa sangat memengaruhi TDEE harian.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Keterkaitan dengan Metabolisme</h2>
          <p className="text-gray-700 mb-4">
            Semua komponen TDEE adalah manifestasi dari laju metabolik tubuh Anda. Faktor-faktor seperti usia, jenis kelamin, komposisi tubuh (rasio otot terhadap lemak), genetika, dan kondisi hormonal dapat memengaruhi laju metabolik dan, consequently, TDEE Anda.
          </p>
          <p className="text-gray-700">
            Memahami ilmu di balik TDEE membantu Anda menghargai bahwa manajemen berat badan dan energi adalah hasil dari interaksi kompleks proses biologis, bukan sekadar angka di kalkulator. Ini memungkinkan pendekatan yang lebih terinformasi terhadap diet dan gaya hidup.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="The Science Behind TDEE and Metabolism"
      content={content}
      imageSrc="/tdee10.jpg"
      showBmiTable={false}
    />
  );
};

export default Article10;