import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/Navbar';

// Define a loading component
const LoadingComponent = () => (
  <div className='flex justify-center items-center min-h-screen'>
    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#34D399]'></div>
  </div>
);

// Define a not found component
const NotFoundComponent = () => (
  <div className='flex flex-col items-center justify-center min-h-screen'>
    <h1 className='text-2xl font-bold text-[#34D399] mb-4'>
      Article Not Found
    </h1>
    <p className='text-gray-600'>
      The article you&apos;re looking for doesn&apos;t exist.
    </p>
  </div>
);
NotFoundComponent.displayName = 'NotFoundComponent'; // Add display name

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ArticleContent, setArticleContent] =
    useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Wait for id to be available

    const articleId = parseInt(id as string);

    if (isNaN(articleId) || articleId < 1 || articleId > 50) {
      setArticleContent(() => NotFoundComponent);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    import(`@/components/articlePages/article${articleId}`)
      .then((module) => {
        setArticleContent(() => module.default);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load article component:', error);
        setArticleContent(() => NotFoundComponent);
        setIsLoading(false);
      });
  }, [id]); // Rerun effect if id changes

  return (
    <div>
      {isLoading ? <LoadingComponent /> : ArticleContent && <ArticleContent />}
      <Navbar />
    </div>
  );
};

export default ArticlePage;
