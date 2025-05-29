import Section1 from '@/components/homepage/Section1';
import Section2 from '@/components/homepage/Section2';
import Section3 from '@/components/homepage/Section3';
import Section4 from '@/components/homepage/Section4';
import { Typography } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import React from 'react';

const HomePageSection = () => {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col gap-10'>
      {session && (
        <div className='flex flex-row px-3 py-2 justify-end'>
          <div className='border border-none rounded-lg w-auto px-3 bg-white'>
            <Typography className='font-poppins font-semibold text-black text-sm md:text-lg'>
              {`Hello! ${session.user.name}`}
            </Typography>
          </div>
        </div>
      )}
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default HomePageSection;
