import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin if not exists
  const admin = await prisma.admin.upsert({
    where: { adminId: 1 },
    update: {},
    create: {
      adminId: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      password: 'hashed_password_here', // Make sure to hash this in production
      profile_image: '/images/profiles/sarah-johnson.jpg'
    },
  });

  // Create articles
  const articles = [
    {
      title: 'Panduan Lengkap Menghitung TDEE untuk Pemula',
      content: `<h2>Apa itu TDEE?</h2>
        <p>TDEE (Total Daily Energy Expenditure) adalah total kalori yang dibakar tubuh Anda dalam sehari...</p>
        <h2>Cara Menghitung TDEE</h2>
        <p>Untuk menghitung TDEE, Anda perlu mengetahui beberapa faktor penting:</p>
        <ul>
          <li>Basal Metabolic Rate (BMR)</li>
          <li>Level Aktivitas Fisik</li>
          <li>Termogenesis Makanan</li>
        </ul>`,
      image_path: '/images/articleImages/tdee-guide.jpg',
      category: 'Nutrition',
      author_id: admin.adminId,
      status: 'Published',
      views: 1250,
      likes: 89
    },
    {
      title: 'Tips Menjaga Berat Badan Ideal dengan TDEE',
      content: `<h2>Memahami Keseimbangan Kalori</h2>
        <p>Menjaga berat badan ideal membutuhkan pemahaman yang baik tentang keseimbangan kalori...</p>
        <h2>Tips Praktis</h2>
        <ul>
          <li>Hitung TDEE Anda secara berkala</li>
          <li>Pantau asupan kalori harian</li>
          <li>Olahraga teratur</li>
        </ul>`,
      image_path: '/images/articleImages/weight-maintenance.jpg',
      category: 'Weight Management',
      author_id: admin.adminId,
      status: 'Published',
      views: 980,
      likes: 67
    },
    {
      title: 'Makanan Sehat untuk Mencapai Target Kalori Harian',
      content: `<h2>Pilihan Makanan Sehat</h2>
        <p>Berikut adalah daftar makanan sehat yang bisa membantu Anda mencapai target kalori harian...</p>
        <h2>Tips Memilih Makanan</h2>
        <ul>
          <li>Prioritaskan protein</li>
          <li>Pilih karbohidrat kompleks</li>
          <li>Konsumsi lemak sehat</li>
        </ul>`,
      image_path: '/images/articleImages/healthy-foods.jpg',
      category: 'Nutrition',
      author_id: admin.adminId,
      status: 'Published',
      views: 1560,
      likes: 112
    }
  ];

  // Create articles using createMany instead of upsert
  await prisma.article.createMany({
    data: articles,
    skipDuplicates: true, // Skip if article with same title exists
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 