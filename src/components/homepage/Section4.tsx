import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface IconProps {
  label: string;
  navigate: string;
}

const label: IconProps[] = [
  {
    label: 'Tdee Calculator',
    navigate: '/tdee-calculator'
  },
  {
    label: 'Meal Plan',
    navigate: '/meal-plan'
  },
  {
    label: 'Article',
    navigate: '/article'
  }
];

const Section4: React.FC = () => {
  const { push } = useRouter();
  return (
    <div className='hidden md:w-full'>
      <div className='flex flex-row justify-center items-center h-16'>
        <div className='w-full flex justify-center'>
          <Typography className='font-poppins font-bold text-[#34D399] uppercase text-2xl md:text-4xl'>
            tdee
          </Typography>
        </div>
        {label !== null &&
          label.map((item, id: number) => {
            return (
              <div
                key={id}
                onClick={async () => {
                  push(item.navigate);
                }}
                className='w-full flex justify-start items-center '
              >
                <Typography className='font-normal font-poppins text-white text-[8px] md:text-lg'>
                  {item.label}
                </Typography>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Section4;
