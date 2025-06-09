import React, { useEffect, useCallback, useState } from 'react';
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
import { CustomSlidesPagination } from '../custom-pagination/CustomPaginationSlides';
import { useTdeeCalculator } from '@/hooks/useTdeeCalculator';

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
  const { userId, fetchDataTdee: fetchTdeeData, deleteTdeeCalculation } = useTdeeCalculator();
  const accessToken = session?.user.accessToken;
  const [TdeeDisplay, setTdeeDisplay] = useState<TdeeProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.2
  });

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteTdeeCalculation(id);
      await fetchTdeeData();
    } catch (error) {
      console.error('Error deleting TDEE:', error);
    }
  }, [deleteTdeeCalculation, fetchTdeeData]);

  useEffect(() => {
    if (userId) {
      fetchTdeeData();
    }
  }, [userId, fetchTdeeData]);

  return (
    <div className="w-full md:py-0 py-3 px-4 flex flex-col justify-center items-center gap-3 section-bg bg-gradient-to-br from-[#E9E3FF] via-[#F8E1F4] to-[#F3F6FF] rounded-2xl shadow-xl">
      <div className="flex flex-row items-center justify-evenly w-full">
        <motion.div
          ref={ref}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-8 border overflow-hidden bg-[#E9E3FF] rounded-full shadow-md"
        >
          <Image className="w-20" src={Circle} alt={Circle} />
        </motion.div>
        <div className="flex flex-row gap-1">
          <Typography className="font-normal font-poppins text-[#6C63FF] text-base md:text-lg">
            Scroll down for
          </Typography>
          <Typography className="font-bold font-poppins text-[#FF6CA3] text-base md:text-lg">
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
          className="w-8 border overflow-hidden bg-[#E9E3FF] rounded-full shadow-md"
        >
          <Image className="w-20" src={Circle} alt={Circle} />
        </motion.div>
      </div>
      <Button className="py-2 px-6 text-white font-poppins font-semibold text-base md:text-lg bg-gradient-to-r from-[#6C63FF] to-[#FF6CA3] rounded-[24px] shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
        BMI Score Record
      </Button>
      {isLoading && (
        <Typography className="text-[#6C63FF]">Loading TDEE data...</Typography>
      )}
      {error && <Typography className="text-red-500">{error}</Typography>}
      <div className="w-full gap-2">
        <CardBMI
          data={TdeeDisplay}
          loading={isLoading}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Section2;
