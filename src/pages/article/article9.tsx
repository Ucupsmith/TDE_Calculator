import React from "react";
import Article from "@/components/ArticleComponent/Article";

const Article9 = () => {
  const content = (
    <>
      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-xl mb-4">TDEE sebagai Fondasi Rencana Makan</h2>
          <p className="text-gray-700 mb-4">
            Perencanaan gizi harian yang efektif dimulai dengan pemahaman tentang kebutuhan energi tubuh Anda. Di sinilah Total Daily Energy Expenditure (TDEE) menjadi panduan utama. TDEE adalah perkiraan jumlah kalori yang Anda bakar setiap hari, dan angka ini menjadi dasar untuk menentukan berapa banyak kalori yang perlu Anda konsumsi.
          </p>
          <p className="text-gray-700 mb-4">
            Apakah tujuan Anda adalah menurunkan berat badan, menambah massa otot, atau hanya menjaga berat badan saat ini, TDEE membantu Anda menetapkan target kalori yang realistis. Tanpa mengetahui TDEE, sulit untuk secara konsisten mencapai tujuan nutrisi Anda.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Mengubah TDEE Menjadi Rencana Praktis</h2>
          <p className="text-gray-700 mb-4">
            Setelah Anda memiliki angka TDEE (dan mungkin menyesuaikannya untuk tujuan Anda), langkah selanjutnya adalah menerjemahkannya menjadi rencana makan harian.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Alokasikan Kalori:</span> Bagi total kalori harian Anda ke dalam beberapa waktu makan (sarapan, makan siang, makan malam, camilan).</li>
            <li><span className="font-semibold">Pertimbangkan Makronutrien:</span> Tentukan rasio atau gram makronutrien (protein, karbohidrat, lemak) yang sesuai dengan tujuan dan preferensi Anda.</li>
            <li><span className="font-semibold">Pilih Makanan Bergizi:</span> Isi rencana makan Anda dengan makanan utuh yang kaya nutrisi untuk memastikan Anda mendapatkan vitamin dan mineral yang dibutuhkan.</li>
            <li><span className="font-semibold">Fleksibilitas:</span> Rencana makan harus fleksibel dan bisa disesuaikan dengan jadwal dan situasi sosial Anda.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Memantau dan Beradaptasi</h2>
          <p className="text-gray-700 mb-4">
            Rencana gizi bukanlah sesuatu yang kaku. Pantau bagaimana tubuh Anda merespons (berat badan, tingkat energi, performa latihan) dan sesuaikan asupan kalori atau komposisi makronutrien Anda berdasarkan progres yang Anda lihat.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <Article
      title="Peran TDEE dalam Perencanaan Gizi Harian"
      content={content}
      imageSrc="/tdee9.webp"
      showBmiTable={false}
    />
  );
};

export default Article9;