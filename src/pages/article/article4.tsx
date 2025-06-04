import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article4 = () => {
  return (
    <Article
      title="Faktor Aktivitas: Kunci Akurasi Perhitungan TDEE"
      imageSrc="/tdee4.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Faktor aktivitas adalah komponen kritis dalam perhitungan Total Daily Energy Expenditure (TDEE) yang menentukan
            seberapa banyak kalori tambahan yang dibakar melalui aktivitas fisik. Memahami dan mengaplikasikan faktor aktivitas
            dengan tepat sangat penting untuk mendapatkan perhitungan TDEE yang akurat dan efektif.
          </p>

          <h2 className="text-2xl font-semibold text-[#34D399]">PAL (Physical Activity Level)</h2>
          <div className="space-y-4">
            <p className="text-white text-lg leading-relaxed">
              PAL adalah pengali yang digunakan untuk menyesuaikan BMR berdasarkan tingkat aktivitas fisik seseorang.
              Berikut adalah klasifikasi PAL yang umum digunakan:
            </p>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Level Aktivitas Dasar</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Sedentary (1.2)
                  <ul className="list-disc pl-6 mt-1">
                    <li>Pekerjaan kantor dengan aktivitas minimal</li>
                    <li>Kurang dari 5.000 langkah per hari</li>
                    <li>Tidak ada olahraga terstruktur</li>
                  </ul>
                </li>
                <li>Lightly Active (1.375)
                  <ul className="list-disc pl-6 mt-1">
                    <li>Olahraga ringan 1-3x per minggu</li>
                    <li>5.000-7.500 langkah per hari</li>
                    <li>Aktivitas fisik ringan di sela pekerjaan</li>
                  </ul>
                </li>
                <li>Moderately Active (1.55)
                  <ul className="list-disc pl-6 mt-1">
                    <li>Olahraga sedang 3-5x per minggu</li>
                    <li>7.500-10.000 langkah per hari</li>
                    <li>Pekerjaan yang membutuhkan aktivitas fisik sedang</li>
                  </ul>
                </li>
                <li>Very Active (1.725)
                  <ul className="list-disc pl-6 mt-1">
                    <li>Olahraga berat 6-7x per minggu</li>
                    <li>10.000-12.500 langkah per hari</li>
                    <li>Pekerjaan fisik yang berat</li>
                  </ul>
                </li>
                <li>Extra Active (1.9)
                  <ul className="list-disc pl-6 mt-1">
                    <li>Olahraga sangat berat 2x sehari</li>
                    <li>Lebih dari 12.500 langkah per hari</li>
                    <li>Atlet profesional dalam masa latihan</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Komponen Aktivitas Fisik</h2>
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

          <h2 className="text-2xl font-semibold text-[#34D399]">Faktor yang Mempengaruhi PAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Faktor Pekerjaan</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Jenis pekerjaan (kantor vs lapangan)</li>
                <li>Durasi bekerja</li>
                <li>Intensitas aktivitas kerja</li>
                <li>Frekuensi istirahat</li>
                <li>Lingkungan kerja</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Faktor Olahraga</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Jenis olahraga</li>
                <li>Frekuensi latihan</li>
                <li>Intensitas latihan</li>
                <li>Durasi latihan</li>
                <li>Volume latihan</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Menghitung PAL dengan Akurat</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Metode Perhitungan</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Gunakan pedometer atau fitness tracker</li>
                <li>Catat semua aktivitas fisik harian</li>
                <li>Hitung total durasi aktivitas</li>
                <li>Evaluasi intensitas aktivitas</li>
                <li>Pertimbangkan variasi harian</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Tips Akurasi</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Monitor aktivitas selama 7 hari</li>
                <li>Catat aktivitas tidak terduga</li>
                <li>Pertimbangkan variasi mingguan</li>
                <li>Evaluasi secara berkala</li>
                <li>Sesuaikan dengan perubahan rutinitas</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Aplikasi Praktis</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Penyesuaian Program</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Mulai dengan level aktivitas yang sesuai</li>
                <li>Tingkatkan secara bertahap</li>
                <li>Kombinasikan berbagai jenis aktivitas</li>
                <li>Pertahankan konsistensi</li>
                <li>Evaluasi dan sesuaikan secara berkala</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Monitoring Progress</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Gunakan aplikasi tracking</li>
                <li>Catat perubahan aktivitas</li>
                <li>Monitor perubahan berat badan</li>
                <li>Evaluasi tingkat energi</li>
                <li>Sesuaikan berdasarkan feedback</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Kesimpulan</h2>
          <p className="text-white text-lg leading-relaxed">
            Faktor aktivitas adalah komponen dinamis dalam perhitungan TDEE yang membutuhkan pemahaman mendalam
            dan evaluasi berkala. Dengan menerapkan PAL yang tepat dan mempertimbangkan semua komponen aktivitas fisik,
            Anda dapat mencapai perhitungan TDEE yang lebih akurat dan efektif untuk mencapai tujuan kesehatan Anda.
            Ingat bahwa aktivitas fisik adalah variabel yang dapat dimodifikasi, sehingga Anda memiliki kontrol
            untuk mengoptimalkan pengeluaran energi harian Anda.
          </p>
        </div>
      }
    />
  );
};

export default Article4;