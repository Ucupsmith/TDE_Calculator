import React from "react";
import Article from "@/components/ArticleComponent/Article";
import AktivitasTable from "@/components/ArticleComponent/AktivitasTable";

const Article3 = () => {
  return (
    <Article
      title="Aktivitas Fisik dan TDEE: Mengoptimalkan Pengeluaran Energi"
      imageSrc="/tdee3.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Aktivitas fisik memainkan peran penting dalam menentukan Total Daily Energy Expenditure (TDEE) Anda.
            Memahami bagaimana berbagai jenis aktivitas mempengaruhi pengeluaran energi dapat membantu Anda
            mengoptimalkan rutinitas olahraga dan mencapai tujuan kesehatan dengan lebih efektif.
          </p>

          <h2 className="text-2xl font-semibold text-[#34D399]">Komponen Aktivitas Fisik dalam TDEE</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Exercise Activity Thermogenesis (EAT)</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Olahraga terstruktur dan terencana</li>
                <li>Mencakup 15-30% dari total pengeluaran energi</li>
                <li>Dapat dimodifikasi secara signifikan</li>
                <li>Termasuk latihan kardio dan kekuatan</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Non-Exercise Activity Thermogenesis (NEAT)</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Aktivitas sehari-hari non-olahraga</li>
                <li>Mencakup 15-50% dari total pengeluaran energi</li>
                <li>Termasuk berjalan, berdiri, dan gerakan spontan</li>
                <li>Berbeda signifikan antar individu</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Jenis Aktivitas Fisik dan Pengaruhnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Latihan Kardio</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Lari: 600-800 kalori/jam</li>
                <li>Bersepeda: 400-600 kalori/jam</li>
                <li>Berenang: 400-700 kalori/jam</li>
                <li>HIIT: 500-800 kalori/jam</li>
                <li>Berjalan: 200-400 kalori/jam</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Latihan Kekuatan</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Angkat beban: 300-500 kalori/jam</li>
                <li>CrossFit: 500-700 kalori/jam</li>
                <li>Bodyweight training: 200-400 kalori/jam</li>
                <li>Circuit training: 400-600 kalori/jam</li>
                <li>Yoga/Pilates: 200-400 kalori/jam</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Faktor yang Mempengaruhi Pengeluaran Energi</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Faktor Individu</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Berat badan dan komposisi tubuh</li>
                <li>Tingkat kebugaran</li>
                <li>Efisiensi gerakan</li>
                <li>Usia dan jenis kelamin</li>
                <li>Kondisi kesehatan</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Faktor Aktivitas</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Intensitas dan durasi</li>
                <li>Jenis aktivitas</li>
                <li>Frekuensi latihan</li>
                <li>Volume total</li>
                <li>Istirahat dan pemulihan</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Strategi Optimasi</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Meningkatkan NEAT</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Gunakan standing desk</li>
                <li>Parkir lebih jauh</li>
                <li>Naik tangga daripada lift</li>
                <li>Berjalan saat istirahat</li>
                <li>Lakukan stretching rutin</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Program Latihan Efektif</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Kombinasi kardio dan kekuatan</li>
                <li>HIIT untuk efisiensi waktu</li>
                <li>Progressive overload</li>
                <li>Variasi latihan</li>
                <li>Pemulihan yang cukup</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring dan Penyesuaian</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Alat Monitoring</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Fitness tracker</li>
                <li>Heart rate monitor</li>
                <li>Smartphone apps</li>
                <li>Activity log</li>
                <li>Progress photos</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Penyesuaian Program</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Evaluasi mingguan</li>
                <li>Modifikasi intensitas</li>
                <li>Perubahan volume latihan</li>
                <li>Rotasi jenis aktivitas</li>
                <li>Penyesuaian nutrisi</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Kesimpulan</h2>
          <p className="text-white text-lg leading-relaxed">
            Aktivitas fisik adalah komponen penting dalam TDEE yang dapat dimodifikasi untuk mencapai tujuan kesehatan Anda.
            Dengan memahami berbagai jenis aktivitas dan pengaruhnya terhadap pengeluaran energi, Anda dapat membuat
            program latihan yang lebih efektif dan berkelanjutan. Ingat untuk selalu mempertimbangkan keseimbangan antara
            intensitas, volume, dan pemulihan untuk hasil yang optimal.
          </p>
        </div>
      }
    />
  );
};

export default Article3;