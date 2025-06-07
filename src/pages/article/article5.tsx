import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article5 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">TDEE sebagai Dasar Perencanaan Makan</h2>
          <p className="text-gray-700 mb-4">
            Memahami TDEE (Total Daily Energy Expenditure) adalah langkah pertama yang krusial dalam merancang strategi pola makan yang efektif. TDEE memberi tahu Anda perkiraan jumlah kalori yang tubuh Anda butuhkan setiap hari untuk mempertahankan fungsi dasar dan aktivitas fisik.
          </p>
          <p className="text-gray-700 mb-4">
            Setelah mengetahui angka TDEE Anda, Anda bisa menentukan target kalori harian, apakah untuk menurunkan berat badan (defisit kalori), menambah berat badan (surplus kalori), atau mempertahankannya.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Distribusi Makronutrien</h2>
          <p className="text-gray-700 mb-4">
            Selain jumlah total kalori, penting juga untuk memperhatikan distribusi makronutrien (karbohidrat, protein, dan lemak). Proporsi ideal bisa bervariasi tergantung tujuan dan preferensi individu, namun panduan umum bisa membantu.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Protein:</span> Penting untuk perbaikan otot dan rasa kenyang. Targetkan 0.8-1.2 gram per kg berat badan, atau lebih tinggi jika aktif atau bertujuan membangun otot.</li>
            <li><span className="font-semibold">Lemak:</span> Dibutuhkan untuk fungsi hormonal dan kesehatan sel. Fokus pada lemak sehat dan usahakan 20-30% dari total kalori harian.</li>
            <li><span className="font-semibold">Karbohidrat:</span> Sumber energi utama. Sisanya dari total kalori setelah protein dan lemak terpenuhi akan berasal dari karbohidrat.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Tips Praktis</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gunakan aplikasi pencatat kalori untuk melacak asupan Anda.</li>
            <li>Rencanakan makanan Anda di muka.</li>
            <li>Perhatikan porsi makan.</li>
            <li>Prioritaskan makanan utuh dan bergizi.</li>
            <li>Sesuaikan asupan berdasarkan progres Anda.</li>
          </ul>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="Strategi Mengatur Pola Makan Berdasarkan TDEE"
      content={content}
      imageSrc="/tdee5.jpeg"
      showBmiTable={false}
    />
  );
};

export default Article5;