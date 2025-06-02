import React from "react";
import Article from "@/components/ArticleComponent/Article";
import AktivitasTable from "@/components/ArticleComponent/AktivitasTable";

const Article11 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">TDEE dan Dampak Berbagai Jenis Olahraga</h2>
          <p className="text-gray-700 mb-4">
            Jumlah kalori yang Anda bakar melalui olahraga sangat bervariasi tergantung pada jenis, intensitas, dan durasi aktivitasnya. Menghitung TDEE (Total Daily Energy Expenditure) secara akurat untuk atlet atau individu yang aktif berolahraga memerlukan pertimbangan yang cermat terhadap faktor aktivitas fisik (EAT).
          </p>
          <p className="text-gray-700 mb-4">
            Meskipun tabel faktor aktivitas memberikan panduan umum, kebutuhan kalori spesifik dari berbagai jenis olahraga bisa sangat berbeda. Atlet daya tahan (seperti pelari maraton atau pesepeda) mungkin membakar ribuan kalori dalam satu sesi, sementara atlet kekuatan (seperti angkat besi) mungkin membakar lebih sedikit per sesi tetapi membangun massa otot yang meningkatkan BMR jangka panjang.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Menghitung EAT untuk Olahraga Spesifik</h2>
          <p className="text-gray-700 mb-4">
            Untuk perhitungan TDEE yang lebih presisi bagi individu dengan pola olahraga spesifik, Anda bisa mempertimbangkan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Penggunaan Wearable Devices:</span> Smartwatch atau fitness tracker dapat memberikan estimasi pembakaran kalori selama latihan.</li>
            <li><span className="font-semibold">Data METs:</span> Metabolic Equivalents (METs) adalah ukuran yang memperkirakan berapa kali lipat energi yang dikeluarkan tubuh dibandingkan saat istirahat untuk aktivitas tertentu. Anda bisa mencari tabel METs untuk berbagai olahraga.</li>
            <li><span className="font-semibold">Konsultasi dengan Profesional:</span> Ahli gizi olahraga dapat membantu menghitung kebutuhan energi Anda berdasarkan program latihan spesifik.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Pentingnya Penyesuaian</h2>
          <p className="text-gray-700 mb-4">
            Ingatlah untuk selalu memantau respons tubuh Anda (tingkat energi, berat badan, performa). Angka TDEE adalah estimasi, dan penyesuaian mungkin diperlukan seiring perubahan program latihan atau adaptasi tubuh Anda.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="Menghitung TDEE untuk Berbagai Jenis Olahraga"
      content={content}
      imageSrc="/tdee11.jpg"
      showBmiTable={false}
    />
  );
};

export default Article11;