import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SplashScreen = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    // Delay 4.5 seconds then navigate to homepage
    const timer = setTimeout(() => {
      void router.replace('/homepage');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='relative h-48 w-48 md:h-60 md:w-60 animate-spin-slow'>
        <Image
          src='/tdee.svg'
          alt='Loading...'
          fill
          sizes='(max-width: 768px) 12rem, 15rem'
          priority
          className='object-contain'
        />
      </div>
      <p className='mt-4 text-[#34D399] font-poppins font-semibold'>
        Loading...
      </p>
      <style jsx>{`
        /* custom slow spin */
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
