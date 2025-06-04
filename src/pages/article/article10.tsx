import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article10 = () => {
  return (
    <Article
      title="TDEE dan Kaitannya dengan Metabolisme Tubuh"
      imageSrc="/tdee10.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) memiliki hubungan yang erat dengan metabolisme tubuh.
            Metabolisme adalah proses kompleks yang mengubah makanan menjadi energi dan mempengaruhi
            seberapa efisien tubuh Anda membakar kalori.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Dasar Metabolisme</h2>
          <p className="text-white text-lg leading-relaxed">
            Komponen utama metabolisme yang mempengaruhi TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Metabolisme Basal (BMR)
              <ul className="list-disc pl-6 mt-2">
                <li>Energi yang dibutuhkan untuk fungsi dasar tubuh</li>
                <li>Mencakup 60-70% dari total TDEE</li>
                <li>Terjadi saat tubuh dalam keadaan istirahat</li>
                <li>Dipengaruhi oleh massa otot dan ukuran tubuh</li>
              </ul>
            </li>
            <li>Efek Termik Makanan (TEF)
              <ul className="list-disc pl-6 mt-2">
                <li>Energi yang digunakan untuk mencerna makanan</li>
                <li>Mencakup 10% dari total TDEE</li>
                <li>Protein memiliki efek termik tertinggi</li>
                <li>Bervariasi berdasarkan komposisi makanan</li>
              </ul>
            </li>
            <li>Aktivitas Fisik
              <ul className="list-disc pl-6 mt-2">
                <li>Energi yang digunakan untuk gerakan</li>
                <li>Mencakup 20-30% dari total TDEE</li>
                <li>Termasuk olahraga dan aktivitas sehari-hari</li>
                <li>Dapat ditingkatkan melalui latihan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Faktor yang Mempengaruhi Metabolisme</h2>
          <p className="text-white text-lg leading-relaxed">
            Beberapa faktor yang mempengaruhi tingkat metabolisme:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Komposisi Tubuh
              <ul className="list-disc pl-6 mt-2">
                <li>Massa otot lebih aktif secara metabolik</li>
                <li>Rasio otot-lemak mempengaruhi BMR</li>
                <li>Kepadatan tulang mempengaruhi berat badan</li>
                <li>Distribusi lemak tubuh</li>
              </ul>
            </li>
            <li>Usia dan Jenis Kelamin
              <ul className="list-disc pl-6 mt-2">
                <li>Metabolisme menurun seiring bertambahnya usia</li>
                <li>Pria umumnya memiliki BMR lebih tinggi</li>
                <li>Perubahan hormonal mempengaruhi metabolisme</li>
                <li>Perbedaan komposisi tubuh</li>
              </ul>
            </li>
            <li>Genetika
              <ul className="list-disc pl-6 mt-2">
                <li>Mempengaruhi efisiensi metabolisme</li>
                <li>Menentukan kecenderungan penambahan berat</li>
                <li>Mempengaruhi respons terhadap makanan</li>
                <li>Mempengaruhi distribusi lemak</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Mengoptimalkan Metabolisme</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi untuk meningkatkan efisiensi metabolisme:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Latihan Kekuatan
              <ul className="list-disc pl-6 mt-2">
                <li>Membangun massa otot</li>
                <li>Meningkatkan BMR</li>
                <li>Meningkatkan sensitivitas insulin</li>
                <li>Meningkatkan efek afterburn</li>
              </ul>
            </li>
            <li>Nutrisi yang Tepat
              <ul className="list-disc pl-6 mt-2">
                <li>Konsumsi protein yang cukup</li>
                <li>Jaga hidrasi</li>
                <li>Makan secara teratur</li>
                <li>Pilih makanan utuh</li>
              </ul>
            </li>
            <li>Gaya Hidup Sehat
              <ul className="list-disc pl-6 mt-2">
                <li>Cukup tidur</li>
                <li>Kelola stres</li>
                <li>Aktivitas fisik teratur</li>
                <li>Hindari kebiasaan tidak sehat</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Mitos dan Fakta</h2>
          <p className="text-white text-lg leading-relaxed">
            Beberapa mitos dan fakta tentang metabolisme:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Mitos Umum
              <ul className="list-disc pl-6 mt-2">
                <li>Makan lebih sering meningkatkan metabolisme</li>
                <li>Makanan tertentu membakar lemak</li>
                <li>Metabolisme lambat adalah penyebab utama kegemukan</li>
                <li>Suplemen dapat meningkatkan metabolisme secara signifikan</li>
              </ul>
            </li>
            <li>Fakta Penting
              <ul className="list-disc pl-6 mt-2">
                <li>Metabolisme bervariasi antar individu</li>
                <li>Massa otot mempengaruhi BMR</li>
                <li>Diet ekstrem dapat memperlambat metabolisme</li>
                <li>Konsistensi lebih penting daripada intensitas</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring Metabolisme</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara memantau dan mengevaluasi metabolisme:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Pengukuran Langsung
              <ul className="list-disc pl-6 mt-2">
                <li>Kalkulator TDEE online</li>
                <li>Pengukuran BMR profesional</li>
                <li>Analisis komposisi tubuh</li>
                <li>Monitor aktivitas fisik</li>
              </ul>
            </li>
            <li>Indikator Tidak Langsung
              <ul className="list-disc pl-6 mt-2">
                <li>Perubahan berat badan</li>
                <li>Tingkat energi</li>
                <li>Kualitas tidur</li>
                <li>Performa latihan</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Memahami hubungan antara TDEE dan metabolisme tubuh membantu Anda membuat keputusan
            yang lebih baik tentang nutrisi dan aktivitas fisik. Ingat bahwa metabolisme adalah
            proses kompleks yang dipengaruhi oleh banyak faktor, dan perubahan membutuhkan waktu
            dan konsistensi.
          </p>
      </div>
      }
    />
  );
};

export default Article10;