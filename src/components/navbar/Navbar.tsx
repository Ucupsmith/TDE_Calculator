import Image from 'next/image';
import React, { useState } from 'react';
import Hearts from '@/assets/homepage/hearts.png';
import Link from 'next/link';
import { Button, Typography } from '@material-tailwind/react';
import TdeeLogo from '@/assets/homepage/Logo.svg';
import { useRouter } from 'next/router';
import HomeIcon from '@/assets/homepage/home3.svg';
import TdeeIcon from '@/assets/homepage/tdee-calculation.svg';
import MealIcon from '@/assets/homepage/gambar mealplan.svg';
import ArticleIcon from '@/assets/homepage/articleIcon.svg';
import UserIcon from '@/assets/homepage/Union.svg';

interface Navigation {
  label: string;
  navigate: string;
  icon: string;
}

const Navigate: Navigation[] = [
  {
    label: 'Home',
    navigate: '/homepage',
    icon: HomeIcon
  },
  {
    label: 'Tdee',
    navigate: '/tdee-calculator',
    icon: TdeeIcon
  },
  {
    label: 'Meal',
    navigate: '/meal-plan',
    icon: MealIcon
  },
  {
    label: 'Article',
    navigate: '/article',
    icon: ArticleIcon
  },
  {
    label: 'Register',
    navigate: '/auth/register',
    icon: UserIcon
  }
];

const Navbar = () => {
  const router = useRouter();
  const { pathname, push } = router;
  return (
    <div className='w-full flex justify-center overflow-hidden py-0 md:py-3 px-0 fixed top-[91.5%] md:relative z-10'>
      <div className='w-full h-14 flex flex-row items-center md:px-2 px-0 md:bg-[#144B3C] bg-[#144B3C] border-none md:rounded-[20px] rounded-t-[8px]'>
        <div className='h-6 flex flex-col items-end justify-center'>
          <Image
            className='md:flex md:w-24 hidden md:pt-5 pt-0'
            src={TdeeLogo}
            alt={TdeeLogo}
          />
        </div>
        <div className='w-full md:h-6 h-full  md:flex md:flex-row flex justify-center md:items-center items-center'>
          {Navigate !== null
            ? Navigate.map((nav, id: number) => {
                const active = pathname === nav.navigate;
                return (
                  <div
                    key={id}
                    className='w-full md:h-auto md:flex flex flex-col items-center justify-center'
                  >
                    {active ? (
                      <div
                        onClick={async () => {
                          await push(nav.navigate);
                        }}
                        className={`md:w-auto md:h-auto w-20 h-8 flex flex-row justify-around items-center  gap-1 py-2 md:rounded-none md:bg-[#144B3C] rounded-[35px] transition-all duration-300 border-none bg-[#132A2E]`}
                      >
                        <div className='flex flex-row w-full items-center justify-around'>
                          <Image
                            src={nav.icon}
                            alt={nav.icon}
                            className='md:hidden w-4 h-4'
                          />
                          <Typography
                            className={`font-semibold font-poppins md:text-white text-[#34D399] md:text-[16px] text-[10px] text-center ${
                              nav.label === 'Register' &&
                              nav.navigate === '/auth/register'
                                ? 'md:flex text-white md:border-none md:border md:rounded-[25px] md:bg-[#34D399] md:w-40 md:h-10 md:items-center md:justify-center'
                                : ''
                            }
                          
                          `}
                          >
                            {nav.label}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={async () => {
                          await push(nav.navigate);
                        }}
                        className={`md:w-auto md:h-auto w-8 h-7 flex flex-row justify-evenly items-center gap-1 py-2 md:rounded-none md:bg-[#144B3C] rounded-[35px] border-none bg-[#132A2E]`}
                      >
                        <div className='flex items-center justify-center'>
                          <Image
                            src={nav.icon}
                            alt={nav.icon}
                            className='md:hidden w-4 h-4'
                          />
                          <Typography
                            className={`font-semibold font-poppins md:flex md:text-neutral-400 text-[#34D399] md:text-[16px] hidden ${
                              nav.label === 'Register' &&
                              nav.navigate === '/auth/register'
                                ? 'md:flex md:text-white md:border-none md:border md:rounded-[25px] md:bg-[#34D399] md:w-40 md:h-10 md:items-center md:justify-center'
                                : ''
                            }
                          
                          `}
                          >
                            {nav.label}
                          </Typography>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
