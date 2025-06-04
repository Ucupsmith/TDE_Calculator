import React from "react";
import Article from "@/components/ArticleComponent/Article";
import AktivitasTable from "@/components/ArticleComponent/AktivitasTable";

const Article5 = () => {
  return (
    <Article
      title="Strategi Mengatur Pola Makan Berdasarkan TDEE"
      imageSrc="/tdee5.jpeg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Mengatur pola makan berdasarkan Total Daily Energy Expenditure (TDEE) adalah kunci untuk mencapai
            tujuan kesehatan dan kebugaran Anda. Dengan memahami kebutuhan kalori harian Anda, Anda dapat
            membuat rencana makan yang efektif dan berkelanjutan.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Memahami Kebutuhan Kalori</h2>
          <p className="text-white text-lg leading-relaxed">
            Sebelum mengatur pola makan, penting untuk memahami kebutuhan kalori Anda:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Defisit kalori (untuk penurunan berat badan): TDEE - 500 kalori</li>
            <li>Maintenance (untuk menjaga berat badan): TDEE</li>
            <li>Surplus kalori (untuk penambahan massa otot): TDEE + 300-500 kalori</li>
            <li>Penyesuaian berdasarkan aktivitas fisik</li>
            <li>Pertimbangan faktor metabolisme individu</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Distribusi Makronutrien</h2>
          <p className="text-white text-lg leading-relaxed">
            Setelah menentukan total kalori, atur distribusi makronutrien:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Protein: 1.6-2.2g per kg berat badan
              <ul className="list-disc pl-6 mt-2">
                <li>Daging tanpa lemak</li>
                <li>Ikan dan seafood</li>
                <li>Telur</li>
                <li>Produk susu rendah lemak</li>
                <li>Protein nabati (tahu, tempe, kacang-kacangan)</li>
              </ul>
            </li>
            <li>Karbohidrat: 45-65% dari total kalori
              <ul className="list-disc pl-6 mt-2">
                <li>Nasi merah atau putih</li>
                <li>Roti gandum</li>
                <li>Kentang</li>
                <li>Oatmeal</li>
                <li>Buah-buahan</li>
              </ul>
            </li>
            <li>Lemak: 20-35% dari total kalori
              <ul className="list-disc pl-6 mt-2">
                <li>Alpukat</li>
                <li>Kacang-kacangan</li>
                <li>Minyak zaitun</li>
                <li>Ikan berlemak</li>
                <li>Biji-bijian</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Jadwal Makan</h2>
          <p className="text-white text-lg leading-relaxed">
            Atur jadwal makan yang sesuai dengan aktivitas Anda:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Sarapan (20-25% kalori harian)
              <ul className="list-disc pl-6 mt-2">
                <li>Kombinasi protein dan karbohidrat kompleks</li>
                <li>Waktu ideal: 1-2 jam setelah bangun</li>
                <li>Contoh: Oatmeal dengan protein shake dan buah</li>
              </ul>
            </li>
            <li>Makan Siang (30-35% kalori harian)
              <ul className="list-disc pl-6 mt-2">
                <li>Seimbang antara protein, karbohidrat, dan lemak</li>
                <li>Waktu ideal: 4-5 jam setelah sarapan</li>
                <li>Contoh: Nasi dengan ayam dan sayuran</li>
              </ul>
            </li>
            <li>Makan Malam (25-30% kalori harian)
              <ul className="list-disc pl-6 mt-2">
                <li>Fokus pada protein dan sayuran</li>
                <li>Waktu ideal: 2-3 jam sebelum tidur</li>
                <li>Contoh: Ikan dengan sayuran dan sedikit karbohidrat</li>
              </ul>
            </li>
            <li>Snack (10-15% kalori harian)
              <ul className="list-disc pl-6 mt-2">
                <li>Distribusikan di antara waktu makan utama</li>
                <li>Pilih snack tinggi protein</li>
                <li>Contoh: Greek yogurt, kacang, atau protein bar</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Tips Praktis</h2>
          <p className="text-white text-lg leading-relaxed">
            Beberapa tips untuk mengoptimalkan pola makan Anda:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Persiapkan makanan di muka (meal prep)</li>
            <li>Gunakan aplikasi tracking kalori</li>
            <li>Minum air yang cukup (2-3 liter per hari)</li>
            <li>Konsumsi makanan utuh dan minimalkan makanan olahan</li>
            <li>Perhatikan porsi makan</li>
            <li>Catat asupan makanan secara konsisten</li>
            <li>Evaluasi progress secara berkala</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Penyesuaian Berdasarkan Tujuan</h2>
          <p className="text-white text-lg leading-relaxed">
            Sesuaikan pola makan dengan tujuan spesifik Anda:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Penurunan Berat Badan
              <ul className="list-disc pl-6 mt-2">
                <li>Defisit kalori yang moderat (300-500 kalori)</li>
                <li>Fokus pada protein untuk menjaga massa otot</li>
                <li>Kurangi karbohidrat sederhana</li>
                <li>Tingkatkan asupan serat</li>
              </ul>
            </li>
            <li>Penambahan Massa Otot
              <ul className="list-disc pl-6 mt-2">
                <li>Surplus kalori yang konsisten</li>
                <li>Tingkatkan asupan protein</li>
                <li>Distribusikan karbohidrat sepanjang hari</li>
                <li>Pertahankan asupan lemak sehat</li>
              </ul>
            </li>
            <li>Maintenance
              <ul className="list-disc pl-6 mt-2">
                <li>Pertahankan kalori di level TDEE</li>
                <li>Seimbangkan makronutrien</li>
                <li>Fokus pada kualitas makanan</li>
                <li>Monitor perubahan berat badan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Mengatasi Tantangan</h2>
          <p className="text-white text-lg leading-relaxed">
            Beberapa tantangan umum dan solusinya:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Kesulitan Menghitung Kalori
              <ul className="list-disc pl-6 mt-2">
                <li>Gunakan timbangan makanan</li>
                <li>Pelajari ukuran porsi standar</li>
                <li>Manfaatkan aplikasi tracking</li>
              </ul>
            </li>
            <li>Mengatasi Lapar
              <ul className="list-disc pl-6 mt-2">
                <li>Konsumsi makanan tinggi serat</li>
                <li>Minum air yang cukup</li>
                <li>Atur jadwal makan yang teratur</li>
              </ul>
            </li>
            <li>Mempertahankan Konsistensi
              <ul className="list-disc pl-6 mt-2">
                <li>Buat rencana yang realistis</li>
                <li>Siapkan makanan di muka</li>
                <li>Catat progress secara teratur</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Mengatur pola makan berdasarkan TDEE membutuhkan konsistensi dan kesabaran. Mulailah dengan
            perubahan kecil dan tingkatkan secara bertahap. Ingat bahwa setiap orang memiliki kebutuhan
            yang berbeda, jadi sesuaikan rencana makan Anda berdasarkan respons tubuh dan tujuan spesifik Anda.
            Evaluasi dan sesuaikan pola makan Anda secara berkala untuk mencapai hasil yang optimal.
          </p>
      </div>
      }
    />
  );
};

export default Article5;