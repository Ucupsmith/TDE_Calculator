import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  authorName?: string;
  authorImage?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  description,
  imageSrc,
  authorName,
  authorImage
}) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-1 relative">
      <Link href={`/article/${id}`} title={`Read more about ${title}`}>
        <div className="text-white group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
          <div className="aspect-w-3 aspect-h-4">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Hover Title Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-white/90 text-xs line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Author Section */}
      {authorName && authorImage && (
        <div className="flex items-center mt-2 space-x-2 px-2">
          <Image
            src={authorImage}
            alt={authorName ? `${authorName}'s profile` : 'Author profile'}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm text-gray-600">{authorName}</span>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
