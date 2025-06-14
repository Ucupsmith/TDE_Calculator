import Image from 'next/image';
import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import TdeeLogo from '@/assets/homepage/Logo.svg';
import { useRouter } from 'next/router';
import ArticleIcon from '@/assets/homepage/navbar/article.svg';
import { useSession } from 'next-auth/react';
import ArticleClicked from '@/assets/homepage/navbar/articleclicked2.svg';
import MealHistory from '@/assets/homepage/navbar/mealhistory.svg';
import MealHistroyUnclicked from '@/assets/homepage/navbar/mealhistoryclicked.svg';
import MealPlanBowl from '@/assets/homepage/navbar/bowl-food-solid.svg';
import MealPlanBowlClicked from '@/assets/homepage/navbar/bowl-food-solid-clicked.svg';
import Home from '@/assets/homepage/navbar/homeclicked.svg';
import HomeUnclicked from '@/assets/homepage/navbar/homeunclicked.svg';
import TdeeCalculator from '@/assets/homepage/navbar/tdeecalculatorsm.svg';
import TdeeCalculatorUnclicked from '@/assets/homepage/navbar/calculator-solid.svg';

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
      icon: Home,
      icon2: HomeUnclicked
    },
    {
      label: 'Meal',
      navigate: '/meal-plan',
      icon: MealPlanBowlClicked,
      icon2: MealPlanBowl
    },
    {
      label: 'Tdee',
      navigate: '/tdee-calculator',
      icon: TdeeCalculatorUnclicked,
      icon2: TdeeCalculator
    },
    {
      label: 'Article',
      navigate: '/article',
      icon: ArticleClicked,
      icon2: ArticleIcon
    },
    {
      label: 'History',
      navigate: '/meal-history',
      icon: MealHistroyUnclicked,
      icon2: MealHistory
    }
  ];
  const router = useRouter();
  const { pathname, push } = router;
  return (
    <div className='w-full flex fixed bottom-0 left-0 right-0 z-10 py-0 md:py-3 px-0 items-end justify-center md:relative bg-opacity-50'>
      <div className='w-full h-16 flex flex-row items-start md:items-center md:px-2 border border-none px-0 md:bg-[#144B3C] bg-[#143238] md:rounded-[20px] rounded-t-xl'>
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
                        className={`md:w-auto md:h-auto w-8 flex flex-row justify-around items-center md:rounded-none md:bg-[#144B3C] rounded-[35px] ease-in transition-all duration-300 text-[#34D399]`}
                      >
                        <div className='flex flex-col w-full items-center justify-around h-14'>
                          <Image
                            src={nav.icon}
                            alt={nav.icon}
                            className={`md:hidden w-5 h-8`}
                          />
                          <Typography
                            className={`font-semibold font-poppins md:text-[#34D399] text-[#34D399] md:text-[16px] text-[10px] text-center ${
                              nav.label === 'Register' &&
                              nav.navigate === '/auth/register'
                                ? 'md:flex text-white md:border-none md:border md:rounded-[25px] md:bg-[#34D399] md:w-40 md:h-10 md:items-center md:justify-center'
                                : nav.label === 'Meal History'
                                  ? 'text-[8px] text-[#34D399] font-semibold font-poppins md:text-white md:text-[16px]'
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
                        className={`md:w-auto md:h-auto w-8 flex justify-center items-center md:rounded-none md:bg-[#144B3C] rounded-[35px]`}
                      >
                        <div className='flex flex-col items-center justify-center h-14'>
                          <Image
                            src={nav.icon2}
                            alt={nav.icon2}
                            className={`md:hidden w-5 h-8 border border-none }`}
                          />
                          <Typography
                            className={`font-semibold font-poppins md:flex md:text-neutral-400 text-white md:text-[16px] text-[10px]${
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
