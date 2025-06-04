import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article11 = () => {
  return (
    <Article
      title="Menghitung TDEE untuk Berbagai Jenis Olahraga"
      imageSrc="/tdee11.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) bervariasi berdasarkan jenis dan intensitas olahraga
            yang Anda lakukan. Memahami bagaimana olahraga mempengaruhi TDEE membantu Anda merencanakan
            asupan nutrisi yang tepat untuk mendukung aktivitas fisik Anda.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Olahraga Kardio</h2>
          <p className="text-white text-lg leading-relaxed">
            Jenis-jenis olahraga kardio dan pengaruhnya terhadap TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Lari
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 600-800 kalori per jam</li>
                <li>Meningkatkan kapasitas aerobik</li>
                <li>Membantu penurunan berat badan</li>
                <li>Meningkatkan kesehatan jantung</li>
              </ul>
            </li>
            <li>Berenang
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 400-600 kalori per jam</li>
                <li>Latihan seluruh tubuh</li>
                <li>Rendah risiko cedera</li>
                <li>Baik untuk persendian</li>
              </ul>
            </li>
            <li>Bersepeda
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 400-700 kalori per jam</li>
                <li>Menguatkan otot kaki</li>
                <li>Baik untuk mobilitas</li>
                <li>Dapat dilakukan indoor/outdoor</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Latihan Kekuatan</h2>
          <p className="text-white text-lg leading-relaxed">
            Pengaruh latihan kekuatan terhadap TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Angkat Beban
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 300-500 kalori per sesi</li>
                <li>Membangun massa otot</li>
                <li>Meningkatkan BMR</li>
                <li>Efek afterburn yang signifikan</li>
              </ul>
            </li>
            <li>Bodyweight Training
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 200-400 kalori per sesi</li>
                <li>Meningkatkan kekuatan fungsional</li>
                <li>Fleksibel dan praktis</li>
                <li>Baik untuk pemula</li>
              </ul>
            </li>
            <li>HIIT (High-Intensity Interval Training)
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 400-600 kalori per sesi</li>
                <li>Efisien waktu</li>
                <li>Meningkatkan metabolisme</li>
                <li>Kombinasi kardio dan kekuatan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Olahraga Tim</h2>
          <p className="text-white text-lg leading-relaxed">
            TDEE untuk berbagai olahraga tim:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Sepak Bola
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 500-700 kalori per jam</li>
                <li>Kombinasi kardio dan kekuatan</li>
                <li>Meningkatkan koordinasi</li>
                <li>Baik untuk kerja tim</li>
              </ul>
            </li>
            <li>Basket
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 400-600 kalori per jam</li>
                <li>Meningkatkan kelincahan</li>
                <li>Baik untuk refleks</li>
                <li>Latihan seluruh tubuh</li>
              </ul>
            </li>
            <li>Voli
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 300-500 kalori per jam</li>
                <li>Meningkatkan koordinasi</li>
                <li>Baik untuk keseimbangan</li>
                <li>Latihan seluruh tubuh</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Olahraga Fleksibilitas</h2>
          <p className="text-white text-lg leading-relaxed">
            Pengaruh olahraga fleksibilitas terhadap TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Yoga
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 200-400 kalori per sesi</li>
                <li>Meningkatkan fleksibilitas</li>
                <li>Baik untuk mental</li>
                <li>Mengurangi stres</li>
              </ul>
            </li>
            <li>Pilates
              <ul className="list-disc pl-6 mt-2">
                <li>Membakar 200-350 kalori per sesi</li>
                <li>Menguatkan core</li>
                <li>Meningkatkan postur</li>
                <li>Baik untuk keseimbangan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Menyesuaikan Nutrisi</h2>
          <p className="text-white text-lg leading-relaxed">
            Panduan nutrisi berdasarkan jenis olahraga:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Olahraga Kardio
              <ul className="list-disc pl-6 mt-2">
                <li>Karbohidrat: 55-65% dari total kalori</li>
                <li>Protein: 15-20% dari total kalori</li>
                <li>Lemak: 20-25% dari total kalori</li>
                <li>Hidrasi yang cukup</li>
              </ul>
            </li>
            <li>Latihan Kekuatan
              <ul className="list-disc pl-6 mt-2">
                <li>Protein: 25-35% dari total kalori</li>
                <li>Karbohidrat: 45-55% dari total kalori</li>
                <li>Lemak: 20-30% dari total kalori</li>
                <li>Timing nutrisi yang tepat</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Tips Implementasi</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara mengimplementasikan perhitungan TDEE untuk olahraga:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Gunakan kalkulator TDEE yang akurat</li>
            <li>Pertimbangkan intensitas olahraga</li>
            <li>Monitor perubahan berat badan</li>
            <li>Sesuaikan asupan kalori</li>
            <li>Perhatikan sinyal tubuh</li>
            <li>Konsultasi dengan profesional</li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Memahami bagaimana berbagai jenis olahraga mempengaruhi TDEE membantu Anda
            merencanakan program latihan dan nutrisi yang optimal. Ingat bahwa setiap
            jenis olahraga memiliki kebutuhan energi yang berbeda, dan penyesuaian
            nutrisi yang tepat sangat penting untuk mencapai hasil yang diinginkan.
          </p>
      </div>
      }
    />
  );
};

export default Article11;