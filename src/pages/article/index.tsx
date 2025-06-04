import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const ArticleCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [glowId, setGlowId] = useState<number | null>(null);

  const articleCardRef = useRef<HTMLDivElement>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMobile) setHasEnteredView(true);
      },
      { threshold: 0.3 }
    );

    const currentRef = articleCardRef.current;
    if (currentRef) observer.observe(currentRef);
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

  const handleTouchStart = (id: number) => {
    longPressTimeout.current = setTimeout(() => {
      setGlowId(id);
    }, 300);
  };

  const handleTouchEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
    setGlowId(null);
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
    { id: 13, title: "TDEE dan Nutrisi untuk Atlet", imageSrc: "/tdee13.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 14, title: "TDEE dan Penuaan", imageSrc: "/tdee14.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 15, title: "TDEE dan Kehamilan", imageSrc: "/tdee15.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 16, title: "TDEE dan Penyakit Kronis", imageSrc: "/tdee16.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 17, title: "TDEE dan Nutrisi untuk Vegetarian/Vegan", imageSrc: "/tdee17.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 18, title: "TDEE dan Nutrisi untuk Atlet", imageSrc: "/tdee18.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 19, title: "TDEE dan Nutrisi untuk Remaja", imageSrc: "/tdee19.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 20, title: "TDEE dan Nutrisi untuk Lansia", imageSrc: "/tdee20.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 21, title: "Perbedaan Detail antara TDEE, BMR, dan RMR", imageSrc: "/tdee21.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 22, title: "Menghitung TDEE untuk Berbagai Bentuk Tubuh", imageSrc: "/tdee22.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 23, title: "TDEE dan Kaitannya dengan Kesehatan Hormonal", imageSrc: "/tdee23.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 24, title: "Mengapa TDEE Penting untuk Perjalanan Kesehatan Anda", imageSrc: "/tdee24.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 25, title: "Memanfaatkan TDEE untuk Mencapai Tujuan Penurunan Berat", imageSrc: "/tdee25.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 26, title: "Kesalahan Umum dalam Perhitungan TDEE", imageSrc: "/tdee26.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 27, title: "Menyesuaikan TDEE Sesuai Perubahan Musim", imageSrc: "/tdee27.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 28, title: "Menggunakan TDEE untuk Program Weight Loss Efektif", imageSrc: "/tdee28.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 29, title: "TDEE dan Konsistensi: Kunci Sukses Jangka Panjang", imageSrc: "/tdee29.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 30, title: "Mengintegrasikan TDEE dalam Gaya Hidup Sehat", imageSrc: "/tdee30.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 31, title: "TDEE untuk Performa Optimal dalam Olahraga Endurance", imageSrc: "/tdee31.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 32, title: "Bagaimana TDEE Mempengaruhi Tingkat Energi Anda", imageSrc: "/tdee32.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 33, title: "TDEE: Relevansinya dengan Gizi Harian", imageSrc: "/tdee33.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 34, title: "Pengaruh TDEE pada Kebiasaan Makan", imageSrc: "/tdee34.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 35, title: "Hubungan Antara TDEE dan Makronutrien", imageSrc: "/tdee35.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 36, title: "Menghitung TDEE untuk Latihan Intensitas Tinggi", imageSrc: "/tdee36.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 37, title: "Peran TDEE dalam Menjaga Kesehatan Optimal", imageSrc: "/tdee37.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 38, title: "TDEE dan Perannya dalam Kesehatan Metabolik", imageSrc: "/tdee38.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 39, title: "Mengapa TDEE Anda Mungkin Lebih Tinggi dari Perkiraan", imageSrc: "/tdee39.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 40, title: "Cara Mengintegrasikan TDEE dalam Gaya Hidup Anda", imageSrc: "/tdee40.jpeg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 41, title: "TDEE untuk Penurunan Berat Badan Cepat", imageSrc: "/tdee41.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 42, title: "TDEE dan Pengaruhnya pada Mood", imageSrc: "/tdee42.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 43, title: "Menghitung TDEE untuk Anak-anak dan Remaja", imageSrc: "/tdee43.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 44, title: "Peran TDEE dalam Pemulihan Pasca-Latihan", imageSrc: "/tdee44.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 45, title: "TDEE: Panduan untuk Vegetarian dan Vegan", imageSrc: "/tdee45.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 46, title: "Mengoptimalkan TDEE untuk Peningkatan Performa", imageSrc: "/tdee46.png", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 47, title: "TDEE dan Kesehatan Mental", imageSrc: "/tdee47.webp", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 48, title: "TDEE dan Kualitas Tidur", imageSrc: "/tdee48.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 49, title: "TDEE dan Manajemen Stres", imageSrc: "/tdee49.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
    { id: 50, title: "TDEE dan Kesehatan Sistem Imun", imageSrc: "/tdee50.jpg", authorName: "Arya Riyanto", authorImage: "/nilon.jpg" },
  ];

  const filteredArticles = articles.filter(article => {
    const searchContent = article.title + article.authorName;
    return searchContent.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="article-cards"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="flex flex-col w-full overflow-x-hidden"
      >
        <motion.div 
          className="text-[#34D399] text-2xl sm:text-3xl lg:pt-10 pt-8 font-bold flex justify-center items-center mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Article Card
        </motion.div>
        <motion.p 
          className="text-[#666666] font-extralight text-xs sm:text-sm lg:pt-3 pt-3 flex text-center justify-center items-center mx-auto px-4 max-w-md sm:max-w-xl md:max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Not sure what TDEE, BMI, or BMR mean? These articles will help you understand and calculate them with ease.
        </motion.p>

        <motion.div 
          className="flex justify-center mt-6 sm:mt-8 items-center space-x-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => !isMobile && !showSearch && setIsHovering(true)}
            onMouseLeave={() => !isMobile && setIsHovering(false)}
          >
            <Image
              src="/tdee.svg"
              alt="Tdee Logo"
              width={isMobile ? 60 : 70}
              height={isMobile ? 50 : 60}
              className={`cursor-pointer transition-transform duration-500 ${isRotating ? "rotate-[360deg]" : ""} hover:scale-110 will-change-transform`}
              onClick={handleLogoClick}
            />
            {!showSearch && (isHovering || (isMobile && hasEnteredView)) && (
              <motion.div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="transition-all duration-500 ease-in-out text-[#34D399] text-center text-xs pb-10 pr-20 py-1 lg:pb-20 rounded-lg whitespace-nowrap">
                  Press TDEE logo button to search articles
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            className={`transition-all duration-500 ease-in-out ${
              showSearch ? "opacity-100 scale-100 max-w-[280px] sm:max-w-[320px]" : "opacity-0 scale-0 max-w-0"
            } overflow-hidden`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showSearch ? 1 : 0, scale: showSearch ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search articles..."
              className="px-4 py-2 w-full bg-[#34D399] font-bold text-[#0B5F31] rounded-3xl border border-[#0B5F31] focus:outline-none focus:ring-2 sm:focus:ring-3 focus:ring-[#0B5F31] placeholder:text-[#0B5F31] placeholder:font-medium text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {filteredArticles.length > 0 ? (
          <motion.div 
            ref={articleCardRef} 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 pt-10 pb-20"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredArticles.map((article, index) => {
              const isGlowing = glowId === article.id;
              return (
                <motion.div
                  key={article.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onTouchStart={() => handleTouchStart(article.id)}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                  onClick={() => router.push(`/article/${article.id}`)}
                  className={`rounded-lg shadow-lg overflow-hidden cursor-pointer border transition duration-300 ${
                    isGlowing
                      ? "ring-4 ring-offset-2 ring-[#34D399] border-[#34D399]"
                      : "hover:ring-4 hover:ring-offset-2 hover:ring-[#34D399] hover:border-[#34D399] border-gray-200"
                  }`}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={article.imageSrc}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center"
                      priority={index < 4}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#34D399] font-semibold text-sm sm:text-base mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Image
                        src={article.authorImage}
                        alt={article.authorName}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <p className="text-xs text-[#666666] font-medium">{article.authorName}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col justify-center items-center p-6 text-[#34D399] space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-[#34D399] opacity-75" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-lg font-medium">Tidak ada artikel ditemukan</p>
            <p className="text-sm text-gray-500">Coba kata kunci pencarian yang berbeda</p>
          </motion.div>
        )}

        <motion.div
          className="flex flex-col items-center justify-center py-8 text-[#34D399] space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-16 h-1 bg-[#34D399] rounded-full"></div>
          <p className="text-sm font-medium">You've reached the end</p>
          <p className="text-xs opacity-75 pb-20">Thanks for exploring our articles!</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArticleCard;
