import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
import Joyride from 'react-joyride';
import Cookies from 'js-cookie';

interface Navigation {
  label: string;
  navigate: string;
  icon: string;
  icon2: string;
}

const Navbar = () => {
  const { data: session } = useSession();
  const userId = session?.user.userId as number;
  const [isClient, setIsclient] = useState<boolean>(false);
  const [run, setRun] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
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

  const steps: any = Navigate.map((nav) => ({
    target: `#nav-${nav.label.toLowerCase()}`,
    content:
      nav.label.toLowerCase() === 'home'
        ? 'Ini adalah halaman utama TDEE berguna untuk melihat hasil TDEE status.'
        : nav.label.toLowerCase() === 'meal'
          ? 'Fitur Meal Plan membantu kamu merancang dan mencatat asupan harian dengan lebih mudah dan terstruktur.'
          : nav.label.toLowerCase() === 'tdee'
            ? 'Gunakan kalkulator TDEE untuk mengetahui kebutuhan kalori harianmu berdasarkan aktivitas dan tujuan.'
            : nav.label.toLowerCase() === 'article'
              ? 'Baca berbagai artikel informatif seputar kesehatan, nutrisi, dan gaya hidup sehat.'
              : 'Halaman riwayat meal akan terisi otomatis setelah kamu menyusun meal plan dan memilih makanan.',
    disableBeacon: true
  }));

  useEffect(() => {
    if (!userId) return;
    setIsclient(true);
    const hasSeenTutorial = Cookies.get('hasSeenJoyride');
    if (hasSeenTutorial) return;
    const startJoyride = () => {
      setRun(true);
      Cookies.set('hasSeenJoyride', 'true', { expires: 365 });
    };
    const targetIds = Navigate.map((nav) => `#nav-${nav.label.toLowerCase()}`);
    const waitForTargets = setInterval(() => {
      const oneExist = targetIds.some((selector) =>
        document.querySelector(selector)
      );
      if (oneExist) {
        clearInterval(waitForTargets);
        setTimeout(startJoyride, 300);
      }
    }, 100);
    return () => clearInterval(waitForTargets);
  }, [userId]);

  const router = useRouter();
  const { pathname, push } = router;
  return (
    <div className='w-full flex fixed bottom-0 left-0 right-0 z-10 py-0 md:py-3 px-0 items-end justify-center md:relative bg-opacity-50'>
      <div className='w-full h-16 flex flex-row items-start md:items-center justify-center md:px-2 border border-none px-0 md:bg-[#144B3C] bg-[#143238] md:rounded-[20px] rounded-t-xl'>
        <div className='h-6 flex flex-col items-end justify-center'>
          <Image
            className='md:flex md:w-24 hidden md:pt-5 pt-0'
            src={TdeeLogo}
            alt={TdeeLogo}
          />
        </div>
        <div className='w-full md:h-6 md:flex md:flex-row flex justify-between md:items-center items-center '>
          {Navigate !== null
            ? Navigate.map((nav, id: number) => {
                const active = pathname === nav.navigate;
                const navId = `nav-${nav.label.toLowerCase()}`;
                return (
                  <div
                    id={navId}
                    key={id}
                    className='w-full md:h-auto md:flex flex flex-col items-center justify-start  cursor-pointer'
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
                        className={`md:w-auto md:h-auto w-8 flex flex-row items-center md:rounded-none md:bg-[#144B3C] rounded-[35px] ease-in transition-all duration-300 text-[#34D399]`}
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
          {isClient && (
            <Joyride
              run={run}
              steps={steps}
              showSkipButton={true}
              continuous={true}
              stepIndex={stepIndex}
              spotlightClicks={true}
              styles={{
                options: {
                  zIndex: 10000,
                  primaryColor: '#22c55e', // warna tombol utama (next, done) — hijau tailwind
                  textColor: '#222',
                  backgroundColor: '#fff',
                  arrowColor: '#fff',
                  overlayColor: 'rgba(0,0,0,0.5)',
                  beaconSize: 5
                },
                buttonNext: {
                  backgroundColor: '#22c55e', // tombol next hijau
                  color: '#fff'
                },
                buttonBack: {
                  color: '#22c55e' // tombol back hijau
                },
                buttonSkip: {
                  color: '#d33434' // tombol skip merah
                },
                tooltip: {
                  borderRadius: '12px',
                  padding: '20px',
                  fontSize: '16px',
                  overlay: 'none'
                }
              }}
              locale={{
                back: 'Kembali',
                close: 'Tutup',
                last: 'Selesai',
                next: 'Lanjut',
                skip: 'Lewati'
              }}
              disableScrolling={true}
              disableScrollParentFix={true}
              scrollToFirstStep={true}
              callback={(data) => {
                const { status, index, type } = data;

                if (['finished', 'skipped'].includes(status)) {
                  setRun(false);
                  setStepIndex(0);
                  return;
                }
                if (
                  type === 'step:after' ||
                  type === 'error:target_not_found'
                ) {
                  setStepIndex(index + 1);
                }

                if (type === 'step:before') {
                  setStepIndex(index);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
