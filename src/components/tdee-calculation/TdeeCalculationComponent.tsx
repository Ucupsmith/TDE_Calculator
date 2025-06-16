import { SaveTdeeCalculationInterface } from '@/pages/tdee-calculator';
import { saveTdeeCalculation } from '@/repository/tdee.repository';
import {
  Button,
  Card,
  CardBody,
  Typography,
  Tooltip
} from '@material-tailwind/react';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaInfoCircle,
  FaFire,
  FaDumbbell,
  FaWeight,
  FaHeartbeat,
  FaRocket
} from 'react-icons/fa';

interface TdeeProps {
  onClick: boolean;
  onClose: () => void;
  bmi: number;
  bmiCategory: string;
  bmr?: string;
  tdee: number;
  goal?: string;
  onSubmit: () => void;
  onSave: () => void;
  loading: boolean;
}

const TdeeCalculationComponent: React.FC<TdeeProps> = ({
  bmi,
  tdee,
  bmiCategory,
  goal,
  onClick,
  onClose,
  onSubmit,
  onSave,
  loading = false
}) => {
  const [showModalSuccess, setShowModalSucces] = useState<boolean>(false);
  const [animatedTdee, setAnimatedTdee] = useState(0);
  const [animatedBmi, setAnimatedBmi] = useState(0);
  const [showTdeeTooltip, setShowTdeeTooltip] = useState(false);
  const [showBmiTooltip, setShowBmiTooltip] = useState(false);
  const [showBmiDetails, setShowBmiDetails] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to results when the component receives new TDEE data
  useEffect(() => {
    if (tdee > 0 && resultsSectionRef.current) {
      setTimeout(() => {
        const element = resultsSectionRef.current;
        if (element) {
          const yOffset = -20; // Adjust this value to control how much further to scroll
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [tdee]);

  // Animate TDEE number
  useEffect(() => {
    if (tdee > 0) {
      const duration = 2000;
      const step = Math.max(1, Math.ceil(tdee / (duration / 16)));

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= tdee) {
          current = tdee;
          clearInterval(timer);
        }
        setAnimatedTdee(Math.floor(current));
      }, 16);

      return () => clearInterval(timer);
    }
  }, [tdee]);

  // Animate BMI number
  useEffect(() => {
    if (bmi > 0) {
      const duration = 1500;
      const step = bmi / (duration / 16);

      let current = 0;
      const timer = setInterval(() => {
        current = Number(current) + Number(step);
        if (current >= bmi) {
          current = bmi;
          clearInterval(timer);
        }
        setAnimatedBmi(Number(Number(current).toFixed(1)));
      }, 16);

      return () => clearInterval(timer);
    } else {
      setAnimatedBmi(0);
    }
  }, [bmi]);
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Dapatkan posisi tombol yang diklik
      const buttonRect = (e.target as HTMLElement).getBoundingClientRect();
      setRocketPosition({
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + window.scrollY
      });

      setShowRocket(true);
      setIsCalculating(true);

      // Jalankan onSubmit yang diberikan dari parent
      await onSubmit();

      // Tunggu animasi roket selesai (1.5 detik)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Highlight dan scroll akan ditangani oleh useEffect
      setShowRocket(false);
      setIsCalculating(false);
    } catch (error) {
      console.error('Failed to submit:', error);
      setShowRocket(false);
      setIsCalculating(false);
    }
  };
  const handleSave = async () => {
    try {
      await onSave();
      setShowModalSucces(true);
    } catch (error) {
      console.error('Failed to save TDEE:', error);
    }
  };
  return (
    <div className='w-full pt-4 md:pt-6 scroll-mt-24'>
      {!loading ? (
        <div
          ref={resultsSectionRef}
          className='w-full transition-all duration-300 mt-4 scroll-mt-24'
        >
          {showRocket && (
            <motion.div
              className='fixed z-50 pointer-events-none'
              style={{
                left: `${rocketPosition.x}px`,
                top: `${rocketPosition.y}px`,
                transform: 'translate(-50%, -50%) rotate(45deg)'
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: -window.innerHeight * 0.8,
                opacity: 0,
                scale: [1, 1.5, 1]
              }}
              transition={{
                y: {
                  duration: 1.5,
                  ease: [0.2, 0.8, 0.2, 1]
                },
                opacity: {
                  duration: 1.5,
                  ease: [0.2, 0.8, 0.2, 1]
                },
                scale: {
                  duration: 0.5,
                  times: [0, 0.2, 1]
                }
              }}
            >
              <FaRocket className='text-4xl text-yellow-400' />
              <motion.div
                className='absolute -bottom-8 left-1/2 w-1 h-16 bg-gradient-to-t from-yellow-400 to-transparent'
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0.5 }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          )}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col w-full md:h-auto h-auto gap-6 py-4'
        >
          {goal && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className='flex w-full items-center justify-center bg-[#1a3a3f] py-2 rounded-lg mx-auto max-w-md'
            >
              <Typography className='font-poppins font-semibold text-white text-sm md:text-lg flex items-center gap-2'>
                <span>Your Goal:</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  goal === 'LoseWeight' 
                    ? 'bg-red-900/50 text-red-300' 
                    : goal === 'GainWeight' 
                      ? 'bg-blue-900/50 text-blue-300' 
                      : 'bg-green-900/50 text-green-300'
                }`}>
                  {goal === 'LoseWeight'
                    ? 'Lose Weight 🔥'
                    : goal === 'MaintainWeight'
                      ? 'Maintain Weight ⚖️'
                      : 'Gain Weight 💪'}
                </span>
              </Typography>
            </motion.div>
          )}
          
          <div className='flex flex-col md:flex-row w-full px-3 gap-6 md:gap-8'>
            {/* TDEE Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className='w-full md:w-1/2 flex flex-col items-center gap-4'
            >
              <div className='flex items-center gap-2'>
                <Typography className='font-poppins font-semibold text-white text-lg md:text-2xl capitalize'>
                  Your TDEE Score
                </Typography>
                <div 
                  onMouseEnter={() => setShowTdeeTooltip(true)}
                  onMouseLeave={() => setShowTdeeTooltip(false)}
                  className='relative'
                >
                  <FaInfoCircle className='text-[#34D399] hover:text-[#2bbd8c] cursor-pointer transition-colors duration-200' />
                  <AnimatePresence>
                    {showTdeeTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className='absolute z-10 w-64 p-3 text-sm bg-gray-800 text-gray-100 rounded-lg shadow-lg -left-32 top-6'
                      >
                        Total Daily Energy Expenditure (TDEE) adalah total kalori yang Anda bakar dalam sehari, termasuk aktivitas fisik dan metabolisme dasar.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSubmit}
                className='w-full max-w-md cursor-pointer'
              >
                <Card className='w-full h-40 md:h-56 rounded-2xl bg-[#132A2E] border-2 border-green-500 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300'>
                  <CardBody className='h-full flex flex-col items-center justify-center p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FaFire className='text-yellow-500 text-2xl' />
                      <Typography className='font-bold font-poppins text-4xl md:text-5xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent'>
                        {Math.floor(goal === 'LoseWeight' 
                          ? tdee - 500 
                          : goal === 'GainWeight' 
                            ? tdee + 300 
                            : tdee
                        ).toLocaleString('id-ID')}
                      </Typography>
                    </div>
                    <Typography className='font-medium font-poppins text-green-300 text-sm md:text-base'>
                      calories per day
                    </Typography>
                    <div className='mt-4 w-full max-w-xs'>
                      <div className='h-2 bg-gray-700 rounded-full overflow-hidden'>
                        <motion.div 
                          className='h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full'
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='w-full max-w-md bg-[#1a3a3f] p-4 md:p-6 rounded-lg border border-gray-700 mt-2 md:mt-0'
              >
                <Typography className='font-poppins text-gray-200 text-sm md:text-base text-center leading-relaxed px-2'>
                  Untuk {goal === 'LoseWeight' ? 'menurunkan' : goal === 'GainWeight' ? 'menaikkan' : 'mempertahankan'} berat badan, konsumsilah sekitar
                  <span className='font-bold text-green-400'>
                    {' '}
                    {goal === 'LoseWeight' 
                      ? Math.floor(tdee - 500).toLocaleString('id-ID')
                      : goal === 'GainWeight' 
                        ? Math.floor(tdee + 300).toLocaleString('id-ID')
                        : Math.floor(tdee).toLocaleString('id-ID')}
                  </span>
                  {' '}kalori per hari.
                </Typography>
              </motion.div>
            </motion.div>
            {/* BMI Card */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className='w-full md:w-1/2 flex flex-col items-center gap-4'
            >
              <div className='flex items-center gap-2'>
                <Typography className='font-poppins font-semibold text-white text-lg md:text-2xl capitalize'>
                  Your BMI Score
                </Typography>
                <div 
                  onMouseEnter={() => setShowBmiTooltip(true)}
                  onMouseLeave={() => setShowBmiTooltip(false)}
                  className='relative'
                >
                  <FaInfoCircle className='text-blue-400 cursor-help' />
                  <AnimatePresence>
                    {showBmiTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className='absolute z-10 w-72 p-3 text-sm bg-gray-800 text-gray-100 rounded-lg shadow-lg -left-36 top-6'
                      >
                        <p className='font-semibold mb-1'>Body Mass Index (BMI)</p>
                        <p className='text-xs'>Indeks massa tubuh (IMT) adalah pengukuran yang menggunakan tinggi dan berat badan untuk memperkirakan jumlah lemak tubuh.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col w-full md:h-auto h-auto gap-6 py-4'
          >
            {goal && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                className='flex w-full items-center justify-center bg-[#1a3a3f] py-2 rounded-lg mx-auto max-w-md'
              >
                <Typography className='font-poppins font-semibold text-white text-sm md:text-lg flex items-center gap-2'>
                  <span>Your Goal:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      goal === 'LoseWeight'
                        ? 'bg-red-900/50 text-red-300'
                        : goal === 'GainWeight'
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-green-900/50 text-green-300'
                    }`}
                  >
                    {goal === 'LoseWeight'
                      ? 'Lose Weight 🔥'
                      : goal === 'MaintainWeight'
                        ? 'Maintain Weight ⚖️'
                        : 'Gain Weight 💪'}
                  </span>
                </Typography>
              </motion.div>
            )}

            <div className='flex flex-col md:flex-row w-full px-3 gap-6 md:gap-8'>
              {/* TDEE Card */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className='w-full md:w-1/2 flex flex-col items-center gap-4'
              >
                <div className='flex items-center gap-2 relative'>
                  <Typography className='font-poppins font-semibold text-white text-lg md:text-2xl capitalize'>
                    Your TDEE Score
                  </Typography>
                  <div
                    onMouseEnter={() => setShowTdeeTooltip(true)}
                    onMouseLeave={() => setShowTdeeTooltip(false)}
                  >
                    <FaInfoCircle className='text-[#34D399] hover:text-[#2bbd8c] cursor-pointer transition-colors duration-200' />
                    <AnimatePresence>
                      {showTdeeTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className='absolute z-10 w-64 p-3 text-sm bg-gray-800 text-gray-100 rounded-lg shadow-lg -left-10 top-6'
                        >
                          Total Daily Energy Expenditure (TDEE) adalah total
                          kalori yang Anda bakar dalam sehari, termasuk
                          aktivitas fisik dan metabolisme dasar.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubmit}
                  className='w-full max-w-md cursor-pointer'
                >
                  <Card className='w-full h-40 md:h-56 rounded-2xl bg-[#132A2E] border-2 border-green-500 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300'>
                    <CardBody className='h-full flex flex-col items-center justify-center p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <FaFire className='text-yellow-500 text-2xl' />
                        <Typography className='font-bold font-poppins text-4xl md:text-5xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent'>
                          {Math.ceil(tdee).toLocaleString('id-ID')}
                        </Typography>
                      </div>
                      <Typography className='font-medium font-poppins text-green-300 text-sm md:text-base'>
                        calories per day
                      </Typography>
                      <div className='mt-4 w-full max-w-xs'>
                        <div className='h-2 bg-gray-700 rounded-full overflow-hidden'>
                          <motion.div
                            className='h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full'
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className='w-full max-w-md bg-[#1a3a3f] p-4 md:p-6 rounded-lg border border-gray-700 mt-2 md:mt-0'
                >
                  <Typography className='font-poppins text-gray-200 text-sm md:text-base text-center leading-relaxed px-2'>
                    Untuk{' '}
                    {goal === 'LoseWeight'
                      ? 'menurunkan'
                      : goal === 'GainWeight'
                        ? 'menaikkan'
                        : 'mempertahankan'}{' '}
                    berat badan, konsumsilah sekitar
                    <span className='font-bold text-green-400'>
                      {' '}
                      {tdee.toLocaleString('id-ID') === 'LoseWeight'
                        ? Math.ceil(tdee - 500).toLocaleString('id-ID')
                        : tdee.toLocaleString('id-ID') === 'GainWeight'
                          ? Math.ceil(tdee + 300).toLocaleString('id-ID')
                          : Math.ceil(tdee).toLocaleString('id-ID')}
                    </span>{' '}
                    kalori per hari.
                  </Typography>
                </motion.div>
              </motion.div>
              {/* BMI Card */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className='w-full md:w-1/2 flex flex-col items-center gap-4'
              >
                <div className='flex items-center gap-2 relative'>
                  <Typography className='font-poppins font-semibold text-white text-lg md:text-2xl capitalize'>
                    Your BMI Score
                  </Typography>
                  <div
                    onMouseEnter={() => setShowBmiTooltip(true)}
                    onMouseLeave={() => setShowBmiTooltip(false)}
                  >
                    <FaInfoCircle className='text-blue-400 cursor-help' />
                    <AnimatePresence>
                      {showBmiTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className='absolute z-10 w-72 p-3 text-sm bg-gray-800 text-gray-100 rounded-lg shadow-lg -left-16 right-0 top-6'
                        >
                          <p className='font-semibold mb-1'>
                            Body Mass Index (BMI)
                          </p>
                          <p className='text-xs'>
                            Indeks massa tubuh (IMT) adalah pengukuran yang
                            menggunakan tinggi dan berat badan untuk
                            memperkirakan jumlah lemak tubuh.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full max-w-md cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBmiDetails(!showBmiDetails);
                  }}
                >
                  <Card
                    className={`w-full h-40 md:h-56 rounded-2xl bg-[#132A2E] border-2 ${
                      bmi < 18.5
                        ? 'border-yellow-300 shadow-lg shadow-yellow-300/30 hover:shadow-yellow-300/50'
                        : bmi <= 23.9
                          ? 'border-green-400 shadow-lg shadow-green-400/30 hover:shadow-green-400/50'
                          : bmi <= 24.9
                            ? 'border-yellow-600 shadow-lg shadow-yellow-600/30 hover:shadow-yellow-600/50'
                            : bmi <= 29.9
                              ? 'border-yellow-700 shadow-lg shadow-yellow-700/30 hover:shadow-yellow-700/50'
                              : 'border-red-600 shadow-lg shadow-red-600/30 hover:shadow-red-600/50'
                    } transition-all duration-300`}
                  >
                    <CardBody className='h-full flex flex-col items-center justify-center p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        {bmi < 18.5 ? (
                          <FaWeight className='text-yellow-300 text-2xl' />
                        ) : bmi <= 23.9 ? (
                          <FaHeartbeat className='text-green-400 text-2xl' />
                        ) : (
                          <FaDumbbell
                            className={
                              bmi <= 24.9
                                ? 'text-yellow-600'
                                : bmi <= 29.9
                                  ? 'text-yellow-700'
                                  : 'text-red-600'
                            }
                          />
                        )}
                        <Typography
                          className={`font-bold font-poppins text-4xl md:text-5xl ${
                            bmi < 18.5
                              ? 'text-yellow-300'
                              : bmi <= 23.9
                                ? 'text-green-400'
                                : bmi <= 24.9
                                  ? 'text-yellow-600'
                                  : bmi <= 29.9
                                    ? 'text-yellow-700'
                                    : 'text-red-600'
                          }`}
                        >
                          {animatedBmi.toFixed(1).replace('.', ',')}
                        </Typography>
                      </div>
                      <Typography
                        className={`font-semibold font-poppins text-lg ${
                          bmi < 18.5
                            ? 'text-yellow-300'
                            : bmi <= 23.9
                              ? 'text-green-400'
                              : bmi <= 24.9
                                ? 'text-yellow-600'
                                : bmi <= 29.9
                                  ? 'text-yellow-700'
                                  : 'text-red-600'
                        }`}
                      >
                        {bmiCategory}
                      </Typography>

                      {/* BMI Scale */}
                      <div className='mt-4 w-full max-w-xs'>
                        <div className='flex justify-between text-xs text-gray-400 mb-1'>
                          <span>Underweight</span>
                          <span>Normal</span>
                          <span>Overweight</span>
                          <span>Obese</span>
                        </div>
                        <div className='h-2 bg-gray-700 rounded-full overflow-hidden relative'>
                          <div className='absolute inset-0 flex'>
                            <div className='h-full w-1/4 bg-yellow-300/30'></div>
                            <div className='h-full w-1/4 bg-green-400/30'></div>
                            <div className='h-full w-1/4 bg-yellow-600/30'></div>
                            <div className='h-full w-1/4 bg-red-600/30'></div>
                          </div>
                          <motion.div
                            className='h-full rounded-full absolute top-0 left-0 w-1 bg-transparent border-2 border-white'
                            initial={{ left: '0%' }}
                            animate={{
                              left: `${Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100))}%`,
                              color:
                                bmi < 18.5
                                  ? '#fde047' // yellow-300
                                  : bmi <= 23.9
                                    ? '#4ade80' // green-400
                                    : bmi <= 24.9
                                      ? '#ca8a04' // yellow-600
                                      : bmi <= 29.9
                                        ? '#a16207' // yellow-700
                                        : '#dc2626' // red-600
                            }}
                            transition={{ duration: 1, delay: 0.5 }}
                          >
                            <div className='absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-current'></div>
                          </motion.div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className='w-full max-w-md bg-[#1a3a3f] p-4 md:p-6 rounded-lg border border-gray-700 mt-2 mb-20 md:mt-0'
                  onClick={(e) => e.stopPropagation()}
                >
                  <Typography className='font-poppins text-gray-200 text-sm md:text-base text-center'>
                    {bmi < 18.5
                      ? 'Berat badan kamu di bawah normal. Tingkatkan asupan nutrisi dan konsultasikan dengan ahli gizi.'
                      : bmi <= 23.9
                        ? 'Berat badan kamu ideal! Pertahankan pola makan seimbang dan rutin berolahraga.'
                        : bmi <= 24.9
                          ? 'Berat badan kamu mendekati batas atas. Tetap jaga pola makan dan tingkatkan aktivitas fisik.'
                          : bmi <= 29.9
                            ? 'Kamu dalam kategori Overweight. Mulai program penurunan berat badan dengan pola makan sehat.'
                            : 'Disarankan berkonsultasi dengan ahli gizi untuk program penurunan berat badan yang aman.'}
                  </Typography>

                  <AnimatePresence>
                    {showBmiDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          marginTop: '0.75rem'
                        }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className='overflow-hidden'
                      >
                        <div className='pt-3 border-t border-gray-600 mt-3'>
                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm'>
                            <div className='flex items-center gap-1'>
                              <div className='w-3 h-3 bg-yellow-300/30 rounded-sm'></div>{' '}
                              Underweight: &lt;18.5
                            </div>
                            <div className='flex items-center gap-1'>
                              <div className='w-3 h-3 bg-green-400/30 rounded-sm'></div>{' '}
                              Normal: 18.5-23.9
                            </div>
                            <div className='flex items-center gap-1'>
                              <div className='w-3 h-3 bg-yellow-600/30 rounded-sm'></div>{' '}
                              Overweight: 24-27
                            </div>
                            <div className='flex items-center gap-1'>
                              <div className='w-3 h-3 bg-red-600/30 rounded-sm'></div>{' '}
                              Obese: &gt;27
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>
            {onClick && (
              <div className='flex flex-col items-center justify-end bg-[#132A2E] bg-opacity-0 rounded-xl fixed inset-0 z-10'>
                <div className='flex items-center justify-center flex-col w-60 md:w-96 inset-10 bg-opacity-50 h-40 bg-black gap-2 border border-green-500 rounded-xl'>
                  <Typography className='font-poppins font-semibold text-white text-xs md:text-lg'>
                    Would You Like To Save Your Tdee?
                  </Typography>
                  <div className='flex flex-row gap-3'>
                    <Button
                      onClick={onClose}
                      className='bg-red-800 w-20 h-6 flex justify-center items-center py-2'
                    >
                      no
                    </Button>
                    <Button
                      onClick={async () => {
                        await handleSave();
                        onClose();
                      }}
                      className='bg-green-800 w-20 h-6 flex justify-center items-center py-2'
                    >
                      yes
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {showModalSuccess && (
              <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white rounded-lg p-6 flex flex-col items-center justify-center gap-3'>
                  <div className='text-green-600 text-4xl'>✓</div>
                  <Typography className='text-gray-800 font-semibold'>
                    TDEE successfully saved!
                  </Typography>
                  <Button
                    onClick={() => setShowModalSucces(false)}
                    className='bg-green-700 text-white px-4 py-1 rounded'
                  >
                    OK
                  </Button>
                  <Link
                    href={'/homepage'}
                    className='font-poppins font-normal underline text-blue-700 text-xs md:text-lg'
                  >
                    see the result!
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        loading
      )}
    </div>
  );
};

export default TdeeCalculationComponent;
