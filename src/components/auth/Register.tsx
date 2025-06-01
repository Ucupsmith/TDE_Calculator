import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Plate from '@/assets/auth/Plate.svg';
import RightBackground from '@/assets/auth/RightAuthBg.svg';
import IconList from '@/assets/auth/IconList.svg';
import { Button, Input, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import Google from '@/assets/auth/Google.svg';
import Facebook from '@/assets/auth/Facebook.svg';
import { useRouter } from 'next/router';
import { AsyncCallbackSet } from 'next/dist/server/lib/async-callback-set';
import { useAuthRegister } from '@/hooks/useAuthRegist';
import { registerUser } from '@/repository/auth.repository';
import Checklist from '@/assets/auth/checklist.png';
import ErrorAlert from '@/assets/auth/error-alert-button-symbol.png';
import { number } from 'zod';

interface RegisterProps {
  username: string;
  number_phone: string;
  select_number: string;
  password: string;
  email: string;
}
const valueOption = ['+62', '+61', '+60'];

const RegisterComponent = (): JSX.Element => {
  const { push } = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredUser, setIsRegisteredUser] = useState<RegisterProps | null>(
    null
  );
  const [isRegist, setIsRegist] = useState<RegisterProps | boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useAuthRegister();
  useEffect(() => {
    if (registeredUser !== null) {
      const timer = setTimeout(() => {
        setIsRegisteredUser(registeredUser);
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (registeredUser !== isRegist) {
      setIsRegist(!isRegist);
      setIsRegisteredUser(registeredUser);
    }
  }, []);
  const fetchDataRegist = async (data: RegisterProps): Promise<void> => {
    try {
      setIsloading(!isLoading);
      setError(error);
      const response = await registerUser({
        username: data.username,
        number_phone: `${data.select_number}${data.number_phone}`,
        email: data.email,
        password: data.password
      });
      console.log(response);
      if (response !== null) {
        setIsRegisteredUser(response);
      }
      reset();
    } catch (error: any) {
      console.log(`fetch Data Error : ${error}`);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        console.log('Axios error response:', status, message);
        if (status === 400 && message === 'Email Already Exist!') {
          setIsRegist(false);
          setIsRegisteredUser(null);
          return;
        }
      }
    } finally {
      setIsloading(false);
    }
  };
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
                Username
              </label>
              <div className='flex flex-col gap-1'>
                <Input
                  crossOrigin={''}
                  type='text'
                  placeholder='please insert your name'
                  className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                  labelProps={{
                    className: 'hidden floating-none'
                  }}
                  {...register('username')}
                />
                {errors.username && (
                  <Typography className='font-poppins font-normal text-sm md:text-lg text-red-900'>
                    {errors.username.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Email
              </label>
              <div className='flex flex-col gap-1'>
                <Input
                  crossOrigin={''}
                  type='email'
                  placeholder='please insert your email'
                  className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                  labelProps={{
                    className: 'hidden'
                  }}
                  {...register('email')}
                />
                {errors.email && (
                  <Typography className='font-poppins font-normal text-sm md:text-lg text-red-900'>
                    {errors.email.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Number Phone
              </label>
              <div className='flex flex-row w-full md:w-96 justify-center md:justify-start'>
                <select
                  className='border border-none rounded-lg bg-white focus:outline-none rounded-r-none shadow-sm w-16 md:w-16 h-9 focus:ring-2 ring-white focus:border-white text-center'
                  {...register('select_number')}
                >
                  {valueOption.map((value, id: number) => (
                    <option
                      key={id}
                      value={value}
                      className='hover:bg-gray-600 text-start md:text-center bg-green-900 border focus:bg-green-900 focus-visible:w-10'
                    >
                      {value}
                    </option>
                  ))}
                </select>
                <div className='flex flex-col w-full gap-1'>
                  <input
                    type='text'
                    placeholder='please insert your number phone'
                    className='bg-white focus:outline-none shadow-sm px-3 py-2 focus:ring-2 md:w-[77%] h-9 rounded-lg rounded-l-none ring-white focus:border-white w-full text-sm md:text-[13px]'
                    {...register('number_phone')}
                  />
                  {errors.number_phone && (
                    <Typography className='font-poppins font-normal text-sm md:text-lg text-red-900'>
                      {errors.number_phone.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Password
              </label>
              <div className='flex flex-col gap-1'>
                <Input
                  crossOrigin={''}
                  type='password'
                  placeholder='please insert a password'
                  className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                  labelProps={{
                    className: 'hidden'
                  }}
                  {...register('password')}
                />
                {errors.password && (
                  <Typography className='font-poppins font-normal text-sm md:text-lg text-red-900'>
                    {errors.password.message}
                  </Typography>
                )}
              </div>
            </div>
            
            <div className='md:w-80 w-60 flex flex-col items-center gap-2'>
              <Button
                onClick={async () => {
                  await handleSubmit(fetchDataRegist)();
                }}
                className='border-none w-full rounded-[25px] bg-[#144B3C]'
              >
                {!isLoading ? 'Sign Up Now' : 'Sign up ...'}
              </Button>
              {!isLoading && registeredUser && (
                <div className='flex flex-row gap-1 w-44 md:w-72 h-14 rounded-md border border-none bg-white items-center justify-center'>
                  <Image src={Checklist} alt={''} className='w-6' />
                  <Typography className='font-poppins font-semibold text-sm text-center md:text-lg'>
                    Account Created Successful!
                  </Typography>
                </div>
              )}
              {!isRegist && (
                <div className='flex flex-row gap-1 w-44 md:w-72 h-14 rounded-md border border-none bg-white items-center justify-center'>
                  <Typography className='font-poppins font-semibold text-sm text-center md:text-lg'>
                    Account Already Exist!
                  </Typography>
                </div>
              )}
              {registeredUser && (
                <Typography className='text-sm md:text-lg text-blue-800 underline'>
                  Login here!
                </Typography>
              )}
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
