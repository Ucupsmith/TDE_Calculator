import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article6 = () => {
  return (
    <Article
      title="Pentingnya TDEE untuk Program Penurunan Berat Badan"
      imageSrc="/tdee6.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) memainkan peran krusial dalam program penurunan berat badan.
            Memahami dan menghitung TDEE dengan tepat adalah langkah awal yang penting untuk mencapai tujuan
            penurunan berat badan yang sehat dan berkelanjutan.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Defisit Kalori yang Tepat</h2>
          <p className="text-white text-lg leading-relaxed">
            Untuk menurunkan berat badan, Anda perlu menciptakan defisit kalori yang tepat:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Defisit moderat: 300-500 kalori di bawah TDEE</li>
            <li>Defisit agresif: 500-700 kalori di bawah TDEE</li>
            <li>Defisit ekstrem: 700+ kalori di bawah TDEE (tidak disarankan)</li>
            <li>Jangan pernah di bawah BMR (Basal Metabolic Rate)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Strategi Penurunan Berat Badan</h2>
          <p className="text-white text-lg leading-relaxed">
            Beberapa strategi efektif untuk menurunkan berat badan berdasarkan TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Kombinasi Diet dan Olahraga
              <ul className="list-disc pl-6 mt-2">
                <li>Kurangi asupan kalori melalui diet</li>
                <li>Tingkatkan pengeluaran kalori melalui olahraga</li>
                <li>Pertahankan massa otot dengan latihan beban</li>
              </ul>
            </li>
            <li>Pola Makan Seimbang
              <ul className="list-disc pl-6 mt-2">
                <li>Prioritaskan protein (1.6-2.2g per kg berat badan)</li>
                <li>Konsumsi karbohidrat kompleks</li>
                <li>Pilih lemak sehat</li>
                <li>Tingkatkan asupan serat</li>
              </ul>
            </li>
            <li>Olahraga Teratur
              <ul className="list-disc pl-6 mt-2">
                <li>Kardio 3-5 kali seminggu</li>
                <li>Latihan beban 2-3 kali seminggu</li>
                <li>Aktivitas fisik sehari-hari</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring Progress</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara memantau kemajuan penurunan berat badan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Ukur berat badan secara konsisten
              <ul className="list-disc pl-6 mt-2">
                <li>Waktu yang sama setiap hari</li>
                <li>Kondisi yang sama (setelah buang air kecil)</li>
                <li>Gunakan timbangan yang sama</li>
              </ul>
            </li>
            <li>Catat asupan makanan
              <ul className="list-disc pl-6 mt-2">
                <li>Gunakan aplikasi tracking kalori</li>
                <li>Ukur porsi makanan</li>
                <li>Catat semua yang dikonsumsi</li>
              </ul>
            </li>
            <li>Evaluasi mingguan
              <ul className="list-disc pl-6 mt-2">
                <li>Analisis tren penurunan berat badan</li>
                <li>Sesuaikan defisit kalori jika perlu</li>
                <li>Evaluasi program olahraga</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Mengatasi Plateau</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi mengatasi plateau dalam penurunan berat badan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Recalculate TDEE
              <ul className="list-disc pl-6 mt-2">
                <li>Setiap 4-6 minggu</li>
                <li>Sesuaikan dengan berat badan baru</li>
                <li>Pertimbangkan perubahan aktivitas</li>
              </ul>
            </li>
            <li>Variasi Program
              <ul className="list-disc pl-6 mt-2">
                <li>Ubah jenis olahraga</li>
                <li>Tingkatkan intensitas latihan</li>
                <li>Coba pola makan baru</li>
              </ul>
            </li>
            <li>Refeed Days
              <ul className="list-disc pl-6 mt-2">
                <li>Konsumsi kalori maintenance</li>
                <li>Fokus pada karbohidrat</li>
                <li>Lakukan setiap 7-14 hari</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Tips Sukses</h2>
          <p className="text-white text-lg leading-relaxed">
            Tips untuk mencapai penurunan berat badan yang berkelanjutan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Buat rencana yang realistis dan spesifik</li>
            <li>Fokus pada perubahan gaya hidup jangka panjang</li>
            <li>Jaga konsistensi dalam program</li>
            <li>Kelola stres dan tidur yang cukup</li>
            <li>Minum air yang cukup (2-3 liter per hari)</li>
            <li>Hindari diet ekstrem</li>
            <li>Rayakan pencapaian kecil</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Pertimbangan Kesehatan</h2>
          <p className="text-white text-lg leading-relaxed">
            Hal-hal yang perlu diperhatikan untuk kesehatan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Jangan menurunkan berat badan terlalu cepat
              <ul className="list-disc pl-6 mt-2">
                <li>Target 0.5-1 kg per minggu</li>
                <li>Hindari penurunan lebih dari 1% berat badan per minggu</li>
              </ul>
            </li>
            <li>Pertahankan nutrisi yang cukup
              <ul className="list-disc pl-6 mt-2">
                <li>Konsumsi multivitamin jika perlu</li>
                <li>Pastikan asupan protein cukup</li>
                <li>Jaga keseimbangan elektrolit</li>
              </ul>
            </li>
            <li>Konsultasi dengan profesional
              <ul className="list-disc pl-6 mt-2">
                <li>Dokter untuk evaluasi kesehatan</li>
                <li>Ahli gizi untuk rencana makan</li>
                <li>Personal trainer untuk program olahraga</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Menggunakan TDEE sebagai dasar program penurunan berat badan membantu Anda mencapai tujuan
            dengan cara yang sehat dan berkelanjutan. Ingat bahwa penurunan berat badan yang efektif
            membutuhkan waktu, kesabaran, dan konsistensi. Fokus pada perubahan gaya hidup jangka panjang
            daripada solusi cepat yang tidak berkelanjutan.
          </p>
        </div>
      }
    />
  );
};

export default Article6;