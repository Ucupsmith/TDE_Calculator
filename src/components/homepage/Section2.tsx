import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import { useRouter } from 'next/router';
import Joyride from 'react-joyride';
import Cookies from 'js-cookie';

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
interface Section2Props {
  id?: string;
}

const steps: any = [
  {
    target: '#first-section-1',
    content: 'Ini adalah TDEE record untuk mengetauhi kondisi TDEE',
    disableBeacon: true
  },
  {
    target: '#second-section-2',
    content: 'Ini adalah record TDEE anda selama menghitung TDEE diapplikasi',
    disableBeacon: true
  }
];

const Section2: React.FC<Section2Props> = ({ id }) => {
  const { data: session } = useSession();
  const { setTdeeId } = useTdee();
  const userId = session?.user.userId as number;
  console.log('userId:', userId);
  const router = useRouter();
  const { push } = router;
  const accessToken = session?.user.accessToken;
  const [TdeeDisplay, setTdeeDisplay] = useState<TdeeProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.2
  });
  const [isClient, setIsClient] = useState<boolean>(false);
  const [run, setRun] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const targetId = 'first-section-1';
  const targetRef = useRef(null);

  const fetchDataTdee = useCallback(async (): Promise<void> => {
    if (!userId) {
      console.log(
        'fetchDataTdee: userId is falsy at the start of the function.'
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
        const latestTdee = historyData[historyData.length - 1];
        setTdeeId(latestTdee.tdeeId);
      }
      console.log('getTdeeCalculation home menyala:', historyData);
      if (historyData && Array.isArray(historyData)) {
        setTdeeDisplay(historyData);
        setError(null);
      } else {
        console.warn(
          'fetchDataTdee: Repository returned unexpected data format:',
          historyData
        );
        setTdeeDisplay([]);
        setError('Failed to load TDEE history: Invalid data format.');
      }
      setTdeeDisplay(historyData);
      console.log('tess history data', historyData);
    } catch (error) {
      setTdeeDisplay([]);
      setError('Failed to load TDEE history.');
    } finally {
      setIsLoading(false);
    }
  }, [userId, session?.user?.accessToken, setTdeeId]);

  const deleteTdeeCalculation = async (tdeeId: number) => {
    try {
      const payload: TdeePayloadDelete = {
        userId: userId,
        accessToken: accessToken,
        tdeeId: tdeeId
      };
      if (!payload) {
        console.log('error payload', payload);
        return;
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
  const fetchData = useCallback(async () => {
    if (userId) {
      await fetchDataTdee();
    }
  }, [userId, fetchDataTdee]);

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (!userId) {
      return;
    }
    if (userId) {
      void fetchData();
    }
    const hasSeenTutorial = Cookies.get('hasSeenJoyride');
    if (hasSeenTutorial) {
      return;
    }
    const startJoyride = () => {
      setRun(true);
      Cookies.set('hasSeenJoyride', 'true', { expires: 365 });
    };
    const waitForElement = setInterval(() => {
      const el = document.querySelector('#first-section-1');
      if (el) {
        clearInterval(waitForElement);
        setTimeout(startJoyride, 300);
      }
    }, 100);

    return () => clearInterval(waitForElement);
  }, [fetchData]);

  return (
    <div className='w-full flex flex-col items-center gap-10 px-4 py-10 md:px-10 md:py-20'>
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
      <Button
        id={targetId}
        ref={targetRef}
        className='w-full md:w-60 py-1 text-white font-poppins font-semibold text-sm md:text-lg bg-[#144B3C] hover:scale-100'
      >
        TDEE Score Record
      </Button>
      {isLoading && (
        <Typography className='text-white'>Loading TDEE data...</Typography>
      )}
      {error && <Typography className='text-red-500'>{error}</Typography>}
      <div id='second-section-2' className='w-full gap-2'>
        <CardBMI
          data={TdeeDisplay}
          loading={isLoading}
          onDelete={deleteTdeeCalculation}
        />
      </div>
      {isClient && (
        <Joyride
          run={run}
          steps={steps}
          showSkipButton={true}
          continuous={true}
          stepIndex={stepIndex}
          spotlightClicks={true}
          styles={{
            options: {
              primaryColor: '#22c55e',
              textColor: '#222',
              backgroundColor: '#fff',
              arrowColor: '#fff',
              overlayColor: 'rgba(0,0,0,0.5)',
              beaconSize: 5
            },
            spotlight: {
              borderRadius: 12,
              boxShadow: '0 0 0 2px #22c55e, 0 0 0 9999px rgba(0,0,0,0.5)',
              padding: 4,
              margin: 4,
              background: 'transparent'
            },
            buttonNext: {
              backgroundColor: '#22c55e', // tombol next hijau
              color: '#fff'
            },
            buttonBack: {
              color: '#22c55e' // tombol back hijau
            },
            buttonSkip: {
              color: '#d33434' // tombol skip merah
            },
            tooltip: {
              borderRadius: '12px',
              padding: '6px',
              fontSize: '16px',
              maxWidth: 'auto',
              width: 'auto'
            }
          }}
          locale={{
            back: 'Kembali',
            close: 'Tutup',
            last: 'Selesai',
            next: 'Lanjut',
            skip: 'Lewati'
          }}
          scrollToFirstStep={true}
          disableScrollParentFix={true}
          callback={(data) => {
            const { index, status, type } = data;
            if (['finished', 'skipped'].includes(status)) {
              setRun(false);
              setStepIndex(0);
              return;
            }
            if (type === 'step:after' || type === 'error:target_not_found') {
              setStepIndex(index + 1);
            }

            if (type === 'step:before') {
              setStepIndex(index);
            }
          }}
        />
      )}
    </div>
  );
};

export default Section2;
