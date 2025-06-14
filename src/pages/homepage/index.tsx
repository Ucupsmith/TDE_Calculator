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
import ThemeToggle from '@/components/ThemeToggle';
import Cookies from 'js-cookie';
import PaginationControls from '@/components/pagination-controls/PaginationControls';
import { Swiper, SwiperSlide } from 'swiper/react';

const tutorialMessages = [
  'Selamat datang di aplikasi kami! Mari kita lihat fitur-fitur utamanya.',
  'Ini adalah halaman utama, tempat Anda akan melihat ringkasan aktivitas Anda.',
  'Gunakan tombol di pojok kanan atas untuk mengakses Profil Anda.',
  'Di bagian bawah, Anda bisa menemukan berbagai kalkulator dan meal plan.',
  "Ayo mulai jelajahi! Klik 'Selesai' untuk menutup tutorial ini."
];

const tutorial = [
  {
    image: <Image src={''} alt='' className='w-40 h-28' />,
    text: 'Selamat datang di aplikasi kami! Mari kita lihat fitur-fitur utamanya.'
  },
  {
    image: <Image src={''} alt='' className='w-40 h-28' />,
    text: 'Ini adalah halaman utama, tempat Anda akan melihat ringkasan aktivitas Anda.'
  },
  {
    image: <Image src={''} alt='' className='w-40 h-28' />,
    text: 'Gunakan tombol di pojok kanan atas untuk mengakses Profil Anda.'
  },
  {
    image: <Image src={''} alt='' className='w-40 h-28' />,
    text: 'Di bagian bawah, Anda bisa menemukan berbagai kalkulator dan meal plan.'
  },
  {
    image: <Image src={''} alt='' className='w-40 h-28' />,
    text: 'Ayo mulai jelajahi! Klik Selesai untuk menutup tutorial ini'
  }
];

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
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const [itemsPage, setItemsPage] = useState<number>(1);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  // const itemsPerPage = 1;
  // const LastIndexItems = itemsPage * itemsPerPage;
  // const FirstIndexItems = (LastIndexItems / itemsPerPage) % itemsPerPage;

  // const paginationItems = tutorial.slice(FirstIndexItems, LastIndexItems);

  useEffect(() => {
    if (session?.user && !Cookies.get('hasSeenTutorial')) {
      setShowTutorialModal(true);
    }
  }, [session]);

  const handleNextStepTutorial = () => {
    if (tutorialStep < tutorialMessages.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      Cookies.set('hasSeenTutorial', 'true', { expires: 365 });
      setShowTutorialModal(false);
    }
  };

  return (
    <div className='flex flex-col gap-10'>
      {session ? (
        <div className='w-full flex flex-row px-3 py-2 justify-between items-center'>
          <div className='flex flex-row w-full justify-between gap-1 items-center'>
            <div className='flex items-center justify-center border border-none rounded-lg w-auto px-3 bg-green-900 md:w-auto h-7'>
              <Greeting name={session?.user.name} />
            </div>
            <ThemeToggle />
          </div>
          <div
            onClick={async () => {
              await push('/profile');
            }}
            className='w-10 border border-none rounded-full flex flex-row items-center justify-center cursor-pointer bg-[#132A2E] pt-2'
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
      {showTutorialModal && session?.user && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative text-black'>
            <h2 className='text-xl font-bold mb-4'>Tutorial Aplikasi</h2>
            <p className='mb-6'>{tutorialMessages[tutorialStep]}</p>
            <button
              onClick={handleNextStepTutorial}
              className='bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors'
            >
              {tutorialStep < tutorialMessages.length - 1
                ? 'Lanjut'
                : 'Selesai '}
            </button>
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
