import React from 'react';
import Article from '@/components/ArticleComponent/Article';

const Article1 = () => {
  return (
    <Article
      title="Memahami TDEE: Kunci Mengelola Kebutuhan Kalori Harian Anda"
      imageSrc="/tdee1.png"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white">
            Total Daily Energy Expenditure (TDEE) adalah konsep fundamental dalam nutrisi dan kebugaran yang menentukan jumlah total kalori yang dibakar tubuh Anda dalam sehari. 
            Memahami TDEE tidak hanya penting untuk manajemen berat badan, tetapi juga merupakan kunci untuk mengoptimalkan performa fisik, pemulihan, dan kesehatan secara keseluruhan.
          </p>

          <h2 className="text-xl font-semibold text-[#34D399]">Komponen Utama TDEE</h2>
          <p className="text-white">
            TDEE terdiri dari beberapa komponen yang bekerja bersama untuk menentukan total pengeluaran energi harian Anda:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-white">
            <li>
              <strong>Basal Metabolic Rate (BMR):</strong> 
              <ul className="list-disc pl-6 mt-2">
                <li>Mencakup 60-75% dari total pengeluaran energi</li>
                <li>Energi yang dibutuhkan untuk fungsi vital tubuh</li>
                <li>Dipengaruhi oleh usia, jenis kelamin, komposisi tubuh, dan genetik</li>
                <li>Menurun seiring bertambahnya usia</li>
              </ul>
            </li>
            <li>
              <strong>Aktivitas Fisik:</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Mencakup 15-30% dari total pengeluaran energi</li>
                <li>Termasuk olahraga terstruktur dan aktivitas sehari-hari</li>
                <li>Dapat bervariasi signifikan antar individu</li>
                <li>Dapat ditingkatkan melalui perubahan gaya hidup</li>
              </ul>
            </li>
            <li>
              <strong>Thermic Effect of Food (TEF):</strong>
              <ul className="list-disc pl-6 mt-2">
                <li>Mencakup 5-10% dari total pengeluaran energi</li>
                <li>Energi yang dibutuhkan untuk mencerna dan memproses makanan</li>
                <li>Protein memiliki efek termik tertinggi (20-30%)</li>
                <li>Karbohidrat (5-10%) dan lemak (0-3%) memiliki efek termik lebih rendah</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-[#34D399]">Faktor yang Mempengaruhi TDEE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#34D399]">Faktor Fisiologis</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Usia dan jenis kelamin</li>
                <li>Komposisi tubuh (rasio otot-lemak)</li>
                <li>Hormon dan metabolisme</li>
                <li>Kondisi kesehatan</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#34D399]">Faktor Lingkungan</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Tingkat aktivitas fisik</li>
                <li>Iklim dan suhu lingkungan</li>
                <li>Kualitas tidur</li>
                <li>Stres dan pola makan</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#34D399]">Metode Perhitungan TDEE</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#34D399]">1. Rumus Mifflin-St Jeor</h3>
              <p className="text-white mt-2">
                Rumus yang paling akurat untuk populasi umum:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Pria: (10 × berat badan) + (6,25 × tinggi badan) - (5 × usia) + 5</li>
                <li>Wanita: (10 × berat badan) + (6,25 × tinggi badan) - (5 × usia) - 161</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#34D399]">2. Metode Pengukuran Langsung</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Kalorimetri tidak langsung</li>
                <li>Pengukuran komposisi tubuh</li>
                <li>Pemantauan aktivitas fisik</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#34D399]">Aplikasi TDEE dalam Kehidupan Sehari-hari</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#34D399]">Manajemen Berat Badan</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Defisit kalori untuk penurunan berat badan (10-20% dari TDEE)</li>
                <li>Surplus kalori untuk penambahan massa otot (10-20% dari TDEE)</li>
                <li>Pemeliharaan berat badan (sesuai TDEE)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#34D399]">Optimasi Performa</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Penyesuaian asupan nutrisi untuk atlet</li>
                <li>Strategi pemulihan pasca-latihan</li>
                <li>Manajemen energi untuk aktivitas sehari-hari</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#34D399]">Tips Praktis Menggunakan TDEE</h2>
          <ul className="list-disc pl-6 space-y-2 text-white">
            <li>Mulai dengan menghitung TDEE dasar Anda</li>
            <li>Pantau perubahan berat badan dan sesuaikan asupan kalori</li>
            <li>Pertimbangkan fluktuasi aktivitas harian</li>
            <li>Jangan lupa untuk mempertimbangkan kualitas nutrisi, bukan hanya jumlah kalori</li>
            <li>Konsultasikan dengan ahli gizi untuk hasil yang lebih akurat</li>
          </ul>

          <h2 className="text-xl font-semibold text-[#34D399]">Kesimpulan</h2>
          <p className="text-white">
            Memahami TDEE adalah langkah fundamental dalam perjalanan kesehatan dan kebugaran Anda. 
            Dengan pengetahuan yang tepat tentang kebutuhan kalori harian, Anda dapat membuat keputusan yang lebih baik 
            terkait nutrisi dan aktivitas fisik. Ingat bahwa TDEE adalah panduan dinamis yang dapat berubah seiring waktu, 
            sehingga penting untuk melakukan penyesuaian secara berkala berdasarkan perubahan dalam gaya hidup dan tujuan Anda.
          </p>
          <p className="text-white">
            Mulailah dengan menghitung TDEE Anda hari ini dan gunakan informasi ini sebagai dasar untuk membuat 
            perubahan positif dalam gaya hidup Anda. Dengan pemahaman yang baik tentang TDEE, Anda akan lebih siap 
            untuk mencapai tujuan kesehatan dan kebugaran Anda secara efektif dan berkelanjutan.
          </p>
        </div>
      }
    />
  );
};

export default Article1;
