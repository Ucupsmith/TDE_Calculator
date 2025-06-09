import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar/Navbar';
import Image from 'next/image';
import { getArticleById, Article, getImageUrl } from '@/services/articleService';

// Define a loading component
const LoadingComponent = () => (
  <div className='flex justify-center items-center min-h-screen'>
    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#34D399]'></div>
  </div>
);

// Define a back button component
const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 bg-[#34D399] text-white px-4 py-2 rounded-lg hover:bg-[#2bbd8c] transition-colors"
    >
      Back
    </button>
  );
};

const ArticlePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;

            try {
                const articleId = parseInt(id as string);
                if (isNaN(articleId)) {
                    setError('Invalid article ID');
                    setIsLoading(false);
                    return;
                }

                const data = await getArticleById(articleId);
                if (!data) {
                    setError('Article not found');
                    setIsLoading(false);
                    return;
                }
                setArticle(data);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch article');
                setIsLoading(false);
                console.error('Error fetching article:', err);
            }
        };

        fetchArticle();
    }, [id]);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error || !article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-[#34D399] mb-4">
                    {error || 'Article Not Found'}
                </h1>
                <p className="text-gray-600 mb-4">
                    {error === 'Network error. Please check your internet connection.' 
                        ? 'Please check your internet connection and try again.'
                        : error === 'Request timeout. Please try again.'
                        ? 'The request took too long. Please try again.'
                        : 'The article you\'re looking for doesn\'t exist or cannot be accessed.'}
                </p>
                <button
                    onClick={() => router.push('/article')}
                    className="px-4 py-2 bg-[#34D399] text-white rounded-lg hover:bg-[#2bbd8c] transition-colors"
                >
                    Back to Articles
                </button>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            <BackButton />
            <div className="pt-20">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-[#34D399] mb-6">{article.title}</h1>
                    
                    {article.imagePath && (
                        <div className="relative w-full h-64 mb-8">
                            <Image
                                src={getImageUrl(article.imagePath)}
                                alt={article.title}
                                fill
                                className="object-cover rounded-lg"
                                crossOrigin="anonymous"
                            />
                        </div>
                    )}

                    <div className="flex items-center space-x-4 mb-8">
                        {article.author?.profileImage && (
                            <Image
                                src={getImageUrl(article.author.profileImage)}
                                alt={article.author.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                                crossOrigin="anonymous"
                            />
                        )}
                        <div>
                            <p className="font-medium text-gray-800">{article.author?.name || 'Unknown Author'}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(article.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none text-white article-content">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                    <style jsx>{`
                      .article-content ul { margin-left: 1.5em; }
                      .article-content li { margin-bottom: 0.5em; }
                      .article-content h2 { margin-top: 1.5em; color: #34D399; }
                      .article-content h3 { margin-top: 1em; color: #34D399; }
                    `}</style>

                    <div className="mt-8 flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span>{article.views} views</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>{article.likes} likes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
