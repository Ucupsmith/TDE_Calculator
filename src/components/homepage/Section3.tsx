import { Typography } from '@material-tailwind/react';
import { motion, useAnimation } from 'framer-motion';
import HomeIcon from '@/assets/homepage/home1.png';
import HomeIcon2 from '@/assets/homepage/home2.png';
import HomeIcon3 from '@/assets/homepage/home3.png';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

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
const itemVariant = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -50 : 50
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

interface Section3Props {
  id?: string;
}

const Section3: React.FC<Section3Props> = ({ id }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      id={id}
      className='flex flex-col gap-5 md:gap-10 w-full py-2 px-3'
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
        }}
        className='flex flex-col gap-1 items-start'
      >
        <Typography className='font-semibold font-poppins text-white text-lg md:text-2xl capitalize'>
          keep your bmi score
        </Typography>
        <Typography className='font-semibold font-poppins text-white text-lg md:text-2xl capitalize'>
          on optimal level
        </Typography>
      </motion.div>
      {hero !== null &&
        hero.map((item, id: number) => {
          const isEven = id % 2 === 0;
          const direction = isEven ? 'left' : 'right';

          return (
            <motion.div
              key={id}
              custom={direction}
              variants={itemVariant}
              className='flex flex-col gap-5 md:gap-0 w-full md:w-auto items-center justify-center md:items-center h-auto md:flex md:flex-row border border-none rounded-lg shadow-lg shadow-green-500 py-3 px-2'
            >
              <Image
                className='w-auto h-auto md:w-56'
                src={item.image}
                alt={item.image}
              />
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.2 }
                  }
                }}
                className='flex flex-col items-start space-y-8 md:items-start justify-center p-4'
              >
                <Typography className='font-semibold font-poppins text-white text-2xl md:text-2xl capitalize'>
                  {item.title}
                </Typography>
                <Typography className='font-normal font-poppins md:font-extralight text-white text-xs md:text-lg md:text-start capitalize'>
                  {item.content}
                </Typography>
              </motion.div>
            </motion.div>
          );
        })}
    </motion.div>
  );
};

export default Section3;
