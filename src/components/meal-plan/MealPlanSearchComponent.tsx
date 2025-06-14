import React from 'react';
import SearchIcon from '@/assets/mealplan/SearchIcon-removebg-preview.png';
import Image from 'next/image';
import { Button } from '@material-tailwind/react';

interface SearchProps {
  value: any;
  onChange: (value: string) => void;
  placeholder: string;
  onSubmit: () => void;
}

const MealPlanSearchComponent: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder,
  onSubmit
}) => {
  const handleSubmitFoods = async () => {
    await onSubmit();
  };
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <label className='font-poppins font-normal text-sm md:text-lg text-white capitalize'>
          search your food
        </label>
        <div className='flex flex-row gap-0'>
          <input type='search' className='sr-only' />
          <div className='w-10 bg-transparent border border-green-500 rounded-l-lg border-r-0 flex items-center justify-center shadow-md shadow-green-500 h-10'>
            <Image
              src={SearchIcon}
              alt={String(SearchIcon)}
              className='w-10 h-8'
            />
          </div>
          <div className='flex flex-row items-center justify-center gap-0'>
            <input
              type='text'
              className='w-40 md:w-56 border border-green-500 rounded-r-none px-3 py-2 focus:ring-green-500 focus:outline-none focus:bg-green-300 text-white duration-100 transition-all h-10 bg-[#132A2E] shadow-md shadow-green-700 focus:ring-1'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
            />
            <Button
              onClick={handleSubmitFoods}
              className='w-14 h-10 border border-green-500 rounded-r-xl rounded-l-none text-white text-opacity-90 bg-[#132A2E] text-center text-[10px] flex items-center justify-center shadow-md shadow-green-700'
            >
              search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanSearchComponent;
