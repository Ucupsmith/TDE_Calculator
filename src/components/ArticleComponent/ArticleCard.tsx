import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { id as indonesianLocale } from 'date-fns/locale';

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  authorName?: string;
  authorImage?: string;
  date?: string | Date;
  readTime?: string;
  tags?: string[];
  isBookmarked?: boolean;
  onBookmark?: (id: number) => void;
  className?: string;
  showImage?: boolean;
  variant?: 'default' | 'minimal' | 'featured';
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  excerpt,
  imageUrl,
  authorName = 'Admin TDEE',
  authorImage,
  date = new Date(),
  readTime = '5 min read',
  tags = [],
  isBookmarked = false,
  onBookmark,
  className = '',
  showImage = true,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmark) {
      setIsBookmarking(true);
      onBookmark(id);
      // Reset animation after 500ms
      setTimeout(() => setIsBookmarking(false), 500);
    }
  };

  const formatDate = (dateString: string | Date) => {
    try {
      const dateObj = typeof dateString === 'string' ? new Date(dateString) : dateString;
return formatDistanceToNow(dateObj, { 
        addSuffix: true,
        locale: indonesianLocale
      });
    } catch (e) {
      return '';
    }
  };

  // Render different variants
  if (variant === 'minimal') {
    return (
      <motion.div 
        className={`group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
        whileHover={{ y: -4 }}
      >
        <Link href={`/article/${id}`} className="block">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-green-600">
                {formatDate(date)}
              </span>
              <button 
                onClick={handleBookmark}
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                aria-label={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                <svg 
                  className={`w-5 h-5 ${isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {excerpt}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div 
        className={`relative rounded-xl overflow-hidden bg-white shadow-lg ${className}`}
        whileHover={{ y: -4 }}
      >
        <Link href={`/article/${id}`} className="block">
          {showImage && imageUrl && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          )}
          
          <div className="p-6">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.slice(0, 2).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
            
            {excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                {authorImage && (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={authorImage}
                      alt={authorName}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{authorName}</p>
                  <p className="text-xs text-gray-500">{formatDate(date)} • {readTime}</p>
                </div>
              </div>
              
              <button 
                onClick={handleBookmark}
                className={`p-1.5 rounded-full ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'} transition-colors`}
                aria-label={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                <svg 
                  className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill={isBookmarked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/article/${id}`} className="block h-full">
        <div className="relative">
          {showImage && imageUrl ? (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Bookmark button */}
              <button 
                onClick={handleBookmark}
                className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all duration-300 ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                } ${isBookmarking ? 'animate-ping' : ''}`}
                aria-label={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                <svg 
                  className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill={isBookmarked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
              
              {/* Tags */}
              {tags.length > 0 && (
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs font-medium text-white bg-green-600/90 rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
              <span className="text-white text-xl font-bold">TDEE</span>
            </div>
          )}
          
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-600 font-medium">
                {formatDate(date)}
              </span>
              <span className="text-xs text-gray-500">{readTime}</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
            
            {excerpt && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                {authorImage ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={authorImage}
                      alt={authorName}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-green-700">
                      {authorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {authorName}
                </span>
              </div>
              

            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
