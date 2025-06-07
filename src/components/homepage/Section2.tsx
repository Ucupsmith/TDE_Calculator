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
import { useSession } from 'next-auth/react';
import { useTdee } from '@/common/TdeeProvider';

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
  const { setTdeeId } = useTdee();
  const userId = session?.user.userId as number;
  console.log('userId:', userId);
  // const { tdeeId } = useParams();
  const accessToken = session?.user.accessToken;
  const [TdeeDisplay, setTdeeDisplay] = useState<TdeeProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.2
  });

  const fetchDataTdee = async (): Promise<void> => {
    if (!userId) {
      console.log(
        'fetchDataTdee: userId is falsy at the start of the function, returning early.'
      );
      setError('Internal Error: User ID missing.');
      return;
    }
    const payload = {
      userId: userId,
      accessToken: session?.user?.accessToken as string
    };
    try {
      const historyData = await getTdeeCalculationHome(payload);
      if (historyData.length > 0) {
        const latestTdee = historyData[historyData.length - 1]; // Ambil data terbaru
        setTdeeId(latestTdee.tdeeId); // ✅ Simpan ke context
      }
      console.log('getTdeeCalculation home menyala:', historyData);
      if (historyData && Array.isArray(historyData)) {
        setTdeeDisplay(historyData);
        setError(null); // Clear error jika berhasil
      } else {
        console.warn(
          'fetchDataTdee: Repository returned unexpected data format:',
          historyData
        );
        setTdeeDisplay([]);
        setError('Failed to load TDEE history: Invalid data format.');
      }
      return historyData;
    } catch (error) {
      setTdeeDisplay([]);
      setError('Failed to load TDEE history.');
    } finally {
      setIsLoading(false);
    }
  };
  const deleteTdeeCalculation = async (tdeeId: number) => {
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
      fetchDataTdee();
    } catch (error) {
      console.error('Error deleting TDEE data:', error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchDataTdee();
    }
    void deleteTdeeCalculation;
  }, [userId]);

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
      <div className='w-full px-3'>
        <CardBMI
          data={TdeeDisplay}
          loading={isLoading}
          onDelete={deleteTdeeCalculation}
        />
      </div>
    </div>
  );
};

export default Section2;
