import { Avatar, Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Hero from '@/assets/homepage/Hero_Section.svg';
import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section1: React.FC = () => {
  const { push } = useRouter();
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2
  });

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 1, ease: 'easeOut' }
      });
      controls.start({
        y: [0, -30, 0],
        x: [0, -1, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        }
      });
    };

    sequence();
  }, [controls]);

  const parentVariant = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const childVariant = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  useEffect(() => {}, [inView]);
  return (
    <div className='md:w-full md:flex md:flex-row flex flex-col-reverse items-center justify-center  md:py-3 py-2'>
      <motion.div
        initial='hidden'
        animate='show'
        variants={parentVariant}
        className='md:w-1/2 w-full flex flex-col justify-evenly md:gap-0 gap-2'
      >
        <motion.div
          variants={childVariant}
          className='flex flex-col items-center w-full gap-2'
        >
          <div className='flex flex-row space-x-2'>
            <Typography className='text-white font-bold font-poppins md:text-4xl text-2xl'>
              Calculate Your
            </Typography>
            <Typography className='font-bold font-poppins md:text-4xl text-2xl text-[#34D399]'>
              TDEE
            </Typography>
          </div>
          <div className='w-auto flex justify-end'>
            <Typography className='font-semibold font-poppins opacity-45 text-white text-xl'>
              Reach Your Health Goals
            </Typography>
          </div>
        </motion.div>
        <motion.div
          variants={childVariant}
          className='w-full flex justify-center'
        >
          <Button
            onClick={async () => {
              await push('/tdee-calculator');
            }}
            className='w-48 border-none rounded-[15px] py-3 px-2 bg-[#34D399] text-[10px] md:text-xs'
          >
            Calculate Your TDEE Now!
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={controls}
        className='md:w-1/2 w-full flex justify-center'
      >
        <Image className='' width={300} height={300} src={Hero} alt={Hero} />
      </motion.div>
    </div>
  );
};

export default Section1;
