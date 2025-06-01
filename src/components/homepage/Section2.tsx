import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import CardBMI from '../homepage-component/CardBMI';
import Circle from '@/assets/homepage/circle2.svg';
import {
  deleteSaveTdee,
  getTdeeCalculationHome
} from '@/repository/tdee.repository';
import { getSession, useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { tree } from 'next/dist/build/templates/app-page';
import { parse } from 'path';
import { parseJsonFile } from 'next/dist/build/load-jsconfig';
import { t } from 'framer-motion/dist/types.d-CQt5spQA';

export interface TdeeProps {
  tdeeId?: string;
  tdee_result: string;
  calculation_date: string;
}

interface TdeePayloadProps {
  userId: number;
  accessToken: string;
}

interface TdeePayloadDelete {
  tdeeId: number;
  userId: number;
  accessToken?: string;
}
const Section2: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user.userId as number;
  // const { tdeeId } = useParams();
  const accessToken = session?.user.accessToken;
  const [TdeeDisplay, setTdeeDisplay] = useState<TdeeProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.2
  });

  const fetchDataTdee = useCallback(async (): Promise<void> => {
    if (!userId) {
      setError('User ID not found');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const payload: TdeePayloadProps = {
        userId: userId,
        accessToken: accessToken as string
      };
      const response = await getTdeeCalculationHome(payload);
      if (response) {
        setTdeeDisplay(response);
      } else {
        setTdeeDisplay([]);
        setError('No TDEE data available');
      }
      // return response.data; // Removed this line as the function is typed void
    } catch (error) {
      console.error('Error fetching TDEE data:', error);
      setError('Failed to fetch TDEE data');
      setTdeeDisplay([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId, accessToken]);

  const deleteTdeeCalculation = useCallback(async (tdeeId: number) => {
    try {
      const payload: TdeePayloadDelete = {
        userId: userId,
        accessToken: accessToken,
        tdeeId: tdeeId
      };
      if (!payload) {
        console.log('error payload', payload);
        return; // Added return here
      }
      setTdeeDisplay((prev) =>
        prev.filter((item) => Number(item.tdeeId) !== tdeeId)
      );
      await deleteSaveTdee(payload);
      fetchDataTdee(); // Call fetchDataTdee after deletion
    } catch (error) {
      console.error('Error deleting TDEE data:', error);
      // Handle error (e.g., show toast) if needed
    }
  }, [userId, accessToken, fetchDataTdee]);

  useEffect(() => {
    if (userId) {
      fetchDataTdee();
    }
    // Removed: void deleteTdeeCalculation;
  }, [userId, fetchDataTdee]);

  // Removed this empty useEffect hook:
  // useEffect(() => {}, [inView]);

  return (
    <div className='w-full md:py-0 py-3 px-4 flex flex-col justify-center items-center gap-3'>
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
      </div>
      <Button className='py-1 text-white font-poppins font-semibold text-sm md:text-lg bg-[#144B3C] hover:scale-100'>
        BMI Score Record
      </Button>
      {isLoading && (
        <Typography className='text-white'>Loading TDEE data...</Typography>
      )}
      {error && <Typography className='text-red-500'>{error}</Typography>}
      <CardBMI
        data={TdeeDisplay}
        loading={isLoading}
        onDelete={deleteTdeeCalculation}
      />
    </div>
  );
};

export default Section2;
