import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article12 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">Hubungan TDEE dan Pilihan Makanan</h2>
          <p className="text-gray-700 mb-4">
            Mengetahui TDEE (Total Daily Energy Expenditure) adalah fondasi untuk menentukan berapa banyak kalori yang Anda butuhkan. Namun, jenis kalori yang Anda konsumsi sama pentingnya dengan jumlahnya, terutama dalam mencapai tujuan kesehatan dan kebugaran.
          </p>
          <p className="text-gray-700 mb-4">
            Memilih jenis makanan yang tepat akan membantu Anda merasa kenyang lebih lama, mendapatkan nutrisi esensial, dan mendukung fungsi tubuh yang optimal. TDEE memandu total asupan, sementara kualitas makanan memastikan tubuh Anda mendapatkan &apos;bahan bakar&apos; terbaik.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Prioritaskan Makanan Utuh</h2>
          <p className="text-gray-700 mb-4">
            Fokuslah pada makanan utuh dan minim proses seperti:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Protein Berkualitas:</span> Daging tanpa lemak, unggas, ikan, telur, kacang-kacangan, biji-bijian, tahu, tempe. Penting untuk perbaikan jaringan dan rasa kenyang.</li>
            <li><span className="font-semibold">Karbohidrat Kompleks:</span> Gandum utuh, beras merah, quinoa, ubi, sayuran bertepung. Memberikan energi berkelanjutan.</li>
            <li><span className="font-semibold">Lemak Sehat:</span> Alpukat, kacang-kacangan, biji-bijian, minyak zaitun, ikan berlemak. Mendukung fungsi hormonal dan penyerapan vitamin.</li>
            <li><span className="font-semibold">Buah dan Sayuran:</span> Kaya vitamin, mineral, serat, dan antioksidan dengan kalori relatif rendah.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Perhatikan Kepadatan Nutrisi</h2>
          <p className="text-gray-700 mb-4">
            Dengan TDEE sebagai target kalori, Anda memiliki &apos;anggaran&apos; energi harian. Pilih makanan dengan kepadatan nutrisi tinggi—yang memberikan banyak vitamin, mineral, dan serat per kalori—untuk memaksimalkan nutrisi dalam batas kalori Anda.
          </p>
          <p className="text-gray-700">
            Minuman manis, makanan ringan tinggi gula dan lemak trans, serta makanan olahan cenderung padat kalori tetapi rendah nutrisi. Mengurangi asupan ini memungkinkan Anda mengonsumsi lebih banyak volume makanan bergizi lainnya dalam batas TDEE Anda, membantu manajemen rasa lapar dan kesehatan jangka panjang.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="TDEE dan Pemilihan Jenis Makanan yang Tepat"
      content={content}
      imageSrc="/tdee12.webp"
      showBmiTable={false}
    />
  );
};

export default Article12;