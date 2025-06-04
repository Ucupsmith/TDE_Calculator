import React from 'react';
import Article from '@/components/ArticleComponent/Article';

const Article2 = () => {
  return (
    <Article
      title="BMI dan BMR: Dasar Perhitungan TDEE"
      imageSrc="/tdee2.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Body Mass Index (BMI) dan Basal Metabolic Rate (BMR) adalah dua komponen fundamental dalam perhitungan Total Daily Energy Expenditure (TDEE).
            Kedua metrik ini bekerja sama untuk memberikan pemahaman komprehensif tentang kebutuhan energi tubuh Anda dan status kesehatan secara keseluruhan.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Body Mass Index (BMI)</h2>
          <div className="space-y-4">
            <p className="text-white text-lg leading-relaxed">
              BMI adalah alat pengukuran standar yang digunakan untuk mengevaluasi berat badan seseorang dalam kaitannya dengan tinggi badan.
              Meskipun tidak mengukur lemak tubuh secara langsung, BMI memberikan indikasi umum tentang status berat badan dan risiko kesehatan terkait.
            </p>
            
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Kategori BMI</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Underweight: BMI &lt; 18.5</li>
                <li>Normal weight: BMI 18.5 - 24.9</li>
                <li>Overweight: BMI 25 - 29.9</li>
                <li>Obesity Class I: BMI 30 - 34.9</li>
                <li>Obesity Class II: BMI 35 - 39.9</li>
                <li>Obesity Class III: BMI ≥ 40</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Rumus BMI</h3>
              <p className="text-white mb-2">BMI = berat badan (kg) / (tinggi badan (m))²</p>
              <p className="text-white text-sm">Contoh: Berat 70kg, Tinggi 1.75m</p>
              <p className="text-white text-sm">BMI = 70 / (1.75)² = 22.86 (Normal weight)</p>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Keterbatasan BMI</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Tidak membedakan antara massa otot dan lemak</li>
                <li>Dapat memberikan hasil yang menyesatkan untuk atlet</li>
                <li>Tidak mempertimbangkan distribusi lemak tubuh</li>
                <li>Tidak memperhitungkan usia dan jenis kelamin</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Basal Metabolic Rate (BMR)</h2>
          <div className="space-y-4">
            <p className="text-white text-lg leading-relaxed">
              BMR adalah jumlah kalori yang dibakar tubuh Anda saat istirahat total. Ini mewakili energi minimum
              yang dibutuhkan untuk mempertahankan fungsi vital tubuh seperti pernapasan, sirkulasi, dan fungsi sel.
            </p>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Komponen BMR</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Fungsi otak dan sistem saraf (20%)</li>
                <li>Fungsi hati dan ginjal (20%)</li>
                <li>Fungsi jantung dan paru-paru (15%)</li>
                <li>Fungsi otot saat istirahat (20%)</li>
                <li>Fungsi organ lainnya (25%)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Rumus BMR</h3>
              <p className="text-white mb-2">Rumus Mifflin-St Jeor:</p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Pria: (10 × berat badan) + (6,25 × tinggi badan) - (5 × usia) + 5</li>
                <li>Wanita: (10 × berat badan) + (6,25 × tinggi badan) - (5 × usia) - 161</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Faktor yang Mempengaruhi BMR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Faktor Fisiologis</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Usia (menurun 2-3% per dekade setelah usia 20)</li>
                <li>Jenis kelamin (pria 5-10% lebih tinggi)</li>
                <li>Komposisi tubuh (otot vs lemak)</li>
                <li>Genetik dan etnis</li>
                <li>Hormon (tiroid, insulin, dll)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Faktor Lingkungan</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Suhu lingkungan</li>
                <li>Kualitas tidur</li>
                <li>Stres dan kecemasan</li>
                <li>Pola makan</li>
                <li>Aktivitas fisik</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Hubungan BMI, BMR, dan TDEE</h2>
          <div className="space-y-4">
            <p className="text-white text-lg leading-relaxed">
              Ketiga komponen ini saling terkait dalam menentukan kebutuhan energi dan status kesehatan:
            </p>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Alur Perhitungan</h3>
              <ol className="list-decimal pl-6 space-y-2 text-white">
                <li>Hitung BMI untuk mengevaluasi status berat badan</li>
                <li>Gunakan BMI dan data lainnya untuk menghitung BMR</li>
                <li>Kalikan BMR dengan faktor aktivitas untuk mendapatkan TDEE</li>
                <li>Sesuaikan TDEE berdasarkan tujuan (defisit/surplus)</li>
              </ol>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Faktor Aktivitas</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Sedentary (1.2): Aktivitas minimal</li>
                <li>Lightly active (1.375): Olahraga ringan 1-3x/minggu</li>
                <li>Moderately active (1.55): Olahraga sedang 3-5x/minggu</li>
                <li>Very active (1.725): Olahraga berat 6-7x/minggu</li>
                <li>Extra active (1.9): Olahraga sangat berat, pekerjaan fisik</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Aplikasi Praktis</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Manajemen Berat Badan</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Defisit kalori: TDEE - 500 kalori untuk penurunan 0.5kg/minggu</li>
                <li>Surplus kalori: TDEE + 500 kalori untuk penambahan 0.5kg/minggu</li>
                <li>Pemeliharaan: Sesuaikan dengan TDEE</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-medium text-[#34D399] mb-2">Optimasi Performa</h3>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>Penyesuaian nutrisi berdasarkan TDEE</li>
                <li>Strategi pemulihan pasca-latihan</li>
                <li>Manajemen energi untuk aktivitas sehari-hari</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#34D399]">Kesimpulan</h2>
          <p className="text-white text-lg leading-relaxed">
            Pemahaman yang baik tentang BMI dan BMR adalah fondasi penting dalam perhitungan TDEE yang akurat.
            Dengan mengintegrasikan ketiga komponen ini, Anda dapat membuat keputusan yang lebih baik tentang
            nutrisi dan aktivitas fisik untuk mencapai tujuan kesehatan Anda. Ingat bahwa angka-angka ini adalah
            panduan, dan konsultasi dengan profesional kesehatan selalu direkomendasikan untuk program yang lebih personal.
          </p>
        </div>
      }
    />
  );
};

export default Article2; 