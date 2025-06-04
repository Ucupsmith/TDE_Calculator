import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article45 = () => {
  return (
    <Article
      title="TDEE: Panduan untuk Vegetarian dan Vegan"
      imageSrc="/tdee45.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) untuk vegetarian dan vegan memerlukan
            perhatian khusus karena pola makan yang berbeda. Memahami kebutuhan nutrisi
            dan energi yang tepat sangat penting untuk menjaga kesehatan dan performa.
          </p>

          <h2 className="text-2xl font-semibold text-[#34D399]">Kebutuhan Energi</h2>
          <p className="text-white text-lg leading-relaxed">
            Faktor yang mempengaruhi TDEE vegetarian dan vegan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Kepadatan Energi
              <ul className="list-disc pl-6 mt-2">
                <li>Makanan nabati umumnya lebih rendah kalori</li>
                <li>Perlu porsi lebih besar untuk memenuhi kebutuhan</li>
                <li>Fokus pada makanan padat nutrisi</li>
              </ul>
            </li>
            <li>Distribusi Makronutrien
              <ul className="list-disc pl-6 mt-2">
                <li>Karbohidrat: 45-65% total kalori</li>
                <li>Protein: 15-25% total kalori</li>
                <li>Lemak: 20-35% total kalori</li>
              </ul>
            </li>
            <li>Frekuensi Makan
              <ul className="list-disc pl-6 mt-2">
                <li>5-6 kali makan per hari</li>
                <li>Snack sehat di antara waktu makan</li>
                <li>Porsi lebih kecil tapi sering</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Sumber Protein</h2>
          <p className="text-white text-lg leading-relaxed">
            Sumber protein nabati berkualitas tinggi:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Kacang-kacangan
              <ul className="list-disc pl-6 mt-2">
                <li>Tempe dan tahu</li>
                <li>Kacang kedelai</li>
                <li>Kacang merah</li>
                <li>Kacang hijau</li>
              </ul>
            </li>
            <li>Biji-bijian
              <ul className="list-disc pl-6 mt-2">
                <li>Quinoa</li>
                <li>Amaranth</li>
                <li>Biji chia</li>
                <li>Biji rami</li>
              </ul>
            </li>
            <li>Sayuran
              <ul className="list-disc pl-6 mt-2">
                <li>Brokoli</li>
                <li>Bayam</li>
                <li>Kale</li>
                <li>Jamur</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Nutrisi Penting</h2>
          <p className="text-white text-lg leading-relaxed">
            Nutrisi yang perlu diperhatikan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Vitamin B12
              <ul className="list-disc pl-6 mt-2">
                <li>Suplemen B12</li>
                <li>Makanan fortifikasi</li>
                <li>Pemeriksaan rutin</li>
              </ul>
            </li>
            <li>Zat Besi
              <ul className="list-disc pl-6 mt-2">
                <li>Konsumsi dengan vitamin C</li>
                <li>Hindari teh/kopi saat makan</li>
                <li>Pilih makanan kaya zat besi</li>
              </ul>
            </li>
            <li>Kalsium
              <ul className="list-disc pl-6 mt-2">
                <li>Sayuran hijau</li>
                <li>Tahu</li>
                <li>Susu nabati fortifikasi</li>
              </ul>
            </li>
            <li>Omega-3
              <ul className="list-disc pl-6 mt-2">
                <li>Biji chia</li>
                <li>Biji rami</li>
                <li>Kacang walnut</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Perencanaan Makan</h2>
          <p className="text-white text-lg leading-relaxed">
            Strategi perencanaan makan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Persiapan Makanan
              <ul className="list-disc pl-6 mt-2">
                <li>Batch cooking</li>
                <li>Meal prep mingguan</li>
                <li>Variasi menu</li>
              </ul>
            </li>
            <li>Porsi Makan
              <ul className="list-disc pl-6 mt-2">
                <li>Piring seimbang</li>
                <li>Protein setiap kali makan</li>
                <li>Lemak sehat</li>
              </ul>
            </li>
            <li>Snack Sehat
              <ul className="list-disc pl-6 mt-2">
                <li>Kacang-kacangan</li>
                <li>Buah-buahan</li>
                <li>Protein shake</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Monitoring</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara memantau nutrisi dan TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Parameter Fisik
              <ul className="list-disc pl-6 mt-2">
                <li>Berat badan</li>
                <li>Energi harian</li>
                <li>Kualitas tidur</li>
              </ul>
            </li>
            <li>Parameter Biokimia
              <ul className="list-disc pl-6 mt-2">
                <li>Vitamin B12</li>
                <li>Zat besi</li>
                <li>Vitamin D</li>
              </ul>
            </li>
            <li>Penyesuaian
              <ul className="list-disc pl-6 mt-2">
                <li>Kalori harian</li>
                <li>Makronutrien</li>
                <li>Suplemen</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Dengan pemahaman yang tepat tentang TDEE dan nutrisi, vegetarian dan vegan
            dapat mencapai kesehatan optimal dan performa yang baik. Penting untuk
            memastikan semua kebutuhan nutrisi terpenuhi melalui variasi makanan
            dan suplemen yang tepat.
          </p>
        </div>
}
    />
  );
};

export default Article45;