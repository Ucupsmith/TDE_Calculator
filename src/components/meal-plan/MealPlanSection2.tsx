import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

interface CustomInput {
  imagemeal: string;
  customeal: string;
  mealkalori: string;
  amountmeal: number;
}
const MealPlanSection2 = () => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [formInput, setFormInput] = useState<CustomInput>({
    imagemeal: '',
    customeal: '',
    mealkalori: '',
    amountmeal: 0
  });
  const { imagemeal, customeal, mealkalori, amountmeal } = formInput;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleClickCustom = () => {
    setButtonClicked(!buttonClicked);
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count > 0 ? count - 1 : 0);
  };
  return (
    <div className='flex flex-col gap-2 w-full items-start justify-between px-2'>
      <Typography className='font-poppins font-semibold text-lg md:text-2xl text-green-500 capitalize'>
        custom personal meal
      </Typography>
      <Button
        onClick={handleClickCustom}
        className='border rounded-xl border-green-500 py-3 px-2 w-32 h-15 md:w-40 bg-[#132A2E] text-sm md:text-lg  text-green-500'
      >
        {buttonClicked ? '- close meal' : '+ add meal'}
      </Button>
      {buttonClicked && (
        <Card className='w-full border border-green-500 rounded-xl'>
          <CardBody className='flex flex-col items-center justify-between py-3 px-2 bg-[#132A2E] gap-3'>
            <div className='flex flex-col gap-2 w-full'>
              <label className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                custom meal image
              </label>
              <input
                name='avatar'
                value={imagemeal}
                onChange={handleOnChange}
                type='file'
                className='border flex items-center justify-center text-center border-green-500 rounded-xl bg-[#132A2E] w-full h-10 text-white px-3 py-2 focus:border-2 focus:border-green-500 '
                placeholder='custom meal'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                custom meal
              </label>
              <input
                name='customeal'
                value={customeal}
                onChange={handleOnChange}
                type='text'
                className='border border-green-500 rounded-xl bg-[#132A2E] w-full h-10 text-white px-3 py-2'
                placeholder='custom meal'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                meal kalori
              </label>
              <input
                name='mealkalori'
                value={mealkalori}
                onChange={handleOnChange}
                type='text'
                className='border border-green-500 rounded-xl bg-[#132A2E] w-full h-10 text-white px-3 py-2'
                placeholder='custom meal'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label className='text-green-500 font-poppins font-normal text-lg md:text-xl capitalize'>
                amount meal
              </label>
              <div className='flex flex-row w-full gap-2 justify-between items-center'>
                <div
                  onClick={handleDecrement}
                  className='border flex items-center justify-center border-green-500 rounded-full w-7 h-5 text-red-900'
                >
                  -
                </div>
                <input
                  name='amountmeal'
                  type='number'
                  onChange={handleOnChange}
                  value={amountmeal}
                  className='border border-green-500 rounded-xl bg-[#132A2E] w-full h-10 text-white px-3 py-2 text-center'
                />
                <div
                  onClick={handleIncrement}
                  className='border flex items-center justify-center border-green-500 rounded-full w-7 h-5 text-green-500'
                >
                  +
                </div>
              </div>
              <div className='w-full justify-center flex flex-col items-center py-3'>
                <Button className='border border-green-500 rounded-xl bg-green-500 w-40 h-10 text-white px-3 py-2 capitalize'>
                  save
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MealPlanSection2;
