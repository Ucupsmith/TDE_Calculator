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
        <div className="text-white group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] bg-gradient-to-br from-[#134E4A] via-[#0F766E] to-[#115E59]">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-t-xl">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Info Overlay always visible */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm py-3 px-3 flex flex-col space-y-1">
            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
              {title}
            </h3>
            <p className="text-white/90 text-xs line-clamp-2">
              {description}
            </p>

            {authorName && authorImage && (
              <div className="flex items-center space-x-2 pt-2">
                <Image
                  src={authorImage}
                  alt={authorName ? `${authorName}'s profile` : 'Author profile'}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-xs text-white/80">{authorName}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
