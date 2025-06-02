import { Button, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';
import Plate from '@/assets/auth/Plate.svg';
import IconList from '@/assets/auth/IconList.svg';
import ForgetPasswordImage from '@/assets/auth/ForgotPassword.svg';
import { useAuthForgotPassword, ForgotAuthType } from '@/hooks/useAuthForgot';
import { requestPasswordReset } from '@/repository/auth.repository';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { toast } from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordComponent = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      await requestPasswordReset(data.email);
      setMessage('Password reset instructions sent to your email!');
      setIsError(false);
      reset();
    } catch (error: any) {
      console.error('Password reset error:', error);
      setMessage(error.response?.data?.message || 'Failed to send reset instructions.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex flex-row'>
      <div className='md:w-1/2 flex flex-col bg-[#132A2E] md:justify-between items-center md:py-3 py-0'>
        <div className='w-full items-center flex justify-end'>
          <Image src={Plate} alt={'Plate'} className='md:w-40 w-24' />
        </div>
        <div className='flex flex-col h-96 gap-4 items-center md:gap-10 justify-between md:justify-center md:h-full'>
          <div className='flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-2xl text-xl text-white'>
              Forgot Password
            </Typography>
          </div>
          <div className='flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-sm text-xs text-white'>
              Enter the email associated with your account
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='md:w-96 w-72 flex flex-col px-3 gap-4'>
            <div>
              <label htmlFor='email' className='font-poppins font-semibold text-sm text-white'>
                Email Address
              </label>
              <Input
                type='email'
                placeholder='Enter your email'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden floating-none'
                }}
                crossOrigin={''}
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <Typography color="red" className='font-poppins font-normal text-sm mt-1'>
                  {errors.email.message}
                </Typography>
              )}
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='w-full py-2 px-4 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>

            {message && (
              <Typography color={isError ? "red" : "green"} className='font-poppins font-normal text-sm mt-1 text-center'>
                {message}
              </Typography>
            )}
          </form>
        </div>
        <div className='flex h-48 md:h-auto flex-col justify-end'>
          <Image className='w-96' src={IconList} alt={'IconList'} />
        </div>
      </div>
      <div className='md:w-1/2 hidden object-fill md:flex flex-col justify-center'>
        <Image src={ForgetPasswordImage} alt={'Forgot Password Image'} />
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;