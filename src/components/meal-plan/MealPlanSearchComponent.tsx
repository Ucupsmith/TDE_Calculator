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
          <div className='w-10 bg-transparent border border-green-500 rounded-l-lg border-r-0 flex items-center justify-center'>
            <Image
              src={SearchIcon}
              alt={String(SearchIcon)}
              className='w-10 h-8'
            />
          </div>
          <input
            type='text'
            className='w-40 border border-green-500 rounded-r-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none focus:bg-green-300 text-white shadow-lg duration-100 transition-all h-10 bg-[#132A2E]'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          <Button
            onClick={handleSubmitFoods}
            className='w-16 rounded-lg mx-2 text-white shadow-lg bg-green-500 text-center text-[10px] flex items-center justify-center'
          >
            submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanSearchComponent;
