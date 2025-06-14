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

interface Section4Props {
  id?: string;
}

const Section4: React.FC<Section4Props> = ({ id }) => {
  const { push } = useRouter();
  return (
    <div id={id} className='md:w-full md:h-24 h-28 flex flex-col md:justify-end justify-start'>
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
                className='w-full flex justify-between items-center'
              >
                <Typography className='font-normal font-poppins text-center w-full text-white text-[8px] md:text-lg'>
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
