import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  getArticles,
  Article,
  createArticle,
  updateArticle,
  deleteArticle,
  getImageUrl
} from '@/services/articleService';
import Link from 'next/link';
import PaginationControls from '@/components/pagination-controls/PaginationControls';

// Tambahkan fungsi untuk menghapus tag HTML dari string
function stripHtml(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
}

const ArticleCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [_, setTotal] = useState(0);
  const limit = 10;

  const LastIndexArticlesItems = page * limit;
  const FirstIndexArticlesItems = LastIndexArticlesItems - limit;

  const articlesPagination = Array.isArray(articles)
    ? articles.slice(FirstIndexArticlesItems, LastIndexArticlesItems)
    : [];

  const articleCardRef = useRef<HTMLDivElement>(null);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getArticles(page, limit);
      setArticles(Array.isArray(res.data) ? res.data : []);
      setTotal(res.total || 0);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const filteredArticles = (articlesPagination || []).filter((article) => {
    const searchContent = article.title + (article.author?.name || '');
    return searchContent.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const // cubic-bezier equivalent of 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1] as const // cubic-bezier equivalent of 'easeIn'
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <motion.img
          src='/tdee.svg'
          alt='Loading...'
          className='h-32 w-32'
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen text-[#34D399]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16 text-[#34D399] opacity-75'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
        <p className='text-lg font-medium mt-4'>{error}</p>
        <p className='text-sm text-gray-500 mb-4'>
          Please check if the backend server is running
        </p>
        <button
          onClick={fetchArticles}
          className='px-4 py-2 bg-[#34D399] text-white rounded-lg hover:bg-[#2bbd8c] transition-colors'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key='article-cards'
        initial='initial'
        animate='animate'
        exit='exit'
        variants={pageVariants}
        className='flex flex-col w-full min-h-screen bg-gradient-to-b from-teal-900 to-teal-950 overflow-x-hidden'
      >
        <div className='relative z-10'>
          <motion.div
            className='text-green-300 text-4xl sm:text-5xl lg:pt-20 pt-16 font-bold flex justify-center items-center mx-auto text-center px-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-400 to-teal-400'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className='relative text-[#34D399]'>
              Artikel
              <motion.span 
                className='absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </span>
          </motion.div>
          <motion.p
            className='text-green-200/80 text-base sm:text-lg lg:pt-4 pt-3 flex text-center justify-center items-center mx-auto px-4 max-w-2xl leading-relaxed'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            Temukan artikel informatif seputar TDEE, BMI, dan BMR untuk membantu Anda memahami kesehatan dan kebugaran.
          </motion.p>
        </div>
        
        {/* Animated background elements */}
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute rounded-full bg-green-500/10'
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                opacity: 0.1
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                transition: {
                  duration: 20 + Math.random() * 40,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}
            />
          ))}
        </div>

        <motion.div
          className='flex justify-center w-full mt-10 px-4 relative z-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className='relative w-full max-w-2xl group'>
            <motion.div 
              className='absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500'
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <input
              type='text'
              placeholder='Cari artikel...'
              className='relative w-full px-6 py-4 bg-black/40 backdrop-blur-lg border border-green-500/30 rounded-xl text-green-100 placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300 text-base shadow-lg shadow-black/20'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.div 
              className='absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-green-500/10 backdrop-blur-sm'
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                className='h-5 w-5 text-green-300' 
                xmlns='http://www.w3.org/2000/svg' 
                fill='none' 
                viewBox='0 0 24 24' 
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </motion.div>
            <motion.div 
              className='absolute -bottom-1 left-1/2 w-3/4 h-1 bg-gradient-to-r from-teal-400/0 via-teal-400/70 to-teal-400/0 rounded-full'
              initial={{ scaleX: 0.5, opacity: 0 }}
              animate={{ 
                scaleX: 1, 
                opacity: 0.7,
                transition: { 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  duration: 2,
                  ease: 'easeInOut'
                } 
              }}
            />
          </div>
        </motion.div>

        {filteredArticles?.length > 0 && filteredArticles.length !== null ? (
          <motion.div
            ref={articleCardRef}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 pt-12 pb-20 w-full max-w-7xl mx-auto'
            initial='hidden'
            animate='visible'
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredArticles?.map((article, index) => {
              const excerpt = stripHtml(article.content).substring(0, 120) + '...';
              return (
                <motion.div
                  key={article.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className='group bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-500/20 hover:border-green-400/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/10 w-full h-full flex flex-col'
                >
                  <Link href={`/article/${article.id}`} className='block h-full flex flex-col'>
                    <div className='relative h-48'>
                      {article.imagePath ? (
                        <Image
                          src={getImageUrl(article.imagePath)}
                          alt={article.title}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-500'
                          crossOrigin='anonymous'
                        />
                      ) : (
                        <div className='w-full h-full bg-teal-900/50 flex items-center justify-center'>
                          <span className='text-teal-400/50'>Tidak ada gambar</span>
                        </div>
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                        <span className='text-white text-sm font-medium bg-teal-600/80 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-teal-500/90 transition-colors'>
                          Baca Selengkapnya
                        </span>
                      </div>
                    </div>
                    <div className='p-6'>
                      {/* Title with gradient text */}
                      <h2 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-100 to-teal-200 mb-3 line-clamp-2 group-hover/card:translate-x-1 transition-transform duration-300'>
                        {article.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className='text-gray-200 text-sm mb-5 line-clamp-3 leading-relaxed'>
                        {excerpt}
                      </p>
                      
                      {/* Author and date */}
                      <div className='flex items-center justify-between pt-4 mt-auto border-t border-green-500/20'>
                        <div className='flex items-center space-x-3'>
                          {article.author?.profileImage ? (
                            <motion.div 
                              className='relative w-9 h-9 rounded-full overflow-hidden border-2 border-green-500/30 group-hover/card:border-green-400/50 transition-all duration-300'
                              whileHover={{ scale: 1.1 }}
                            >
                              <Image
                                src={getImageUrl(article.author.profileImage)}
                                alt={article.author.name}
                                fill
                                className='object-cover'
                                crossOrigin='anonymous'
                              />
                            </motion.div>
                          ) : (
                            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-teal-600/80 to-green-700/80 flex items-center justify-center text-white text-lg font-medium border border-teal-400/50 group-hover/card:border-teal-300/70 transition-colors'>
                              {article.author?.name?.charAt(0) || '?'}
                            </div>
                          )}
                          <div className='flex flex-col'>
                            <span className='text-sm font-medium text-white'>
                              {article.author?.name || 'Penulis'}
                            </span>
                            <span className='text-xs text-gray-300'>
                              {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            className='flex flex-col justify-center items-center p-12 text-green-400 space-y-6 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='relative'>
              <div className='w-24 h-24 rounded-full bg-green-900/30 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12 text-green-400/70'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='absolute -inset-2 border-2 border-green-500/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-green-300 mb-2'>Artikel Tidak Ditemukan</h3>
              <p className='text-green-400/70 max-w-md'>
                Maaf, kami tidak dapat menemukan artikel yang sesuai dengan pencarian Anda.
                Coba gunakan kata kunci yang berbeda atau lihat artikel lainnya.
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className='px-6 py-2 bg-green-700/50 hover:bg-green-600/50 text-green-100 rounded-lg border border-green-500/30 transition-colors duration-200 text-sm font-medium mt-2'
            >
              Tampilkan Semua Artikel
            </button>
          </motion.div>
        )}

        {/* Pagination Controls */}
        <div className='pb-12 px-4'>
          <PaginationControls
            currentPage={page}
            itemsPerPage={limit}
            onPageChanges={(newPage) => setPage(newPage)}
            totalItems={articles.length}
          />
        </div>

      </motion.div>
    </AnimatePresence>
  );
};

export default ArticleCard;
