import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/Navbar';
import Image from 'next/image';

// Define a loading component
const LoadingComponent = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#34D399]"></div>
    </div>
);

// Define a not found component
const NotFoundComponent = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-[#34D399] mb-4">Article Not Found</h1>
        <p className="text-gray-600">The article you&apos;re looking for doesn&apos;t exist.</p>
    </div>
);
NotFoundComponent.displayName = 'NotFoundComponent'; // Add display name

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
    const [ArticleContent, setArticleContent] = useState<React.ComponentType | null>(null);
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
        import(`./article${articleId}`)
            .then(module => {
                setArticleContent(() => module.default);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to load article component:", error);
                setArticleContent(() => NotFoundComponent);
                setIsLoading(false);
            });
    }, [id]); // Rerun effect if id changes

    return (
        <div className="relative min-h-screen">
            <BackButton />
            <div className="pt-20">
                {isLoading ? <LoadingComponent /> : ArticleContent && <ArticleContent />}
            </div>
        </div>
    );
};

export default ArticlePage; 