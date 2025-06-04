import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article9 = () => {
  return (
    <Article
      title="Peran TDEE dalam Perencanaan Gizi Harian"
      imageSrc="/tdee9.webp"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) merupakan dasar penting dalam perencanaan gizi harian.
            Dengan memahami TDEE, Anda dapat merencanakan asupan nutrisi yang tepat untuk memenuhi kebutuhan
            energi dan nutrisi tubuh secara optimal.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Dasar Perencanaan Gizi</h2>
          <p className="text-white text-lg leading-relaxed">
            Prinsip dasar dalam merencanakan gizi berdasarkan TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Menghitung kebutuhan kalori harian</li>
            <li>Mendistribusikan makronutrien dengan tepat</li>
            <li>Menyesuaikan dengan aktivitas fisik</li>
            <li>Mempertimbangkan tujuan kesehatan</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Distribusi Makronutrien</h2>
          <p className="text-white text-lg leading-relaxed">
            Panduan distribusi makronutrien berdasarkan TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Protein
              <ul className="list-disc pl-6 mt-2">
                <li>15-30% dari total kalori</li>
                <li>1.6-2.2g per kg berat badan</li>
                <li>Distribusikan merata sepanjang hari</li>
                <li>Prioritaskan sumber protein berkualitas</li>
              </ul>
            </li>
            <li>Karbohidrat
              <ul className="list-disc pl-6 mt-2">
                <li>45-65% dari total kalori</li>
                <li>Fokus pada karbohidrat kompleks</li>
                <li>Sesuaikan dengan aktivitas fisik</li>
                <li>Pertahankan glikogen otot</li>
              </ul>
            </li>
            <li>Lemak
              <ul className="list-disc pl-6 mt-2">
                <li>20-35% dari total kalori</li>
                <li>Prioritaskan lemak sehat</li>
                <li>Jaga keseimbangan omega-3 dan omega-6</li>
                <li>Hindari lemak trans</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Perencanaan Makan</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi perencanaan makan berdasarkan TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Jadwal Makan
              <ul className="list-disc pl-6 mt-2">
                <li>3-6 kali makan per hari</li>
                <li>Interval 2-4 jam antar makan</li>
                <li>Sesuaikan dengan aktivitas</li>
                <li>Pertahankan konsistensi</li>
              </ul>
            </li>
            <li>Porsi Makan
              <ul className="list-disc pl-6 mt-2">
                <li>Kontrol porsi sesuai TDEE</li>
                <li>Gunakan alat ukur yang tepat</li>
                <li>Perhatikan kepadatan kalori</li>
                <li>Jaga keseimbangan nutrisi</li>
              </ul>
            </li>
            <li>Pemilihan Makanan
              <ul className="list-disc pl-6 mt-2">
                <li>Prioritaskan makanan utuh</li>
                <li>Variasi sumber nutrisi</li>
                <li>Perhatikan kualitas makanan</li>
                <li>Batasi makanan olahan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Penyesuaian Aktivitas</h2>
          <p className="text-white text-lg leading-relaxed">
            Menyesuaikan asupan nutrisi dengan aktivitas:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Hari Latihan
              <ul className="list-disc pl-6 mt-2">
                <li>Tingkatkan asupan karbohidrat</li>
                <li>Prioritaskan protein</li>
                <li>Jaga hidrasi</li>
                <li>Timing nutrisi yang tepat</li>
              </ul>
            </li>
            <li>Hari Istirahat
              <ul className="list-disc pl-6 mt-2">
                <li>Kurangi asupan karbohidrat</li>
                <li>Pertahankan protein</li>
                <li>Fokus pada recovery</li>
                <li>Jaga keseimbangan nutrisi</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring dan Evaluasi</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara memantau dan mengevaluasi perencanaan gizi:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Tracking Nutrisi
              <ul className="list-disc pl-6 mt-2">
                <li>Catat asupan makanan</li>
                <li>Monitor makronutrien</li>
                <li>Evaluasi kepatuhan</li>
                <li>Sesuaikan jika perlu</li>
              </ul>
            </li>
            <li>Evaluasi Progress
              <ul className="list-disc pl-6 mt-2">
                <li>Ukur berat badan</li>
                <li>Monitor komposisi tubuh</li>
                <li>Evaluasi energi</li>
                <li>Perhatikan performa</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Tips Implementasi</h2>
          <p className="text-white text-lg leading-relaxed">
            Tips untuk mengimplementasikan perencanaan gizi:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Persiapkan makanan sebelumnya</li>
            <li>Buat jadwal makan yang realistis</li>
            <li>Gunakan aplikasi tracking</li>
            <li>Jaga konsistensi</li>
            <li>Bersikap fleksibel</li>
            <li>Perhatikan sinyal tubuh</li>
            <li>Rayakan pencapaian kecil</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Pertimbangan Kesehatan</h2>
          <p className="text-white text-lg leading-relaxed">
            Hal-hal yang perlu diperhatikan untuk kesehatan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Konsultasi dengan profesional
              <ul className="list-disc pl-6 mt-2">
                <li>Dokter untuk evaluasi kesehatan</li>
                <li>Ahli gizi untuk rencana makan</li>
                <li>Personal trainer untuk program latihan</li>
              </ul>
            </li>
            <li>Pertahankan kesehatan umum
              <ul className="list-disc pl-6 mt-2">
                <li>Monitor tekanan darah</li>
                <li>Jaga kesehatan jantung</li>
                <li>Perhatikan kesehatan pencernaan</li>
                <li>Evaluasi kesehatan secara berkala</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Menggunakan TDEE sebagai dasar perencanaan gizi harian membantu Anda mencapai tujuan kesehatan
            dengan cara yang terstruktur dan berkelanjutan. Ingat bahwa perencanaan gizi yang baik adalah
            tentang keseimbangan, konsistensi, dan fleksibilitas dalam menjalani gaya hidup sehat.
          </p>
      </div>
      }
    />
  );
};

export default Article9;