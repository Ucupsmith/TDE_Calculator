import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article20 = () => {
  return (
    <Article
      title="TDEE dan Nutrisi untuk Lansia"
      imageSrc="/tdee20.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) untuk lansia memerlukan
            pendekatan khusus karena perubahan metabolisme dan kebutuhan
            nutrisi yang berbeda. Memahami kebutuhan nutrisi yang tepat
            membantu menjaga kesehatan dan kualitas hidup di usia lanjut.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Perubahan Metabolisme</h2>
          <p className="text-white text-lg leading-relaxed">
            Faktor yang mempengaruhi TDEE lansia:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Penurunan Metabolisme
              <ul className="list-disc pl-6 mt-2">
                <li>BMR menurun 1-2% per dekade</li>
                <li>Massa otot berkurang</li>
                <li>Aktivitas fisik menurun</li>
                <li>Efisiensi metabolisme</li>
              </ul>
            </li>
            <li>Perubahan Komposisi Tubuh
              <ul className="list-disc pl-6 mt-2">
                <li>Penurunan massa otot</li>
                <li>Peningkatan lemak</li>
                <li>Perubahan distribusi lemak</li>
                <li>Kepadatan tulang</li>
              </ul>
            </li>
            <li>Faktor Kesehatan
              <ul className="list-disc pl-6 mt-2">
                <li>Penyakit kronis</li>
                <li>Obat-obatan</li>
                <li>Fungsi pencernaan</li>
                <li>Status hidrasi</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Kebutuhan Nutrisi</h2>
          <p className="text-white text-lg leading-relaxed">
            Kebutuhan nutrisi spesifik untuk lansia:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Protein
              <ul className="list-disc pl-6 mt-2">
                <li>1.0-1.2g/kg BB/hari</li>
                <li>Sumber berkualitas tinggi</li>
                <li>Distribusi merata</li>
                <li>Asam amino esensial</li>
              </ul>
            </li>
            <li>Karbohidrat
              <ul className="list-disc pl-6 mt-2">
                <li>45-65% total kalori</li>
                <li>Serat: 25-30g/hari</li>
                <li>Karbohidrat kompleks</li>
                <li>Batasi gula sederhana</li>
              </ul>
            </li>
            <li>Lemak
              <ul className="list-disc pl-6 mt-2">
                <li>20-35% total kalori</li>
                <li>Lemak sehat</li>
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
            <li>Vitamin D
              <ul className="list-disc pl-6 mt-2">
                <li>800-1000IU/hari</li>
                <li>Sinar matahari</li>
                <li>Makanan fortifikasi</li>
                <li>Suplemen jika perlu</li>
              </ul>
            </li>
            <li>Kalsium
              <ul className="list-disc pl-6 mt-2">
                <li>1200mg/hari</li>
                <li>Susu dan produk susu</li>
                <li>Sayuran hijau</li>
                <li>Makanan fortifikasi</li>
              </ul>
            </li>
            <li>Vitamin B12
              <ul className="list-disc pl-6 mt-2">
                <li>2.4mcg/hari</li>
                <li>Sumber hewani</li>
                <li>Makanan fortifikasi</li>
                <li>Suplemen jika perlu</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Pola Makan</h2>
          <p className="text-white text-lg leading-relaxed">
            Panduan pola makan untuk lansia:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Frekuensi Makan
              <ul className="list-disc pl-6 mt-2">
                <li>5-6 kali makan kecil</li>
                <li>Porsi seimbang</li>
                <li>Timing teratur</li>
                <li>Snack bergizi</li>
              </ul>
            </li>
            <li>Pilihan Makanan
              <ul className="list-disc pl-6 mt-2">
                <li>Mudah dicerna</li>
                <li>Kaya nutrisi</li>
                <li>Variasi warna</li>
                <li>Tekstur sesuai</li>
              </ul>
            </li>
            <li>Hidrasi
              <ul className="list-disc pl-6 mt-2">
                <li>1.5-2L air/hari</li>
                <li>Monitor warna urine</li>
                <li>Batasi kafein</li>
                <li>Hindari alkohol</li>
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
                <li>Jalan kaki</li>
                <li>Berenang</li>
                <li>Tai chi</li>
                <li>Yoga</li>
              </ul>
            </li>
            <li>Durasi dan Intensitas
              <ul className="list-disc pl-6 mt-2">
                <li>30 menit/hari</li>
                <li>Intensitas ringan-sedang</li>
                <li>3-5x seminggu</li>
                <li>Istirahat cukup</li>
              </ul>
            </li>
            <li>Keamanan
              <ul className="list-disc pl-6 mt-2">
                <li>Konsultasi dokter</li>
                <li>Pemanasan</li>
                <li>Peralatan aman</li>
                <li>Monitor kondisi</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Nutrisi yang tepat sangat penting untuk menjaga kesehatan dan
            kualitas hidup di usia lanjut. Dengan memahami dan menerapkan
            prinsip-prinsip nutrisi yang tepat, lansia dapat mempertahankan
            kesehatan yang optimal dan menikmati masa tua yang aktif dan
            berkualitas.
          </p>
        </div>
}
    />
  );
};

export default Article20;