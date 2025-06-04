import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article7 = () => {
  return (
    <Article
      title="TDEE untuk Meningkatkan Massa Otot"
      imageSrc="/tdee7.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) memainkan peran penting dalam program peningkatan massa otot.
            Untuk membangun otot secara efektif, Anda perlu memahami bagaimana TDEE mempengaruhi proses
            hipertrofi dan bagaimana mengoptimalkannya untuk hasil terbaik.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Surplus Kalori untuk Hipertrofi</h2>
          <p className="text-white text-lg leading-relaxed">
            Untuk membangun otot, Anda perlu menciptakan surplus kalori yang tepat:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Surplus moderat: 200-300 kalori di atas TDEE</li>
            <li>Surplus agresif: 300-500 kalori di atas TDEE</li>
            <li>Surplus ekstrem: 500+ kalori di atas TDEE (risiko penambahan lemak)</li>
            <li>Pertahankan surplus konsisten untuk hasil optimal</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Distribusi Makronutrien</h2>
          <p className="text-white text-lg leading-relaxed">
            Distribusi makronutrien yang optimal untuk pembentukan otot:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Protein
              <ul className="list-disc pl-6 mt-2">
                <li>1.6-2.2g per kg berat badan</li>
                <li>Distribusikan merata sepanjang hari</li>
                <li>Prioritaskan protein berkualitas tinggi</li>
                <li>Konsumsi 20-40g protein per makan</li>
              </ul>
            </li>
            <li>Karbohidrat
              <ul className="list-disc pl-6 mt-2">
                <li>4-7g per kg berat badan</li>
                <li>Fokus pada karbohidrat kompleks</li>
                <li>Tingkatkan asupan saat latihan</li>
                <li>Pertahankan glikogen otot</li>
              </ul>
            </li>
            <li>Lemak
              <ul className="list-disc pl-6 mt-2">
                <li>0.5-1.5g per kg berat badan</li>
                <li>Prioritaskan lemak sehat</li>
                <li>Pertahankan asupan lemak esensial</li>
                <li>Jaga keseimbangan omega-3 dan omega-6</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Program Latihan</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi latihan untuk memaksimalkan pertumbuhan otot:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Latihan Beban
              <ul className="list-disc pl-6 mt-2">
                <li>Fokus pada compound movements</li>
                <li>Latihan 3-5 kali per minggu</li>
                <li>Gunakan progressive overload</li>
                <li>Jaga volume latihan yang tepat</li>
              </ul>
            </li>
            <li>Intensitas dan Volume
              <ul className="list-disc pl-6 mt-2">
                <li>8-12 repetisi per set</li>
                <li>3-4 set per latihan</li>
                <li>Istirahat 60-90 detik antar set</li>
                <li>Latihan hingga failure pada set terakhir</li>
              </ul>
            </li>
            <li>Recovery
              <ul className="list-disc pl-6 mt-2">
                <li>Istirahat 48-72 jam antar latihan otot</li>
                <li>Prioritaskan kualitas tidur</li>
                <li>Kelola stres</li>
                <li>Lakukan stretching dan foam rolling</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Nutrisi Timing</h2>
          <p className="text-white text-lg leading-relaxed">
            Waktu optimal untuk konsumsi nutrisi:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Pre-Workout
              <ul className="list-disc pl-6 mt-2">
                <li>Karbohidrat: 30-60g</li>
                <li>Protein: 20-30g</li>
                <li>Konsumsi 1-2 jam sebelum latihan</li>
                <li>Hindari lemak berlebih</li>
              </ul>
            </li>
            <li>Intra-Workout
              <ul className="list-disc pl-6 mt-2">
                <li>BCAA jika diperlukan</li>
                <li>Elektrolit</li>
                <li>Hidrasi yang cukup</li>
              </ul>
            </li>
            <li>Post-Workout
              <ul className="list-disc pl-6 mt-2">
                <li>Protein: 30-40g</li>
                <li>Karbohidrat: 60-90g</li>
                <li>Konsumsi dalam 30 menit</li>
                <li>Makan lengkap dalam 2 jam</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring Progress</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara memantau kemajuan pembentukan otot:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Pengukuran Fisik
              <ul className="list-disc pl-6 mt-2">
                <li>Ukur lingkar otot</li>
                <li>Foto progress</li>
                <li>Komposisi tubuh</li>
                <li>Kekuatan latihan</li>
              </ul>
            </li>
            <li>Penyesuaian Program
              <ul className="list-disc pl-6 mt-2">
                <li>Evaluasi setiap 4-6 minggu</li>
                <li>Sesuaikan surplus kalori</li>
                <li>Modifikasi program latihan</li>
                <li>Optimalkan recovery</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Tips Sukses</h2>
          <p className="text-white text-lg leading-relaxed">
            Tips untuk memaksimalkan pertumbuhan otot:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Konsistensi dalam program</li>
            <li>Prioritaskan kualitas latihan</li>
            <li>Jaga asupan protein yang cukup</li>
            <li>Kelola stres dan tidur</li>
            <li>Hindari overtraining</li>
            <li>Gunakan suplemen dengan bijak</li>
            <li>Bersabarlah dengan progress</li>
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
                <li>Jaga kesehatan jantung</li>
                <li>Monitor tekanan darah</li>
                <li>Perhatikan kesehatan sendi</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Menggunakan TDEE sebagai dasar program peningkatan massa otot membantu Anda mencapai tujuan
            dengan cara yang sehat dan berkelanjutan. Ingat bahwa pembentukan otot adalah proses yang
            membutuhkan waktu, konsistensi, dan dedikasi. Fokus pada kualitas latihan dan nutrisi yang
            tepat untuk hasil terbaik.
          </p>
      </div>
      }
    />
  );
};

export default Article7;