import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import CardBMI from '../homepage-component/CardBMI';
import Circle from '@/assets/homepage/circle2.svg';
import { getTdeeCalculationHome } from '@/repository/tdee.repository';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export interface TdeeProps {
  tdeeId: number;
  tdee: number;
  createdAt: number;
  lastCalculated: number;
}
const Section2: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user.userId;
  const [TdeeDisplay, setTdeeDisplay] = useState<TdeeProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.2
  });

  const fetchDataTdee = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getTdeeCalculationHome(userId);
      if (response !== null && response !== undefined) {
        setTdeeDisplay(response);
      } else {
        setTdeeDisplay([]);
      }
    } catch (error) {
      console.log(`error fetching data : ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void fetchDataTdee();
  }, []);

  useEffect(() => {}, [inView]);

  return (
    <div className='w-full md:py-0 py-3 flex flex-col justify-between items-center gap-3'>
      <div className='flex flex-row items-center justify-evenly w-full'>
        <motion.div
          ref={ref}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
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
          animate={{ y: [0, -10, 0] }} // naik -10px lalu turun kembali ke 0
          transition={{
            duration: 1.5, // lama animasi
            repeat: Infinity, // ulangi terus
            ease: 'easeInOut' // efek easing
          }}
          className='w-6 border overflow-hidden bg-green-300 rounded-full'
        >
          <Image className='w-20' src={Circle} alt={Circle} />
        </motion.div>
      </div>
      <Button className='py-1 text-white font-poppins font-semibold text-sm md:text-lg bg-[#144B3C] hover:scale-100'>
        BMI Score Record
      </Button>
      <CardBMI data={TdeeDisplay} loading={isLoading} />
    </div>
  );
};

export default Section2;
