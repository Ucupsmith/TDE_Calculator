import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article8 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">Optimalisasi Performa Atlet dengan TDEE</h2>
          <p className="text-gray-700 mb-4">
            Bagi atlet, nutrisi yang tepat bukan hanya tentang kesehatan, tetapi juga langsung memengaruhi performa, pemulihan, dan pencegahan cedera. Memahami dan menghitung TDEE (Total Daily Energy Expenditure) adalah fundamental dalam merancang rencana makan yang mendukung kebutuhan energi tinggi seorang atlet.
          </p>
          <p className="text-gray-700 mb-4">
            Kebutuhan kalori atlet jauh lebih tinggi dibandingkan individu yang kurang aktif karena tingkat latihan yang intens dan sering. TDEE membantu atlet menentukan berapa banyak kalori yang perlu mereka konsumsi untuk:.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Memiliki energi yang cukup selama latihan dan kompetisi.</li>
            <li>Mempercepat pemulihan setelah sesi berat.</li>
            <li>Mempertahankan komposisi tubuh yang optimal untuk cabang olahraga mereka.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Faktor TDEE pada Atlet</h2>
          <p className="text-gray-700 mb-4">
            Selain BMR, faktor aktivitas fisik (Exercise Activity Thermogenesis - EAT) memiliki kontribusi yang sangat besar pada TDEE atlet. Jenis, durasi, dan intensitas latihan harian sangat memengaruhi jumlah kalori yang terbakar. Penyesuaian TDEE harus dilakukan berdasarkan fase latihan (misalnya, pra-musim, musim kompetisi, atau off-season).
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Strategi Nutrisi Berbasis TDEE</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Konsumsi kalori yang cukup untuk menghindari defisit energi yang bisa menurunkan performa dan meningkatkan risiko cedera.</li>
            <li>Fokus pada waktu asupan nutrisi, terutama karbohidrat untuk energi dan protein untuk perbaikan otot di sekitar waktu latihan.</li>
            <li>Pastikan hidrasi yang cukup.</li>
            <li>Pertimbangkan suplemen jika ada kesenjangan nutrisi yang sulit dipenuhi dari makanan saja (dengan panduan profesional).</li>
          </ul>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="TDEE for Athletes: How it Impacts Performance"
      content={content}
      imageSrc="/tdee8.jpg"
      showBmiTable={false}
    />
  );
};

export default Article8;