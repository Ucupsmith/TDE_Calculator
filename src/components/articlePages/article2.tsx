import React from "react";
import Article from "@/components/ArticleComponent/Article";
import BmiTable from "@/components/ArticleComponent/BmiTable";

const Article2 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">BMI (Body Mass Index)</h2>
          <p className="text-gray-700 mb-4">
            BMI atau Indeks Massa Tubuh adalah ukuran yang digunakan untuk menilai apakah berat badan seseorang ideal atau tidak berdasarkan tinggi badan. Ini adalah langkah pertama dalam memahami status kesehatan tubuh Anda.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-center font-bold mb-2">Rumus BMI:</p>
            <p className="text-center italic">BMI = Berat Badan (kg) / (Tinggi Badan (m))²</p>
          </div>
          <div className="mt-4">
            <BmiTable />
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">BMR (Basal Metabolic Rate)</h2>
          <p className="text-gray-700 mb-4">
            BMR adalah jumlah kalori yang dibakar tubuh saat dalam keadaan istirahat total. Ini adalah komponen terbesar dari TDEE Anda, biasanya mencakup 60-75% dari total pengeluaran kalori harian.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div>
              <p className="text-center font-bold mb-2">Rumus BMR untuk Pria:</p>
              <p className="text-center italic">BMR = 10 x berat (kg) + 6.25 x tinggi (cm) - 5 x umur + 5</p>
            </div>
            <div>
              <p className="text-center font-bold mb-2">Rumus BMR untuk Wanita:</p>
              <p className="text-center italic">BMR = 10 x berat (kg) + 6.25 x tinggi (cm) - 5 x umur - 161</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Faktor yang Mempengaruhi BMR</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Usia (BMR menurun seiring bertambahnya usia)</li>
            <li>Jenis kelamin (Pria umumnya memiliki BMR lebih tinggi)</li>
            <li>Komposisi tubuh (Massa otot meningkatkan BMR)</li>
            <li>Genetika</li>
            <li>Kondisi kesehatan</li>
          </ul>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="BMI dan BMR: Dasar Perhitungan TDEE"
      content={content}
      imageSrc="/tdee2.jpg"
      showBmiTable={true}
    />
  );
};

export default Article2; 