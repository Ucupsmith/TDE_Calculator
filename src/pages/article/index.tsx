import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
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
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
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
        className='flex flex-col w-full overflow-x-hidden'
      >
        <motion.div
          className='text-[#34D399] text-2xl sm:text-3xl lg:pt-10 pt-8 font-bold flex justify-center items-center mx-auto'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Article Card
        </motion.div>
        <motion.p
          className='text-[#666666] font-extralight text-xs sm:text-sm lg:pt-3 pt-3 flex text-center justify-center items-center mx-auto px-4 max-w-md sm:max-w-xl md:max-w-2xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Not sure what TDEE, BMI, or BMR mean? These articles will help you
          understand and calculate them with ease.
        </motion.p>

        <motion.div
          className='flex justify-center w-full mt-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type='text'
            placeholder='Search articles...'
            className='px-4 py-2 w-full max-w-md bg-[#34D399] font-bold text-[#0B5F31] rounded-3xl border border-[#0B5F31] focus:outline-none focus:ring-2 sm:focus:ring-3 focus:ring-[#0B5F31] placeholder:text-[#0B5F31] placeholder:font-medium text-sm sm:text-base'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {filteredArticles?.length > 0 && filteredArticles.length !== null ? (
          <motion.div
            ref={articleCardRef}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 pt-10 pb-20'
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
              return (
                <motion.div
                  key={article.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  className='bg-white rounded-lg shadow-lg overflow-hidden'
                >
                  <Link href={`/article/${article.id}`}>
                    <div className='relative h-48'>
                      {article.imagePath ? (
                        <Image
                          src={getImageUrl(article.imagePath)}
                          alt={article.title}
                          fill
                          className='object-cover'
                          crossOrigin='anonymous'
                        />
                      ) : (
                        <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                          <span className='text-gray-400'>No image</span>
                        </div>
                      )}
                    </div>
                    <div className='p-4'>
                      <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        {article.title}
                      </h2>
                      <p className='text-gray-600 line-clamp-2'>
                        {stripHtml(article.content).slice(0, 120)}...
                      </p>
                      <div className='mt-4 flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                          {article.author?.profileImage && (
                            <Image
                              src={getImageUrl(article.author.profileImage)}
                              alt={article.author.name}
                              width={24}
                              height={24}
                              className='rounded-full'
                              crossOrigin='anonymous'
                            />
                          )}
                          <span className='text-sm text-gray-500'>
                            {article.author?.name || 'Unknown Author'}
                          </span>
                        </div>
                        <div className='flex items-center space-x-4 text-sm text-gray-500'>
                          <div className='flex items-center space-x-1'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                              <path
                                fillRule='evenodd'
                                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span>{article.views}</span>
                          </div>
                          <div className='flex items-center space-x-1'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span>{article.likes}</span>
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
            className='flex flex-col justify-center items-center p-6 text-[#34D399] space-y-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p className='text-lg font-medium'>Tidak ada artikel ditemukan</p>
            <p className='text-sm text-gray-500'>
              Coba kata kunci pencarian yang berbeda
            </p>
          </motion.div>
        )}

        {/* Pagination Controls */}
        <PaginationControls
          currentPage={page}
          itemsPerPage={limit}
          onPageChanges={setPage}
          totalItems={filteredArticles.length}
        />

        <motion.div
          className='flex flex-col items-center justify-center py-8 text-[#34D399] space-y-2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='w-16 h-1 bg-[#34D399] rounded-full'></div>
          <p className='text-sm font-medium'>You&apos;ve reached the end</p>
          <p className='text-xs opacity-75 pb-20'>
            Thanks for exploring our articles!
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArticleCard;
