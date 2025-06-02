import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article7 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">TDEE dan Surplus Kalori untuk Pertumbuhan Otot</h2>
          <p className="text-gray-700 mb-4">
            Untuk membangun massa otot, Anda tidak hanya perlu latihan kekuatan yang efektif, tetapi juga asupan nutrisi yang memadai. Salah satu konsep kunci dalam nutrisi untuk pertumbuhan otot adalah menciptakan surplus kalori—mengonsumsi lebih banyak kalori daripada yang Anda bakar.
          </p>
          <p className="text-gray-700 mb-4">
            Di sinilah TDEE (Total Daily Energy Expenditure) berperan penting. Dengan mengetahui TDEE Anda, Anda bisa menentukan target asupan kalori harian yang sedikit di atas kebutuhan pemeliharaan untuk mendukung proses sintesis protein otot (muscle protein synthesis).
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Menentukan Surplus Kalori yang Ideal</h2>
          <p className="text-gray-700 mb-4">
            Surplus kalori yang terlalu besar bisa menyebabkan penambahan lemak yang tidak diinginkan. Umumnya, surplus kalori sebesar 250-500 kalori di atas TDEE sudah cukup untuk mendukung pertumbuhan otot tanpa akumulasi lemak berlebih yang signifikan, terutama bagi individu yang tidak baru dalam latihan beban.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Bagi pemula, surplus kalori bisa sedikit lebih besar karena &apos;gainz&apos; terjadi lebih cepat.</li>
            <li>Bagi individu yang lebih mahir, surplus yang lebih kecil dan pertumbuhan otot yang lebih lambat mungkin diperlukan untuk meminimalkan penambahan lemak.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Pentingnya Protein</h2>
          <p className="text-gray-700 mb-4">
            Selain total kalori, pastikan asupan protein Anda mencukupi (sekitar 1.6-2.2 gram per kg berat badan) untuk menyediakan &apos;bahan bakar&apos; yang dibutuhkan otot untuk pulih dan tumbuh.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="TDEE untuk Meningkatkan Massa Otot"
      content={content}
      imageSrc="/tdee7.jpg"
      showBmiTable={false}
    />
  );
};

export default Article7;