import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article13 = () => {
  return (
    <Article
      title="TDEE dan Nutrisi untuk Atlet"
      imageSrc="/tdee13.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) memainkan peran kritis dalam performa atlet.
            Memahami kebutuhan energi dan nutrisi yang tepat membantu atlet mencapai
            performa optimal dan pemulihan yang efektif.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Kebutuhan Energi Atlet</h2>
          <p className="text-white text-lg leading-relaxed">
            Faktor-faktor yang mempengaruhi kebutuhan energi atlet:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Jenis Olahraga
              <ul className="list-disc pl-6 mt-2">
                <li>Olahraga ketahanan: 3000-5000 kalori/hari</li>
                <li>Olahraga kekuatan: 2500-4000 kalori/hari</li>
                <li>Olahraga tim: 3000-4500 kalori/hari</li>
                <li>Olahraga ketangkasan: 2000-3500 kalori/hari</li>
              </ul>
            </li>
            <li>Intensitas Latihan
              <ul className="list-disc pl-6 mt-2">
                <li>Latihan ringan: +10-20% dari BMR</li>
                <li>Latihan sedang: +20-30% dari BMR</li>
                <li>Latihan berat: +30-50% dari BMR</li>
                <li>Latihan sangat berat: +50-100% dari BMR</li>
              </ul>
            </li>
            <li>Faktor Tambahan
              <ul className="list-disc pl-6 mt-2">
                <li>Massa otot</li>
                <li>Frekuensi latihan</li>
                <li>Durasi latihan</li>
                <li>Kondisi lingkungan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Distribusi Makronutrien</h2>
          <p className="text-white text-lg leading-relaxed">
            Kebutuhan makronutrien untuk berbagai jenis atlet:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Atlet Ketahanan
              <ul className="list-disc pl-6 mt-2">
                <li>Karbohidrat: 60-70% dari total kalori</li>
                <li>Protein: 15-20% dari total kalori</li>
                <li>Lemak: 20-25% dari total kalori</li>
                <li>Hidrasi: 3-5 liter per hari</li>
              </ul>
            </li>
            <li>Atlet Kekuatan
              <ul className="list-disc pl-6 mt-2">
                <li>Protein: 25-35% dari total kalori</li>
                <li>Karbohidrat: 45-55% dari total kalori</li>
                <li>Lemak: 20-30% dari total kalori</li>
                <li>Hidrasi: 2-4 liter per hari</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Timing Nutrisi</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi timing nutrisi untuk atlet:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Sebelum Latihan
              <ul className="list-disc pl-6 mt-2">
                <li>Karbohidrat kompleks 2-3 jam sebelumnya</li>
                <li>Protein ringan 1-2 jam sebelumnya</li>
                <li>Hidrasi yang cukup</li>
                <li>Hindari makanan tinggi lemak</li>
              </ul>
            </li>
            <li>Selama Latihan
              <ul className="list-disc pl-6 mt-2">
                <li>Hidrasi teratur</li>
                <li>Elektrolit jika diperlukan</li>
                <li>Karbohidrat cepat jika latihan &gt;1 jam</li>
                <li>Monitor intensitas</li>
              </ul>
            </li>
            <li>Sesudah Latihan
              <ul className="list-disc pl-6 mt-2">
                <li>Protein dalam 30 menit</li>
                <li>Karbohidrat dalam 2 jam</li>
                <li>Rehidrasi</li>
                <li>Elektrolit jika diperlukan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Suplemen untuk Atlet</h2>
          <p className="text-white text-lg leading-relaxed">
            Suplemen yang dapat mendukung performa atlet:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Suplemen Dasar
              <ul className="list-disc pl-6 mt-2">
                <li>Protein whey/casein</li>
                <li>Creatine monohydrate</li>
                <li>BCAA</li>
                <li>Multivitamin</li>
              </ul>
            </li>
            <li>Suplemen Performa
              <ul className="list-disc pl-6 mt-2">
                <li>Beta-alanine</li>
                <li>Caffeine</li>
                <li>Beta-alanine</li>
                <li>Citrulline malate</li>
              </ul>
            </li>
            <li>Suplemen Pemulihan
              <ul className="list-disc pl-6 mt-2">
                <li>Glutamine</li>
                <li>Omega-3</li>
                <li>Magnesium</li>
                <li>Zinc</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring dan Penyesuaian</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara memantau dan menyesuaikan nutrisi:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Parameter Monitoring
              <ul className="list-disc pl-6 mt-2">
                <li>Berat badan</li>
                <li>Komposisi tubuh</li>
                <li>Performa latihan</li>
                <li>Tingkat energi</li>
              </ul>
            </li>
            <li>Penyesuaian
              <ul className="list-disc pl-6 mt-2">
                <li>Kalori berdasarkan tujuan</li>
                <li>Rasio makronutrien</li>
                <li>Timing nutrisi</li>
                <li>Suplemen</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Nutrisi yang tepat sangat penting untuk performa atlet. Dengan memahami
            TDEE dan kebutuhan nutrisi spesifik, atlet dapat mengoptimalkan performa,
            pemulihan, dan kesehatan secara keseluruhan. Ingat bahwa setiap atlet
            memiliki kebutuhan yang unik, dan penyesuaian harus dilakukan secara
            individual.
          </p>
        </div>
      }
    />
  );
};

export default Article13;