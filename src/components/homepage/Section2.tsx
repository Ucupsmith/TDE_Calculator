import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import CardBMI from '../homepage-component/CardBMI';
import Circle from '@/assets/homepage/circle2.svg';
const Section2: React.FC = () => {
  const [TdeeDisplay, setTdeeDisplay] = useState<[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.2
  });

  const calculation: number = 24.3;
  const Tdee: number = 24.3;
  const fetchDataTdee = async (): Promise<void> => {
    try {
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {}, [inView]);

  return (
    <div className='w-full md:py-0 py-3 flex flex-col justify-between items-center gap-3'>
      <div className='flex flex-row items-center justify-evenly w-full'>
        <motion.div
          ref={ref}
          className='w-6 border overflow-hidden bg-green-300 rounded-full'
        >
          <Image className='w-20' src={Circle} alt={Circle} />
        </motion.div>
        <div className='flex flex-row gap-1'>
          <Typography className='font-normal font-poppins text-white text-sm md:text-lg  '>
            Scroll down for
          </Typography>
          <Typography className='font-bold font-poppins text-white text-sm md:text-lg'>
            MORE
          </Typography>
        </div>
        <motion.div
          ref={ref}
          className='w-6 border overflow-hidden bg-green-300 rounded-full'
        >
          <Image className='w-20' src={Circle} alt={Circle} />
        </motion.div>
      </div>
      <Button className='py-1 text-white font-poppins font-semibold text-sm md:text-lg bg-[#144B3C] hover:scale-100'>
        BMI Score Record
      </Button>
      <CardBMI Calculation={calculation} Tdee={Tdee} />
    </div>
  );
};

export default Section2;
