import Image from 'next/image';
import React from 'react';
import ImageNotFound from '@/assets/error/404-error-with-landscape-concept-illustration.png';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const { push } = useRouter();
  return (
    <div className='w-full flex flex-col h-screen items-center justify-center text-center'>
      <Image src={ImageNotFound} alt={String(ImageNotFound)} />
      <Typography className='font-poppins font-semibold text-lg md:text-2xl text-white capitalize'>
        oops looks like you got the problem
      </Typography>
      <Typography
        onClick={() => push('/homepage')}
        className='font-poppins font-semibold text-xs md:text-sm text-blue-500 underline capitalize'
      >
        go back to home
      </Typography>
    </div>
  );
};

export default Custom404;
