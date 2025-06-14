import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { getArticleById, Article, getImageUrl } from '@/services/articleService';

// Donut chart component
const DonutChart = () => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const data = [
    { label: 'BMR', value: 70, color: '#34D399' },
    { label: 'NEAT', value: 19, color: '#6EE7B7' },
    { label: 'EAT', value: 5, color: '#A7F3D0' },
    { label: 'TEF', value: 6, color: '#D1FAE5' }
  ];

  let startAngle = -90;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative w-full flex justify-center items-center py-8 bg-white rounded-t-xl">
      <svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="transform -rotate-90"
      >
        {data.map((item, i) => {
          const strokeDashoffset = circumference - (item.value / total) * circumference;
          const angle = (item.value / total) * 360;
          const endAngle = startAngle + angle;
          
          startAngle = endAngle;
          
          return (
            <g key={i}>
              <circle
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(${startAngle - angle / 2} ${radius} ${radius})`}
              />
              
              {/* Add text labels */}
              <text
                x={radius + Math.cos(((startAngle - angle / 2) * Math.PI) / 180) * (normalizedRadius + 20)}
                y={radius + Math.sin(((startAngle - angle / 2) * Math.PI) / 180) * (normalizedRadius + 20)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#4B5563"
                fontSize="10"
                transform={`rotate(${startAngle - angle / 2 + 90} ${radius + Math.cos(((startAngle - angle / 2) * Math.PI) / 180) * (normalizedRadius + 20)} ${radius + Math.sin(((startAngle - angle / 2) * Math.PI) / 180) * (normalizedRadius + 20)})`}
              >
                {item.label} {item.value}%
              </text>
            </g>
          );
        })}
        
        {/* Add center text */}
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#4B5563"
          fontSize="14"
          fontWeight="bold"
          className="transform rotate-90"
        >
          Components of total daily
        </text>
        <text
          x={radius}
          y={radius + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#4B5563"
          fontSize="14"
          fontWeight="bold"
          className="transform rotate-90"
        >
          energy expenditure (TDEE)
        </text>
      </svg>
    </div>
  );
};

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
      className="fixed top-4 left-4 z-50 bg-[#34D399] text-white px-4 py-2 rounded-lg hover:bg-[#2bbd8c] transition-colors flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
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
        <div className="min-h-screen bg-gradient-to-b from-teal-900 to-teal-950">
            <Head>
                <title>{article.title} | TDEE Calculator</title>
                <meta name="description" content={article.description || article.title} />
            </Head>
            
            <BackButton />
            
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-teal-500/20">
                    {/* Article Header with Background Image */}
                    {article.imagePath && (
                        <div className="relative h-64 w-full">
                            <Image
                                src={getImageUrl(article.imagePath)}
                                alt={article.title}
                                fill
                                className="object-cover opacity-20"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h1 className="text-3xl font-bold text-green-400 mb-2">
                                        {article.title}
                                    </h1>
                                    <div className="flex items-center text-green-300/80 text-sm">
                                        <span>•</span>
                                        <span className="ml-1">{article.author?.name || 'Unknown Author'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Article Content */}
                    <div className="p-6">
                        <div className="prose prose-invert max-w-none text-green-100 article-content">
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>
                        
                        <style jsx>{`
                            .article-content ul { margin-left: 1.5em; }
                            .article-content li { margin-bottom: 0.5em; }
                            .article-content h2 { 
                                margin-top: 1.5em; 
                                color: #34D399;
                                font-size: 1.5rem;
                                font-weight: 600;
                            }
                            .article-content h3 { 
                                margin-top: 1.25em; 
                                color: #6EE7B7;
                                font-size: 1.25rem;
                                font-weight: 500;
                            }
                            .article-content p {
                                margin-bottom: 1rem;
                                line-height: 1.7;
                            }
                            .article-content a { 
                                color: #34D399; 
                                text-decoration: none;
                                font-weight: 500;
                            }
                            .article-content a:hover { 
                                text-decoration: underline;
                                color: #6EE7B7;
                            }
                        `}</style>
                    </div>
                    
                    {/* Article Footer */}
                    <div className="border-t border-teal-500/20 px-6 py-4 flex justify-end items-center bg-black/30">
                        <div className="text-sm text-green-300/60">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
