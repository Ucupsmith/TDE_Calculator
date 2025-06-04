import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article19 = () => {
  return (
    <Article
      title="TDEE dan Nutrisi untuk Remaja"
      imageSrc="/tdee19.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) untuk remaja memerlukan
            perhatian khusus karena periode pertumbuhan dan perkembangan yang
            pesat. Memahami kebutuhan nutrisi yang tepat membantu mendukung
            pertumbuhan optimal dan kesehatan jangka panjang.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Kebutuhan Energi</h2>
          <p className="text-white text-lg leading-relaxed">
            Faktor yang mempengaruhi TDEE remaja:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Usia dan Jenis Kelamin
              <ul className="list-disc pl-6 mt-2">
                <li>Laki-laki: 2000-3200 kkal/hari</li>
                <li>Perempuan: 1800-2400 kkal/hari</li>
                <li>Tingkat aktivitas</li>
                <li>Fase pertumbuhan</li>
              </ul>
            </li>
            <li>Aktivitas Fisik
              <ul className="list-disc pl-6 mt-2">
                <li>Olahraga teratur</li>
                <li>Aktivitas sehari-hari</li>
                <li>Intensitas aktivitas</li>
                <li>Durasi aktivitas</li>
              </ul>
            </li>
            <li>Faktor Pertumbuhan
              <ul className="list-disc pl-6 mt-2">
                <li>Tinggi badan</li>
                <li>Berat badan</li>
                <li>Perkembangan otot</li>
                <li>Perkembangan tulang</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Nutrisi Penting</h2>
          <p className="text-white text-lg leading-relaxed">
            Nutrisi esensial untuk remaja:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Protein
              <ul className="list-disc pl-6 mt-2">
                <li>1.2-1.6g/kg BB/hari</li>
                <li>Sumber berkualitas</li>
                <li>Distribusi harian</li>
                <li>Timing konsumsi</li>
              </ul>
            </li>
            <li>Karbohidrat
              <ul className="list-disc pl-6 mt-2">
                <li>45-65% total kalori</li>
                <li>Karbohidrat kompleks</li>
                <li>Serat: 25-30g/hari</li>
                <li>Timing konsumsi</li>
              </ul>
            </li>
            <li>Lemak
              <ul className="list-disc pl-6 mt-2">
                <li>25-35% total kalori</li>
                <li>Lemak esensial</li>
                <li>Omega-3</li>
                <li>Batasi lemak jenuh</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Vitamin dan Mineral</h2>
          <p className="text-white text-lg leading-relaxed">
            Kebutuhan vitamin dan mineral:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Kalsium
              <ul className="list-disc pl-6 mt-2">
                <li>1300mg/hari</li>
                <li>Susu dan produk susu</li>
                <li>Sayuran hijau</li>
                <li>Makanan fortifikasi</li>
              </ul>
            </li>
            <li>Zat Besi
              <ul className="list-disc pl-6 mt-2">
                <li>Laki-laki: 11mg/hari</li>
                <li>Perempuan: 15mg/hari</li>
                <li>Sumber hewani</li>
                <li>Sumber nabati</li>
              </ul>
            </li>
            <li>Vitamin D
              <ul className="list-disc pl-6 mt-2">
                <li>600IU/hari</li>
                <li>Sinar matahari</li>
                <li>Makanan fortifikasi</li>
                <li>Suplemen jika perlu</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Pola Makan</h2>
          <p className="text-white text-lg leading-relaxed">
            Panduan pola makan sehat:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Frekuensi Makan
              <ul className="list-disc pl-6 mt-2">
                <li>3 kali makan utama</li>
                <li>2-3 kali snack</li>
                <li>Porsi seimbang</li>
                <li>Timing teratur</li>
              </ul>
            </li>
            <li>Pilihan Makanan
              <ul className="list-disc pl-6 mt-2">
                <li>Makanan utuh</li>
                <li>Variasi warna</li>
                <li>Minimal olahan</li>
                <li>Batasi junk food</li>
              </ul>
            </li>
            <li>Hidrasi
              <ul className="list-disc pl-6 mt-2">
                <li>Air putih: 2-3L/hari</li>
                <li>Batasi minuman manis</li>
                <li>Monitor warna urine</li>
                <li>Kebutuhan aktivitas</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Aktivitas Fisik</h2>
          <p className="text-white text-lg leading-relaxed">
            Rekomendasi aktivitas fisik:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Jenis Aktivitas
              <ul className="list-disc pl-6 mt-2">
                <li>Olahraga terstruktur</li>
                <li>Aktivitas rekreasi</li>
                <li>Latihan kekuatan</li>
                <li>Fleksibilitas</li>
              </ul>
            </li>
            <li>Durasi dan Intensitas
              <ul className="list-disc pl-6 mt-2">
                <li>60 menit/hari</li>
                <li>Intensitas moderat</li>
                <li>3x seminggu kuat</li>
                <li>Keseimbangan aktivitas</li>
              </ul>
            </li>
            <li>Nutrisi Olahraga
              <ul className="list-disc pl-6 mt-2">
                <li>Pre-workout</li>
                <li>Hidrasi</li>
                <li>Post-workout</li>
                <li>Pemulihan</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Nutrisi yang tepat selama masa remaja sangat penting untuk
            mendukung pertumbuhan dan perkembangan optimal. Dengan memahami
            dan menerapkan prinsip-prinsip nutrisi yang tepat, remaja dapat
            mencapai potensi pertumbuhan mereka dan membangun fondasi
            kesehatan yang kuat untuk masa depan.
          </p>
        </div>
}
    />
  );
};

export default Article19;