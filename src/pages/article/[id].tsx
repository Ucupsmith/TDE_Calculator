import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar/Navbar';
import Image from 'next/image';
import { getArticleById, Article } from '@/services/articleService';

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

// Back button component
const BackButton = () => {
    const router = useRouter();
    
    return (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/20 to-transparent backdrop-blur-[2px] z-50 py-4 px-4 transition-all duration-300">
            <button
                onClick={() => router.push('/article')}
                className="flex items-center space-x-2 bg-[#34D399]/90 text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#0B5F31] transition-all duration-300 hover:shadow-[#34D399]/20 hover:shadow-xl"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                        clipRule="evenodd" 
                    />
                </svg>
                <span>Back to Article Cards</span>
            </button>
        </div>
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
                setArticle(data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch article');
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
        return <NotFoundComponent />;
    }

    return (
        <div className="relative min-h-screen">
            <BackButton />
            <div className="pt-20">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-[#34D399] mb-6">{article.title}</h1>
                    
                    {article.image_path && (
                        <div className="relative w-full h-64 mb-8">
                            <Image
                                src={article.image_path}
                                alt={article.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    )}

                    <div className="flex items-center space-x-4 mb-8">
                        {article.author?.profile_image && (
                            <Image
                                src={article.author.profile_image}
                                alt={article.author.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        )}
                        <div>
                            <p className="font-medium text-gray-800">{article.author?.name || 'Unknown Author'}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(article.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>

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
