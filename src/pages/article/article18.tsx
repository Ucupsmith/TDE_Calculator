import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article18 = () => {
  return (
    <Article
      title="TDEE dan Nutrisi untuk Atlet"
      imageSrc="/tdee18.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) untuk atlet memerlukan
            pendekatan khusus karena kebutuhan energi yang lebih tinggi dan
            tuntutan performa. Memahami kebutuhan nutrisi yang tepat membantu
            mengoptimalkan performa dan pemulihan.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Kebutuhan Energi</h2>
          <p className="text-white text-lg leading-relaxed">
            Faktor yang mempengaruhi TDEE atlet:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Jenis Olahraga
              <ul className="list-disc pl-6 mt-2">
                <li>Endurance: 3000-5000 kkal/hari</li>
                <li>Strength: 2500-4000 kkal/hari</li>
                <li>Team sports: 3000-4500 kkal/hari</li>
                <li>Elite athletes: 4000-6000 kkal/hari</li>
              </ul>
            </li>
            <li>Intensitas Latihan
              <ul className="list-disc pl-6 mt-2">
                <li>Volume latihan</li>
                <li>Frekuensi latihan</li>
                <li>Durasi latihan</li>
                <li>Intensitas latihan</li>
              </ul>
            </li>
            <li>Faktor Tambahan
              <ul className="list-disc pl-6 mt-2">
                <li>Komposisi tubuh</li>
                <li>Usia dan jenis kelamin</li>
                <li>Kondisi lingkungan</li>
                <li>Fase latihan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Distribusi Makronutrien</h2>
          <p className="text-white text-lg leading-relaxed">
            Kebutuhan makronutrien untuk atlet:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Karbohidrat
              <ul className="list-disc pl-6 mt-2">
                <li>Endurance: 6-10g/kg BB</li>
                <li>Strength: 4-7g/kg BB</li>
                <li>Team sports: 5-8g/kg BB</li>
                <li>Timing konsumsi</li>
              </ul>
            </li>
            <li>Protein
              <ul className="list-disc pl-6 mt-2">
                <li>Endurance: 1.2-1.4g/kg BB</li>
                <li>Strength: 1.6-2.0g/kg BB</li>
                <li>Team sports: 1.4-1.7g/kg BB</li>
                <li>Distribusi harian</li>
              </ul>
            </li>
            <li>Lemak
              <ul className="list-disc pl-6 mt-2">
                <li>20-35% total kalori</li>
                <li>Lemak esensial</li>
                <li>Omega-3</li>
                <li>Timing konsumsi</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Nutrisi Latihan</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi nutrisi untuk latihan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Pre-Workout
              <ul className="list-disc pl-6 mt-2">
                <li>Karbohidrat: 1-4g/kg BB</li>
                <li>Protein: 0.3-0.4g/kg BB</li>
                <li>Hidrasi: 5-7ml/kg BB</li>
                <li>Timing: 1-4 jam</li>
              </ul>
            </li>
            <li>Selama Latihan
              <ul className="list-disc pl-6 mt-2">
                <li>Hidrasi: 0.4-0.8L/jam</li>
                <li>Elektrolit</li>
                <li>Karbohidrat: 30-60g/jam</li>
                <li>Durasi &gt; 60 menit</li>
              </ul>
            </li>
            <li>Post-Workout
              <ul className="list-disc pl-6 mt-2">
                <li>Karbohidrat: 1-1.2g/kg BB</li>
                <li>Protein: 0.3-0.4g/kg BB</li>
                <li>Hidrasi: 1.5x defisit</li>
                <li>Window: 30 menit</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Suplemen</h2>
          <p className="text-white text-lg leading-relaxed">
            Suplemen yang direkomendasikan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Suplemen Dasar
              <ul className="list-disc pl-6 mt-2">
                <li>Protein powder</li>
                <li>Creatine</li>
                <li>Multivitamin</li>
                <li>Omega-3</li>
              </ul>
            </li>
            <li>Suplemen Performa
              <ul className="list-disc pl-6 mt-2">
                <li>Beta-alanine</li>
                <li>Caffeine</li>
                <li>BCAA</li>
                <li>Electrolytes</li>
              </ul>
            </li>
            <li>Suplemen Pemulihan
              <ul className="list-disc pl-6 mt-2">
                <li>Glutamine</li>
                <li>Vitamin D</li>
                <li>Magnesium</li>
                <li>Zinc</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi monitoring nutrisi:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Parameter Fisik
              <ul className="list-disc pl-6 mt-2">
                <li>Berat badan</li>
                <li>Komposisi tubuh</li>
                <li>Hidrasi</li>
                <li>Performa</li>
              </ul>
            </li>
            <li>Parameter Biokimia
              <ul className="list-disc pl-6 mt-2">
                <li>Hemoglobin</li>
                <li>Ferritin</li>
                <li>Vitamin D</li>
                <li>Elektrolit</li>
              </ul>
            </li>
            <li>Penyesuaian
              <ul className="list-disc pl-6 mt-2">
                <li>Kalori</li>
                <li>Makronutrien</li>
                <li>Suplemen</li>
                <li>Timing</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Nutrisi yang tepat adalah kunci untuk performa atletik yang optimal.
            Dengan memahami dan menerapkan prinsip-prinsip nutrisi olahraga,
            atlet dapat memaksimalkan TDEE mereka untuk mencapai tujuan
            performa dan kesehatan.
          </p>
        </div>
}
    />
  );
};

export default Article18;