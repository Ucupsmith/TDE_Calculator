import { Button, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';
import Plate from '@/assets/auth/Plate.svg';
import IconList from '@/assets/auth/IconList.svg';
import ForgetPassword from '@/assets/auth/ForgotPassword.svg';
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
  const valueOption = ['+62', '+61', '+60'];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useAuthForgotPassword();

  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      await requestPasswordReset(data.email);
      setResetSent(true);
      // toast.success('Password reset instructions sent to your email');
    } catch (error: any) {
      console.error('Password reset error:', error);
      // toast.error(error.message || 'Failed to send reset instructions');
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
            {!resetSent ? (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send reset instructions'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Reset instructions sent
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Please check your email for instructions to reset your password.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

export default ForgotPasswordComponent;