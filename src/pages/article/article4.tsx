import React from "react";
import Article from "@/components/ArticleComponent/Article";
import AktivitasTable from "@/components/ArticleComponent/AktivitasTable";

const Article4 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">Faktor Aktivitas dalam TDEE</h2>
          <p className="text-gray-700 mb-4">
            Tingkat aktivitas fisik adalah komponen kunci dalam menghitung Total Daily Energy Expenditure (TDEE). Semakin aktif Anda, semakin banyak kalori yang tubuh Anda bakar selain dari metabolisme basal (BMR).
          </p>
          <p className="text-gray-700 mb-4">
            Faktor aktivitas adalah angka pengali yang digunakan untuk memperkirakan jumlah kalori tambahan yang dibakar melalui aktivitas fisik sehari-hari. Memilih faktor aktivitas yang tepat sangat penting untuk mendapatkan perhitungan TDEE yang akurat.
          </p>
          <div className="mt-6">
            <AktivitasTable />
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Memilih Faktor Aktivitas yang Tepat</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Sedentary (Jarang Olahraga):</span> Jika Anda jarang atau tidak pernah berolahraga dan memiliki pekerjaan yang minim aktivitas fisik.</li>
            <li><span className="font-semibold">Lightly Active (Olahraga 1-3 hari/minggu):</span> Melakukan olahraga ringan atau aktivitas fisik beberapa kali seminggu.</li>
            <li><span className="font-semibold">Moderately Active (Olahraga 3-5 hari/minggu):</span> Berolahraga dengan intensitas sedang secara teratur.</li>
            <li><span className="font-semibold">Very Active (Olahraga 6-7 hari/minggu):</span> Melakukan olahraga intens setiap hari atau pekerjaan fisik yang berat.</li>
            <li><span className="font-semibold">Extra Active (Atlet Profesional/Pekerjaan Fisik Berat):</span> Tingkat aktivitas yang sangat tinggi, seperti atlet profesional atau pekerjaan konstruksi/pertanian.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Penyesuaian Faktor Aktivitas</h2>
          <p className="text-gray-700">
            Ingatlah bahwa faktor aktivitas ini adalah perkiraan. Dengarkan tubuh Anda dan sesuaikan angka TDEE jika hasil yang Anda dapatkan (penurunan/kenaikan/pertahanan berat badan) tidak sesuai dengan ekspektasi Anda.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="Mengenal Faktor Aktivitas dalam Perhitungan TDEE"
      content={content}
      imageSrc="/tdee4.jpg"
      showBmiTable={false}
    />
  );
};

export default Article4;