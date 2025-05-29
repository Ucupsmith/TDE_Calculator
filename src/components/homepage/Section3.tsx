import { Typography } from '@material-tailwind/react';
import HomeIcon from '@/assets/homepage/home1.png';
import HomeIcon2 from '@/assets/homepage/home2.png';
import HomeIcon3 from '@/assets/homepage/home3.png';
import React from 'react';
import Image from 'next/image';

interface HeroProps {
  image: string | any;
  title: string;
  content: string;
}

const hero: HeroProps[] = [
  {
    image: HomeIcon,
    title: 'understand your tdee',
    content:
      'Your Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day. It encompasses your Basal Metabolic Rate (BMR), which is the energy needed for basic bodily functions at rest, plus the energy used for physical activity, digestion, and other daily movements. Understanding your TDEE helps you create a balanced eating and exercise plan for weight loss or maintenance.'
  },
  {
    image: HomeIcon2,
    title: 'get enough sleep',
    content:
      'To get enough sleep, prioritize a consistent sleep schedule, create a relaxing sleep environment, and limit caffeine and screen time before bed. Regular exercise and a healthy diet can also support better sleep, and if needed, short naps (under 30 minutes) can be helpful, but avoid napping too late in the day.'
  },
  {
    image: HomeIcon3,
    title: 'reduce comsumption of processed foods',
    content:
      'To reduce processed food consumption, focus on eating more whole foods like fruits, vegetables, and lean proteins. You can also make healthier swaps, like choosing whole grains over refined grains and preparing meals at home instead of relying on ready-made options.'
  }
];
const Section3: React.FC = () => {
  return (
    <div className='flex flex-col gap-5 md:gap-10 w-full py-2 px-3'>
      <div className='flex flex-col gap-1 items-start'>
        <Typography className='font-semibold font-poppins text-white text-lg md:text-2xl capitalize'>
          keep your bmi score
        </Typography>
        <Typography className='font-semibold font-poppins text-white text-lg md:text-2xl capitalize'>
          on optimal level
        </Typography>
      </div>
      {hero !== null &&
        hero.map((item, id: number) => {
          return (
            <div
              key={id}
              className='flex flex-col gap-5 md:gap-0 w-full md:w-auto items-center justify-center md:items-start h-auto md:flex md:flex-row'
            >
              <Image
                className='w-auto h-auto md:w-56'
                src={item.image}
                alt={item.image}
              />
              <div className='flex flex-col space-y-8 items-center md:items-start justify-center'>
                <Typography className='font-semibold font-poppins text-white text-2xl md:text-2xl capitalize'>
                  {item.title}
                </Typography>
                <Typography className='font-normal font-poppins md:font-extralight text-white text-xs md:text-lg text-center md:text-start capitalize'>
                  {item.content}
                </Typography>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Section3;
