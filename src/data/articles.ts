export interface ArticleData {
  title: string;
  content: string;
  image_path: string;
  category: string;
  author_id: number;
  status: 'Published';
}

export const articles: ArticleData[] = [
  {
    title: "Pentingnya Menjaga Pola Makan Sehat",
    content: `
      <h2>Apa itu Pola Makan Sehat?</h2>
      <p>Pola makan sehat adalah kebiasaan mengonsumsi makanan yang mengandung nutrisi seimbang sesuai dengan kebutuhan tubuh. Pola makan yang sehat dapat membantu menjaga kesehatan tubuh dan mencegah berbagai penyakit.</p>
      
      <h2>Manfaat Pola Makan Sehat</h2>
      <ul>
        <li>Menjaga berat badan ideal</li>
        <li>Meningkatkan sistem kekebalan tubuh</li>
        <li>Mengurangi risiko penyakit kronis</li>
        <li>Meningkatkan energi dan produktivitas</li>
        <li>Memperbaiki kualitas tidur</li>
      </ul>

      <h2>Tips Menjaga Pola Makan Sehat</h2>
      <ol>
        <li>Konsumsi makanan bervariasi</li>
        <li>Perbanyak sayur dan buah</li>
        <li>Batasi konsumsi gula dan garam</li>
        <li>Minum air putih yang cukup</li>
        <li>Hindari makanan olahan</li>
      </ol>
    `,
    image_path: "/images/articles/healthy-diet.jpg",
    category: "Nutrition",
    author_id: 1,
    status: "Published"
  },
  {
    title: "Olahraga untuk Pemula",
    content: `
      <h2>Memulai Olahraga untuk Pemula</h2>
      <p>Memulai rutinitas olahraga bisa menjadi tantangan, terutama bagi pemula. Namun, dengan pendekatan yang tepat, olahraga bisa menjadi kebiasaan yang menyenangkan dan bermanfaat.</p>

      <h2>Jenis Olahraga untuk Pemula</h2>
      <ul>
        <li>Jalan kaki</li>
        <li>Jogging ringan</li>
        <li>Yoga</li>
        <li>Berenang</li>
        <li>Bersepeda</li>
      </ul>

      <h2>Tips Memulai Olahraga</h2>
      <ol>
        <li>Mulai dengan intensitas rendah</li>
        <li>Lakukan secara konsisten</li>
        <li>Gunakan peralatan yang tepat</li>
        <li>Perhatikan teknik yang benar</li>
        <li>Istirahat yang cukup</li>
      </ol>
    `,
    image_path: "/images/articles/beginner-exercise.jpg",
    category: "Exercise",
    author_id: 1,
    status: "Published"
  },
  {
    title: "Menjaga Kesehatan Mental",
    content: `
      <h2>Pentingnya Kesehatan Mental</h2>
      <p>Kesehatan mental sama pentingnya dengan kesehatan fisik. Menjaga kesehatan mental dapat membantu kita menjalani kehidupan dengan lebih baik dan produktif.</p>

      <h2>Cara Menjaga Kesehatan Mental</h2>
      <ul>
        <li>Meditasi rutin</li>
        <li>Olahraga teratur</li>
        <li>Istirahat yang cukup</li>
        <li>Menjaga hubungan sosial</li>
        <li>Mencari bantuan profesional jika diperlukan</li>
      </ul>

      <h2>Tanda-tanda Kesehatan Mental Terganggu</h2>
      <ol>
        <li>Perubahan mood yang drastis</li>
        <li>Kesulitan tidur</li>
        <li>Kehilangan minat pada aktivitas</li>
        <li>Perubahan pola makan</li>
        <li>Kesulitan berkonsentrasi</li>
      </ol>
    `,
    image_path: "/images/articles/mental-health.jpg",
    category: "Mental Health",
    author_id: 1,
    status: "Published"
  },
  {
    title: "TDEE dan Manajemen Stres",
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">
          Total Daily Energy Expenditure (TDEE) memainkan peran penting dalam manajemen stres.
          Ketika tubuh mengalami stres, kebutuhan energi meningkat secara signifikan.
          Memahami hubungan antara TDEE dan stres dapat membantu kita mengelola energi
          dengan lebih efektif dan mengurangi dampak negatif stres pada tubuh.
        </p>

        <h2 class="text-2xl font-semibold text-[#34D399]">Hubungan TDEE dan Stres</h2>
        <p class="text-lg leading-relaxed">
          Stres mempengaruhi TDEE melalui beberapa mekanisme:
        </p>
        <ul class="list-disc pl-6 space-y-3">
          <li>Peningkatan Metabolisme
            <ul class="list-disc pl-6 mt-2">
              <li>Peningkatan denyut jantung</li>
              <li>Peningkatan tekanan darah</li>
              <li>Peningkatan suhu tubuh</li>
              <li>Peningkatan aktivitas otot</li>
            </ul>
          </li>
          <li>Perubahan Hormonal
            <ul class="list-disc pl-6 mt-2">
              <li>Peningkatan kortisol</li>
              <li>Peningkatan adrenalin</li>
              <li>Peningkatan noradrenalin</li>
              <li>Perubahan insulin</li>
            </ul>
          </li>
          <li>Perubahan Pola Makan
            <ul class="list-disc pl-6 mt-2">
              <li>Perubahan nafsu makan</li>
              <li>Perubahan preferensi makanan</li>
              <li>Perubahan waktu makan</li>
              <li>Perubahan porsi makan</li>
            </ul>
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-[#34D399]">Dampak Stres pada TDEE</h2>
        <p class="text-lg leading-relaxed">
          Stres dapat mempengaruhi TDEE dalam beberapa cara:
        </p>
        <ul class="list-disc pl-6 space-y-3">
          <li>Peningkatan Kebutuhan Energi
            <ul class="list-disc pl-6 mt-2">
              <li>Peningkatan BMR</li>
              <li>Peningkatan aktivitas fisik</li>
              <li>Peningkatan suhu tubuh</li>
              <li>Peningkatan denyut jantung</li>
            </ul>
          </li>
          <li>Perubahan Metabolisme
            <ul class="list-disc pl-6 mt-2">
              <li>Perubahan metabolisme lemak</li>
              <li>Perubahan metabolisme protein</li>
              <li>Perubahan metabolisme karbohidrat</li>
              <li>Perubahan metabolisme air</li>
            </ul>
          </li>
          <li>Perubahan Pola Tidur
            <ul class="list-disc pl-6 mt-2">
              <li>Gangguan tidur</li>
              <li>Perubahan kualitas tidur</li>
              <li>Perubahan durasi tidur</li>
              <li>Perubahan ritme sirkadian</li>
            </ul>
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-[#34D399]">Strategi Manajemen Stres</h2>
        <p class="text-lg leading-relaxed">
          Beberapa strategi untuk mengelola stres dan TDEE:
        </p>
        <ul class="list-disc pl-6 space-y-3">
          <li>Nutrisi
            <ul class="list-disc pl-6 mt-2">
              <li>Makan teratur</li>
              <li>Porsi seimbang</li>
              <li>Variasi makanan</li>
              <li>Hidrasi cukup</li>
            </ul>
          </li>
          <li>Aktivitas Fisik
            <ul class="list-disc pl-6 mt-2">
              <li>Olahraga teratur</li>
              <li>Intensitas moderat</li>
              <li>Pemulihan cukup</li>
              <li>Konsistensi</li>
            </ul>
          </li>
          <li>Istirahat
            <ul class="list-disc pl-6 mt-2">
              <li>Tidur cukup</li>
              <li>Kualitas tidur</li>
              <li>Ritme sirkadian</li>
              <li>Relaksasi</li>
            </ul>
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-[#34D399]">Tips Praktis</h2>
        <p class="text-lg leading-relaxed">
          Tips untuk mengelola stres dan TDEE:
        </p>
        <ul class="list-disc pl-6 space-y-3">
          <li>Pola Makan
            <ul class="list-disc pl-6 mt-2">
              <li>Sarapan teratur</li>
              <li>Snack sehat</li>
              <li>Makan malam ringan</li>
              <li>Hindari junk food</li>
            </ul>
          </li>
          <li>Aktivitas
            <ul class="list-disc pl-6 mt-2">
              <li>Olahraga pagi</li>
              <li>Jalan santai</li>
              <li>Stretching</li>
              <li>Yoga</li>
            </ul>
          </li>
          <li>Lifestyle
            <ul class="list-disc pl-6 mt-2">
              <li>Meditasi</li>
              <li>Hobi</li>
              <li>Sosialisasi</li>
              <li>Manajemen waktu</li>
            </ul>
          </li>
        </ul>

        <p class="mt-6 text-lg leading-relaxed">
          Memahami dan mengelola TDEE dengan baik dapat membantu mengurangi dampak
          stres pada tubuh. Dengan menerapkan strategi manajemen stres yang tepat
          dan menjaga keseimbangan energi, kita dapat meningkatkan kualitas hidup
          dan kesehatan secara keseluruhan.
        </p>
      </div>
    `,
    image_path: "/images/articles/tdee47.jpg",
    category: "Health",
    author_id: 1,
    status: "Published"
  }
]; 