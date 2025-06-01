import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

const ArticleCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  const articleCardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cek ukuran layar dan deteksi scroll ke ArticleCard
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMobile) {
          setHasEnteredView(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = articleCardRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isMobile]);

  const handleLogoClick = () => {
    setShowSearch(!showSearch);
    setIsRotating(true);
    setIsHovering(false);
    setTimeout(() => setIsRotating(false), 1000);
  };

  const articles = [
    { id: 1, title: "Memahami TDEE: Kunci Mengelola Kebutuhan Kalori Harian Anda", imageSrc: "/tdee1.png", authorName: "Darrell Wijaya", authorImage: "/joko.jpg" },
    { id: 2, title: "BMI dan BMR: Dasar Perhitungan TDEE", imageSrc: "/tdee2.jpg", authorName: "Darrell Wijaya", authorImage: "/joko.jpg" },
    { id: 3, title: "Menghitung TDEE: Panduan Lengkap", imageSrc: "/tdee3.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 4, title: "Mengenal Faktor Aktivitas dalam Perhitungan TDEE", imageSrc: "/tdee4.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 5, title: "Strategi Mengatur Pola Makan Berdasarkan TDEE", imageSrc: "/tdee5.jpeg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 6, title: "Pentingnya TDEE untuk Program Penurunan Berat Badan", imageSrc: "/tdee6.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 7, title: "TDEE untuk Meningkatkan Massa Otot", imageSrc: "/tdee7.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 8, title: "Menjaga Berat Badan Ideal dengan Memahami TDEE", imageSrc: "/tdee8.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 9, title: "Peran TDEE dalam Perencanaan Gizi Harian", imageSrc: "/tdee9.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 10, title: "TDEE dan Kaitannya dengan Metabolisme Tubuh", imageSrc: "/tdee10.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 11, title: "Menghitung TDEE untuk Berbagai Jenis Olahraga", imageSrc: "/tdee11.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 12, title: "TDEE dan Pemilihan Jenis Makanan yang Tepat", imageSrc: "/tdee12.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 13, title: "Pengaruh Usia terhadap Kebutuhan TDEE", imageSrc: "/tdee1.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 14, title: "Memahami TDEE untuk Ibu Hamil", imageSrc: "/tdee2.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 15, title: "Menyesuaikan TDEE untuk Kenaikan Berat Badan", imageSrc: "/tdee3.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 16, title: "TDEE pada Lansia: Apa yang Berubah?", imageSrc: "/tdee4.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 17, title: "Dampak Olahraga Intensitas Tinggi pada TDEE", imageSrc: "/tdee5.jpeg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 18, title: "Hubungan Antara TDEE dan Kualitas Tidur", imageSrc: "/tdee6.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 19, title: "Bagaimana Stres Mempengaruhi Perhitungan TDEE", imageSrc: "/tdee7.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 20, title: "Menggunakan TDEE untuk Merancang Meal Plan", imageSrc: "/tdee8.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 21, title: "Perbedaan Detail antara TDEE, BMR, dan RMR", imageSrc: "/tdee9.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 22, title: "Menghitung TDEE untuk Berbagai Bentuk Tubuh", imageSrc: "/tdee10.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 23, title: "TDEE dan Kaitannya dengan Kesehatan Hormonal", imageSrc: "/tdee11.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 24, title: "Mengapa TDEE Penting untuk Perjalanan Kesehatan Anda", imageSrc: "/tdee12.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 25, title: "Memanfaatkan TDEE untuk Mencapai Tujuan Penurunan Berat", imageSrc: "/tdee1.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 26, title: "Kesalahan Umum dalam Perhitungan TDEE", imageSrc: "/tdee2.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 27, title: "Menyesuaikan TDEE Sesuai Perubahan Musim", imageSrc: "/tdee3.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 28, title: "Menggunakan TDEE untuk Program Weight Loss Efektif", imageSrc: "/tdee4.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 29, title: "TDEE dan Konsistensi: Kunci Sukses Jangka Panjang", imageSrc: "/tdee5.jpeg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 30, title: "Mengintegrasikan TDEE dalam Gaya Hidup Sehat", imageSrc: "/tdee6.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 31, title: "TDEE untuk Performa Optimal dalam Olahraga Endurance", imageSrc: "/tdee7.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 32, title: "Bagaimana TDEE Mempengaruhi Tingkat Energi Anda", imageSrc: "/tdee8.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 33, title: "TDEE: Relevansinya dengan Gizi Harian", imageSrc: "/tdee9.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 34, title: "Pengaruh TDEE pada Kebiasaan Makan", imageSrc: "/tdee10.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 35, title: "Hubungan Antara TDEE dan Makronutrien", imageSrc: "/tdee11.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 36, title: "Menghitung TDEE untuk Latihan Intensitas Tinggi", imageSrc: "/tdee12.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 37, title: "Peran TDEE dalam Menjaga Kesehatan Optimal", imageSrc: "/tdee1.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 38, title: "TDEE dan Perannya dalam Kesehatan Metabolik", imageSrc: "/tdee2.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 39, title: "Mengapa TDEE Anda Mungkin Lebih Tinggi dari Perkiraan", imageSrc: "/tdee3.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 40, title: "Cara Mengintegrasikan TDEE dalam Gaya Hidup Anda", imageSrc: "/tdee4.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 41, title: "TDEE untuk Penurunan Berat Badan Cepat", imageSrc: "/tdee5.jpeg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 42, title: "TDEE dan Pengaruhnya pada Mood", imageSrc: "/tdee6.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 43, title: "Menghitung TDEE untuk Anak-anak dan Remaja", imageSrc: "/tdee7.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 44, title: "Peran TDEE dalam Pemulihan Pasca-Latihan", imageSrc: "/tdee8.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 45, title: "TDEE: Panduan untuk Vegetarian dan Vegan", imageSrc: "/tdee9.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 46, title: "Mengoptimalkan TDEE untuk Peningkatan Performa", imageSrc: "/tdee10.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 47, title: "Bagaimana TDEE Berubah Selama Siklus Menstruasi", imageSrc: "/tdee11.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 48, title: "TDEE dan Pentingnya Hidrasi", imageSrc: "/tdee12.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 49, title: "Memahami TDEE Saat Puasa Intermiten", imageSrc: "/tdee1.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 50, title: "TDEE: Merencanakan Cheat Day Tanup Merusak Progress", imageSrc: "/tdee2.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
  ];

 const filteredArticles = articles.filter(article => {
    const searchContent = article.title + article.authorName;
    return searchContent.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
    <div className="flex flex-col">
      <div className="text-[#34D399] text-2xl sm:text-3xl lg:pt-10 pt-8 font-bold flex justify-center items-center mx-auto">
        Article Card
      </div>
      <p className="text-[#666666] font-extralight text-xs sm:text-sm lg:pt-3 pt-3 flex text-center justify-center items-center mx-auto px-4 max-w-md sm:max-w-xl md:max-w-2xl">
        Not sure what TDEE, BMI, or BMR mean? These articles will help you understand and
        calculate them with ease.
      </p>

      {/* Search Bar & Logo Section */}
      <div className="flex justify-center mt-6 sm:mt-8 items-center space-x-4 relative">
        <div
          className="relative"
          onMouseEnter={() => !isMobile && !showSearch && setIsHovering(true)}
          onMouseLeave={() => !isMobile && setIsHovering(false)}
        >
          <Image
            src="/tdee.svg"
            alt="Tdee Logo"
            width={isMobile ? 60 : 70}
            height={isMobile ? 50 : 60}
            className={`cursor-pointer transition-transform duration-500 ${
              isRotating ? "rotate-[360deg]" : ""
            } hover:scale-110 will-change-transform`}
            onClick={handleLogoClick}
          />

          {/* Tooltip */}
          {!showSearch && (isHovering || (isMobile && hasEnteredView)) && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2">
              <div className="transition-all duration-500 ease-in-out text-[#34D399] text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                Press TDEE logo button to search articles
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showSearch ? "opacity-100 scale-100 max-w-[280px] sm:max-w-[320px]" : "opacity-0 scale-0 max-w-0"
          } overflow-hidden`}
        >
          <input
            type="text"
            placeholder="Search articles..."
            className="px-4 py-2 w-full bg-[#34D399] font-bold text-[#0B5F31] rounded-3xl border border-[#0B5F31] focus:outline-none focus:ring-2 sm:focus:ring-3 focus:ring-[#0B5F31] placeholder:text-[#0B5F31] placeholder:font-medium text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Articles Grid - Perbaikan untuk mobile view */}
      <div
        ref={articleCardRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-5 md:gap-6 pt-8 md:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 max-w-3xl mx-auto sm:max-w-none">
        
        {filteredArticles.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 mt-8">
            <Image
              src="/nofound.png"
              alt="No articles found"
              width={120}
              height={120}
              className="mx-auto mb-4"/>
            No articles found matching your search.
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="relative">
              <Link href={`/article/${article.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-white group relative overflow-hidden rounded-lg shadow-lg"
                >
                  {/* Container gambar dengan lebar maksimum di mobile */}
                  <div className="aspect-[4/3] w-full relative max-w-[320px] mx-auto sm:max-w-none">
                    <Image
                      src={article.imageSrc}
                      alt="article image"
                      fill
                      className="object-cover w-full"
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                    />
                  </div>

                  {/* Hover Title Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <span className="text-white font-semibold text-xs sm:text-sm leading-tight">
                      {article.title}
                    </span>
                  </div>
                </motion.div>
              </Link>

              {/* Author Section */}
              <div className="flex items-center mt-2 sm:mt-3 space-x-2 px-2 truncate max-w-[320px] mx-auto sm:max-w-none">
                <Image
                  src={article.authorImage}
                  alt="author image"
                  width={isMobile ? 24 : 24}
                  height={isMobile ? 24 : 24}
                  className="rounded-full"
                />
                <span className="text-xs sm:text-sm text-gray-600 truncate">
                  {article.authorName}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
        <span className="flex text-center justify-center items-center pb-32 sm:pb-60 text-[#666666] text-xs sm:text-sm">
          You&apos;ve reached the end of the list
        </span>
      </div>
    </>
  );
};

const ArticlePage = () => {
  return (
    <div>
      <ArticleCard />
      <Navbar />
    </div>
  );
};

export default ArticlePage;