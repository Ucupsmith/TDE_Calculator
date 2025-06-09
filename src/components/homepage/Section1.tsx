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
    <div className="md:w-full md:flex md:flex-row flex flex-col-reverse items-center justify-center md:py-8 py-4 section-bg bg-gradient-to-br from-[#E9E3FF] via-[#F8E1F4] to-[#F3F6FF] rounded-2xl shadow-xl">
      <motion.div
        initial="hidden"
        animate="show"
        variants={parentVariant}
        className="md:w-1/2 w-full flex flex-col justify-evenly md:gap-0 gap-4"
      >
        <motion.div
          variants={childVariant}
          className="flex flex-col items-center w-full gap-2 bg-white bg-opacity-80 rounded-2xl shadow-md p-4"
        >
          <div className="flex flex-row space-x-2">
            <Typography className="text-[#6C63FF] font-bold font-poppins md:text-4xl text-2xl drop-shadow-md">
              Good Morning, User!
            </Typography>
          </div>
          <div className="w-auto flex justify-end">
            <Typography className="font-semibold font-poppins opacity-80 text-[#FF6CA3] text-xl">
              Reach Your Health Goals
            </Typography>
          </div>
        </motion.div>
        <motion.div
          variants={childVariant}
          className="w-full flex justify-center"
        >
          <Button
            onClick={async () => {
              await push('/tdee-calculator');
            }}
            className="w-48 border-none rounded-[24px] py-3 px-2 bg-gradient-to-r from-[#6C63FF] to-[#FF6CA3] text-white shadow-lg text-[12px] md:text-base font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            Calculate Your BMR Now!
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={controls}
        className="md:w-1/2 w-full flex justify-center"
      >
        <div className="bg-white bg-opacity-80 rounded-full p-6 shadow-lg flex items-center justify-center">
          <Image className="" width={220} height={220} src={Hero} alt={Hero} />
        </div>
      </motion.div>
    </div>
  );
};

export default Section1;
