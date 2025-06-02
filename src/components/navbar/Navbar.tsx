import Image from 'next/image';
import React, { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import TdeeLogo from '@/assets/homepage/Logo.svg';
import { useRouter } from 'next/router';
import HomeIcon from '@/assets/homepage/home3.svg';
import TdeeIcon from '@/assets/homepage/TdeeUnclicked.svg';
import ArticleIcon from '@/assets/homepage/articleunclicked.svg';
import MealPlanIcon from '@/assets/homepage/gambar mealplan.svg';
import UserIcon from '@/assets/homepage/Union.svg';
import { useSession } from 'next-auth/react';
import ArticleClicked from '@/assets/homepage/navbar/articleClicked.svg';
import HomeUnclicked from '@/assets/homepage/navbar/Homeunclickednew.svg';
import MealHistory from '@/assets/homepage/navbar/MealHistory.png';
import MealplanUnclicked from '@/assets/homepage/navbar/MealplanUnclicked.svg';
import TdeeClicked from '@/assets/homepage/navbar/TdeeClicked.svg';
import MealHistroyUnclicked from '@/assets/homepage/navbar/MealHistoryUnclicked.png';

interface Navigation {
  label: string;
  navigate: string;
  icon: string;
  icon2: string;
}

const Navbar = () => {
  const { data: session } = useSession();
  const Navigate: Navigation[] = [
    {
      label: 'Home',
      navigate: '/homepage',
      icon: HomeIcon,
      icon2: HomeUnclicked
    },
    {
      label: 'Meal',
      navigate: '/meal-plan',
      icon: MealPlanIcon,
      icon2: MealplanUnclicked
    },
    {
      label: 'Tdee',
      navigate: '/tdee-calculator',
      icon: TdeeClicked,
      icon2: TdeeIcon
    },
    {
      label: 'Article',
      navigate: '/article',
      icon: ArticleClicked,
      icon2: ArticleIcon
    },
    {
      label: 'Meal History',
      navigate: '/meal-history',
      icon: MealHistory,
      icon2: MealHistroyUnclicked
    }
  ];
  const router = useRouter();
  const { pathname, push } = router;
  return (
    <div className='w-full flex fixed bottom-0 left-0 right-0 z-10 py-0 md:py-3 px-0 items-end justify-center md:relative bg-opacity-50'>
      <div className='w-full h-14 flex flex-row items-center md:px-2  border px-0 md:bg-[#144B3C] bg-[#34D399] border-none md:rounded-[20px] rounded-t-[8px]'>
        <div className='h-6 flex flex-col items-end justify-center'>
          <Image
            className='md:flex md:w-24 hidden md:pt-5 pt-0'
            src={TdeeLogo}
            alt={TdeeLogo}
          />
        </div>
        <div className='w-full md:h-6 md:flex md:flex-row flex justify-center md:items-center items-center'>
          {Navigate !== null
            ? Navigate.map((nav, id: number) => {
                const active = pathname === nav.navigate;
                return (
                  <div
                    key={id}
                    className='w-full md:h-auto md:flex flex flex-col items-center justify-center  cursor-pointer'
                  >
                    {active ? (
                      <div
                        onClick={async () => {
                          if (nav.label === 'Register') {
                            await push(session ? '/profile' : '/auth/login');
                          } else {
                            await push(nav.navigate);
                          }
                        }}
                        className={`md:w-auto md:h-auto w-20 h-8 flex flex-row justify-around items-center  gap-1 py-2 md:rounded-none md:bg-[#144B3C] rounded-[35px] transition-all duration-300 border-none border bg-[#132A2E]`}
                      >
                        <div className='flex flex-row w-full items-center justify-around'>
                          <Image
                            src={nav.icon}
                            alt={nav.icon}
                            className={`md:hidden w-5 h-7 ${
                              nav.icon === MealPlanIcon
                                ? 'w-6 h-1'
                                : nav.icon === TdeeClicked && 'w-5'
                            }`}
                          />
                          <Typography
                            className={`font-semibold font-poppins md:text-white text-[#34D399] md:text-[16px] text-[10px] text-center ${
                              nav.label === 'Register' &&
                              nav.navigate === '/auth/register'
                                ? 'md:flex text-white md:border-none md:border md:rounded-[25px] md:bg-[#34D399] md:w-40 md:h-10 md:items-center md:justify-center'
                                : nav.label === 'Meal History'
                                ? 'text-[8px] text-[#34D399] font-semibold font-poppins md:text-white  md:text-[16px] '
                                : ''
                            }
                          
                          `}
                          >
                            {nav.label === 'Register'
                              ? session
                                ? 'User'
                                : 'Register'
                              : nav.label}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={async () => {
                          await push(nav.navigate);
                        }}
                        className={`md:w-auto md:h-auto w-8 h-7 flex flex-row justify-evenly items-center gap-1 py-2 md:rounded-none md:bg-[#144B3C] rounded-[35px] border-none bg-[#34D399]`}
                      >
                        <div className='flex items-center justify-center'>
                          <Image
                            src={nav.icon2}
                            alt={nav.icon}
                            className='md:hidden w-5 h-7'
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
