import { Button, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';
import Plate from '@/assets/auth/Plate.svg';
import IconList from '@/assets/auth/IconList.svg';
import ForgetPassword from '@/assets/auth/ForgotPassword.svg';
import { TestContext } from 'node:test';
import { useAuthForgotPassword, ForgotAuthType } from '@/hooks/useAuthForgot';
import { requestPasswordReset } from '@/repository/auth.repository';

const ForgetPasswordComponent = () => {
  const valueOption = ['+62', '+61', '+60'];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useAuthForgotPassword();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: ForgotAuthType) => {
    setIsLoading(true);
    setMessage(null);
    setIsError(false);
    try {
      await requestPasswordReset(data.email);
      setMessage('Link reset password telah dikirim ke email Anda.');
      setIsError(false);
      reset();
    } catch (error: any) {
      console.error('Password reset request failed:', error);
      setMessage(error.response?.data?.message || 'Terjadi kesalahan saat memproses permintaan Anda.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex flex-row'>
      <div className='md:w-1/2 flex flex-col bg-[#132A2E] md:justify-between items-center md:py-3 py-0'>
        <div className='w-full items-center flex justify-end'>
          <Image src={Plate} alt={Plate} className='md:w-40 w-24' />
        </div>
        <div className='flex flex-col h-96 gap-4 items-center md:gap-10 justify-between md:justify-center md:h-full'>
          <div className='flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-2xl text-xl text-white'>
              Forget Password
            </Typography>
          </div>
          <div className='flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-sm text-xs text-white'>
              Enter the email associated with your account
            </Typography>
          </div>
          <div className='w-full flex flex-col items-center justify-between h-60'>
            <div className='md:w-96 w-72 flex flex-col px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Email
              </label>
              <Input
                type='email'
                placeholder='please insert your email'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden floating-none'
                }}
                crossOrigin={''}
                {...register('email')}
              />
            </div>
            <div className='md:w-96 w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Number Phone
              </label>
              <div className='flex flex-row w-full justify-center md:justify-start'>
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
                <div className='flex flex-col gap-1'>
                  <input
                    type='text'
                    placeholder='please insert your number phone'
                    className='bg-white focus:outline-none shadow-sm px-3 py-2 focus:ring-2 md:w-[300px] h-9 rounded-lg rounded-l-none ring-white focus:border-white w-full text-sm md:text-[13px]'
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
            <div className='flex flex-col md:w-80 w-60 justify-center items-center gap-2 text-center'>
              <Button onClick={handleSubmit(onSubmit)} className='border-none w-full rounded-[25px] bg-[#144B3C]' disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Reset Password'}
              </Button>
              {message && (
                <Typography className={`font-semibold font-poppins md:text-sm text-[12px] ${isError ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className='flex h-48 md:h-auto flex-col justify-end'>
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
