import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article6 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">Peran TDEE dalam Penurunan Berat Badan</h2>
          <p className="text-gray-700 mb-4">
            Ketika tujuan Anda adalah menurunkan berat badan, memahami TDEE (Total Daily Energy Expenditure) menjadi sangat penting. Penurunan berat badan terjadi ketika Anda mengonsumsi lebih sedikit kalori daripada yang Anda bakar, menciptakan defisit kalori.
          </p>
          <p className="text-gray-700 mb-4">
            Angka TDEE memberikan estimasi kebutuhan kalori harian Anda, termasuk energi untuk fungsi basal, pencernaan, dan aktivitas fisik. Dengan mengetahui TDEE, Anda bisa menentukan target asupan kalori yang memungkinkan defisit tanpa mengurangi nutrisi penting secara drastis.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Menciptakan Defisit Kalori yang Sehat</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Defisit 500-750 kalori per hari dari TDEE umumnya menghasilkan penurunan berat badan sekitar 0.5-1 kg per minggu, yang dianggap sehat dan berkelanjutan.</li>
            <li>Jangan membuat defisit terlalu besar karena bisa menyebabkan hilangnya massa otot, penurunan metabolisme, dan kekurangan nutrisi.</li>
            <li>Kombinasikan pengurangan asupan kalori dengan peningkatan aktivitas fisik untuk hasil optimal.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Memantau dan Menyesuaikan</h2>
          <p className="text-gray-700 mb-4">
            Tubuh Anda akan beradaptasi seiring waktu, dan TDEE Anda bisa berubah seiring penurunan berat badan atau peningkatan aktivitas. Penting untuk secara berkala mengevaluasi progres Anda dan menyesuaikan asupan kalori atau tingkat aktivitas fisik jika diperlukan.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="Pentingnya TDEE untuk Program Penurunan Berat Badan"
      content={content}
      imageSrc="/tdee6.jpg"
      showBmiTable={false}
    />
  );
};

export default Article6;