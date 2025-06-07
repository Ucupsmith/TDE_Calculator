import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { getArticles, Article, createArticle, updateArticle, deleteArticle, getImageUrl } from "@/services/articleService";

const ArticleCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [glowId, setGlowId] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const articleCardRef = useRef<HTMLDivElement>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getArticles();
      setArticles(data);
    } catch (err: any) {
      console.error('Error fetching articles:', err);
      setError(
        err.response 
          ? `Error ${err.response.status}: ${err.response.data?.message || 'Failed to fetch articles'}`
          : 'Failed to connect to the server. Please check if the backend is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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

  const filteredArticles = articles.filter(article => {
    const searchContent = article.title + (article.author?.name || '');
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

  const handleCreateArticle = async (formData: FormData) => {
    try {
      const article = await createArticle(formData);
      // Handle success (e.g., show notification, redirect)
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#34D399]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-[#34D399]">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        <p className="text-lg font-medium mt-4">{error}</p>
        <p className="text-sm text-gray-500 mb-4">Please check if the backend server is running</p>
        <button
          onClick={fetchArticles}
          className="px-4 py-2 bg-[#34D399] text-white rounded-lg hover:bg-[#2bbd8c] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

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
              const isGlowing = glowId === article.article_id;
              return (
                <motion.div
                  key={article.article_id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onTouchStart={() => handleTouchStart(article.article_id)}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                  onClick={() => router.push(`/article/${article.article_id}`)}
                  className={`rounded-lg shadow-lg overflow-hidden cursor-pointer border transition duration-300 ${
                    isGlowing
                      ? "ring-4 ring-offset-2 ring-[#34D399] border-[#34D399]"
                      : "hover:ring-4 hover:ring-offset-2 hover:ring-[#34D399] hover:border-[#34D399] border-gray-200"
                  }`}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={getImageUrl(article.image_path)}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center"
                      priority={index < 4}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/default-article.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#34D399] font-semibold text-sm sm:text-base mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Image
                        src={article.author?.profile_image || '/default-avatar.jpg'}
                        alt={article.author?.name || 'Author'}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <p className="text-xs text-[#666666] font-medium">{article.author?.name || 'Unknown Author'}</p>
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
