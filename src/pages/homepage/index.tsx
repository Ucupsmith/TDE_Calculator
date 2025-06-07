import Section1 from '@/components/homepage/Section1';
import Section2 from '@/components/homepage/Section2';
import Section3 from '@/components/homepage/Section3';
import Section4 from '@/components/homepage/Section4';
import { Button, Typography } from '@material-tailwind/react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import GearProfile from '@/assets/homepage/gearprofile.svg';
import { useRouter } from 'next/router';

const Greeting = ({ name }: { name?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = `Hello! ${name ?? 'User'}`;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      } else {
        setTimeout(() => {
          setDisplayedText('');
          setIndex(0);
        }, 2000);
      }
    }, 70);

    return () => clearTimeout(timeout);
  }, [index, fullText]);
  return (
    <p className='font-poppins font-semibold text-white text-xs md:text-lg capitalize'>
      {displayedText}
      <span className='animate-pulse'>|</span>
    </p>
  );
};

const HomePageSection = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <div className='flex flex-col gap-10'>
      {session ? (
        <div className='flex flex-row px-3 py-2 justify-between items-center'>
          <div className='flex items-center justify-center border border-none rounded-lg w-auto px-3 bg-green-900'>
            <Greeting name={session?.user.name} />
          </div>
          <div
            onClick={async () => {
              await push('/profile');
            }}
            className='w-10 border border-none rounded-full flex flex-row items-center justify-center cursor-pointer bg-[#132A2E]'
          >
            <Image src={GearProfile} alt={GearProfile} />
          </div>
        </div>
      ) : (
        <div className='flex flex-row justify-end py-2 px-3'>
          <Button
            onClick={async () => {
              await push('/auth/login');
            }}
            className='rounded-xl py-2 px-3 bg-green-900 text-white font-poppins font-semibold text-xs md:text-sm capitalize'
          >
            login now!
          </Button>
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
