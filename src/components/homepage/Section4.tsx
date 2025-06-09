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
    <div className="md:w-full md:h-24 h-28 flex flex-col md:justify-end justify-start bg-gradient-to-br from-[#E9E3FF] via-[#F8E1F4] to-[#F3F6FF] rounded-2xl shadow-xl p-2">
      <div className="flex flex-row justify-center items-center h-16 gap-2">
        <div className="w-full flex justify-center">
          <Typography className="font-poppins font-bold text-[#6C63FF] uppercase text-2xl md:text-4xl drop-shadow-md">
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
                className="w-full flex justify-between items-center cursor-pointer hover:scale-105 transition-all"
              >
                <Typography className="font-normal font-poppins text-center w-full text-[#FF6CA3] text-[10px] md:text-lg">
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
