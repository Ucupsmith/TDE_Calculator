import Image from 'next/image';
import React from 'react';
import Plate from '@/assets/auth/Plate.svg';
import RightBackground from '@/assets/auth/RightAuthBg.svg';
import IconList from '@/assets/auth/IconList.svg';
import { Button, Input, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import Google from '@/assets/auth/Google.svg';
import Facebook from '@/assets/auth/Facebook.svg';
import { useRouter } from 'next/router';

const RegisterComponent = (): JSX.Element => {
  return (
    <div className='md:w-full md:min-h-screen md:flex md:flex-row w-full'>
      <div className='md:w-1/2 w-full flex flex-col bg-[#132A2E] justify-around '>
        <div className='w-full items-center flex justify-end'>
          <Image src={Plate} alt={Plate} className='md:w-40 w-24' />
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <div className='w-full flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins text-2xl text-white'>
              Sign Up
            </Typography>
          </div>
          <div className='w-full flex flex-col items-center gap-2'>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Name
              </label>
              <Input
                crossOrigin={''}
                type='text'
                name='name'
                placeholder='please insert your name'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden floating-none'
                }}
              />
            </div>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Email
              </label>
              <Input
                crossOrigin={''}
                type='email'
                name='email'
                placeholder='please insert your email'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden'
                }}
              />
            </div>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Number Phone
              </label>
              <Input
                type='number'
                name='number phone'
                placeholder='please insert your number phone'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden'
                }}
                crossOrigin={''}
              />
            </div>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Password
              </label>
              <Input
                crossOrigin={''}
                type='password'
                name='password'
                placeholder='please insert a password'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden'
                }}
              />
            </div>
            <div className='md:w-1/2 w-full flex justify-center'>
              <Link href={'/auth/forget-password'}>
                <Typography className='font-semibold font-poppins text-sm text-white'>
                  Forgot Password?
                </Typography>
              </Link>
            </div>
            <div className='md:w-80 w-60 flex flex-col items-center gap-2'>
              <Button className='border-none w-full rounded-[25px] bg-[#144B3C]'>
                Sign Up Now
              </Button>
              <Typography className='font-semibold font-poppins text-[12px] text-white'>
                or
              </Typography>
              <Typography className='font-semibold font-poppins text-[12px] text-white'>
                Sign Up With
              </Typography>
              <div className='flex flex-col items-center'>
                <div className='flex flex-row justify-center gap-1'>
                  <Image src={Google} alt={Google} className='cursor-pointer' />
                  <Image
                    className='cursor-pointer'
                    src={Facebook}
                    alt={Facebook}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row'>
            <Image className='w-96' src={IconList} alt={IconList} />
          </div>
        </div>
      </div>
      <div className='md:w-1/2 object-fill md:flex md:flex-col hidden justify-center'>
        <Image src={RightBackground} alt={RightBackground} />
      </div>
    </div>
  );
};

export default RegisterComponent;
