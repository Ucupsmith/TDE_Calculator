import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article12 = () => {
  return (
    <Article
      title="TDEE dan Kesehatan Mental"
      imageSrc="/tdee12.jpg"
      content={
        <div className="space-y-6 pb-20">
          <p className="text-white text-lg leading-relaxed">
            Total Daily Energy Expenditure (TDEE) tidak hanya mempengaruhi kesehatan fisik,
            tetapi juga memiliki dampak signifikan terhadap kesehatan mental. Memahami
            hubungan antara nutrisi, energi, dan kesehatan mental membantu Anda mencapai
            keseimbangan yang optimal.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#34D399]">Nutrisi dan Kesehatan Mental</h2>
          <p className="text-white text-lg leading-relaxed">
            Hubungan antara nutrisi dan kesehatan mental:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Nutrisi Penting untuk Otak
              <ul className="list-disc pl-6 mt-2">
                <li>Omega-3 untuk fungsi otak</li>
                <li>Vitamin B untuk produksi neurotransmitter</li>
                <li>Magnesium untuk relaksasi</li>
                <li>Zinc untuk regulasi mood</li>
              </ul>
            </li>
            <li>Dampak Defisit Kalori
              <ul className="list-disc pl-6 mt-2">
                <li>Penurunan fungsi kognitif</li>
                <li>Perubahan mood</li>
                <li>Peningkatan kecemasan</li>
                <li>Gangguan tidur</li>
              </ul>
            </li>
            <li>Dampak Surplus Kalori
              <ul className="list-disc pl-6 mt-2">
                <li>Perubahan suasana hati</li>
                <li>Penurunan energi</li>
                <li>Gangguan fokus</li>
                <li>Perubahan pola tidur</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Stres dan TDEE</h2>
          <p className="text-white text-lg leading-relaxed">
            Pengaruh stres terhadap kebutuhan energi:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Stres Kronis
              <ul className="list-disc pl-6 mt-2">
                <li>Meningkatkan kebutuhan energi</li>
                <li>Mengganggu pola makan</li>
                <li>Mempengaruhi metabolisme</li>
                <li>Mengubah preferensi makanan</li>
              </ul>
            </li>
            <li>Stres Akut
              <ul className="list-disc pl-6 mt-2">
                <li>Peningkatan denyut jantung</li>
                <li>Peningkatan metabolisme</li>
                <li>Perubahan nafsu makan</li>
                <li>Gangguan pencernaan</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Gangguan Makan</h2>
          <p className="text-white text-lg leading-relaxed">
            Hubungan antara TDEE dan gangguan makan:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Anoreksia Nervosa
              <ul className="list-disc pl-6 mt-2">
                <li>Defisit kalori ekstrem</li>
                <li>Penurunan TDEE</li>
                <li>Gangguan metabolisme</li>
                <li>Dampak psikologis</li>
              </ul>
            </li>
            <li>Bulimia Nervosa
              <ul className="list-disc pl-6 mt-2">
                <li>Fluktuasi TDEE</li>
                <li>Gangguan pencernaan</li>
                <li>Ketidakseimbangan elektrolit</li>
                <li>Dampak mental</li>
              </ul>
            </li>
            <li>Binge Eating Disorder
              <ul className="list-disc pl-6 mt-2">
                <li>Surplus kalori signifikan</li>
                <li>Fluktuasi berat badan</li>
                <li>Gangguan metabolisme</li>
                <li>Dampak psikologis</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Strategi Penanganan</h2>
          <p className="text-white text-lg leading-relaxed">
            Cara menangani masalah kesehatan mental terkait TDEE:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Pendekatan Holistik
              <ul className="list-disc pl-6 mt-2">
                <li>Konsultasi dengan profesional</li>
                <li>Terapi nutrisi</li>
                <li>Dukungan psikologis</li>
                <li>Olahraga teratur</li>
              </ul>
            </li>
            <li>Perubahan Gaya Hidup
              <ul className="list-disc pl-6 mt-2">
                <li>Pola makan teratur</li>
                <li>Manajemen stres</li>
                <li>Tidur yang cukup</li>
                <li>Aktivitas fisik seimbang</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34D399]">Tips Praktis</h2>
          <p className="text-white text-lg leading-relaxed">
            Panduan praktis untuk menjaga kesehatan mental:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-white text-lg">
            <li>Nutrisi Seimbang
              <ul className="list-disc pl-6 mt-2">
                <li>Konsumsi makanan utuh</li>
                <li>Hindari makanan olahan</li>
                <li>Jaga hidrasi</li>
                <li>Makan teratur</li>
              </ul>
            </li>
            <li>Manajemen Stres
              <ul className="list-disc pl-6 mt-2">
                <li>Teknik relaksasi</li>
                <li>Meditasi</li>
                <li>Olahraga teratur</li>
                <li>Hobi yang menenangkan</li>
              </ul>
            </li>
            <li>Dukungan Sosial
              <ul className="list-disc pl-6 mt-2">
                <li>Berbagi dengan teman</li>
                <li>Bergabung dengan komunitas</li>
                <li>Konsultasi profesional</li>
                <li>Dukungan keluarga</li>
              </ul>
            </li>
          </ul>

          <p className="mt-6 text-white text-lg leading-relaxed">
            Memahami hubungan antara TDEE dan kesehatan mental membantu Anda membuat
            keputusan yang lebih baik tentang nutrisi dan gaya hidup. Ingat bahwa
            kesehatan mental sama pentingnya dengan kesehatan fisik, dan keduanya
            saling terkait dalam mencapai kesejahteraan secara keseluruhan.
          </p>
      </div>
      }
    />
  );
};

export default Article12;