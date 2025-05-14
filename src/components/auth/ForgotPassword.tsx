import { Button, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import Plate from '@/assets/auth/Plate.svg';
import IconList from '@/assets/auth/IconList.svg';
import ForgetPassword from '@/assets/auth/ForgotPassword.svg';
import { TestContext } from 'node:test';

const ForgetPasswordComponent = () => {
  return (
    <div className='w-full min-h-screen flex flex-row'>
      <div className='md:w-1/2 flex flex-col bg-[#132A2E] md:justify-around justify-between items-center md:py-3 py-0'>
        <div className='w-full items-center flex justify-end'>
          <Image src={Plate} alt={Plate} className='md:w-40 w-24' />
        </div>
        <div className='flex flex-col gap-4 items-center md:h-full'>
          <div className='w-full flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-2xl text-xl text-white'>
              Forget Password
            </Typography>
          </div>
          <div className='w-full flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-sm text-xs text-white'>
              Enter the email associated with your account
            </Typography>
          </div>
          <div className='w-full flex flex-col items-center justify-between md:h-44 h-40'>
            <div className='md:w-96 w-72 flex flex-col gap- px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Email
              </label>
              <Input
                type='email'
                name='email'
                placeholder='please insert your email'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden floating-none'
                }}
              />
            </div>
            <div className='flex flex-col md:w-80 w-60 justify-center items-center gap-2 text-center'>
              <Button className='border-none w-full rounded-[25px] bg-[#144B3C]'>
                Reset Password
              </Button>
              <Typography className='font-semibold font-poppins md:text-sm text-[12px] text-white'>
                you will shortly receive an email with further instruction
              </Typography>
            </div>
          </div>
        </div>
        <div className='flex flex-row'>
          <Image className='w-96' src={IconList} alt={IconList} />
        </div>
      </div>
      <div className='md:w-1/2 hidden object-fill md:flex flex-col justify-center'>
        <Image src={ForgetPassword} alt={ForgetPassword} />
      </div>
    </div>
  );
};

export default ForgetPasswordComponent;
