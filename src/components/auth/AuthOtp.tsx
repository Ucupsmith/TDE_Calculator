import React, { useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Plate from '@/assets/auth/Plate.svg';
import IconList from '@/assets/auth/IconList.svg';
import ResetPasswordImage from '@/assets/auth/ForgotPassword.svg'; // Using the same image for now
import { useAuthResetPassword, ResetPasswordAuthType } from '@/hooks/useAuthResetPassword';
import { resetPassword } from '@/repository/auth.repository'; // Import the resetPassword function
import { useRouter } from 'next/router'; // Import useRouter

const ResetPasswordComponent = () => { // Renamed component for clarity
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useAuthResetPassword();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const onSubmit = async (data: ResetPasswordAuthType) => {
    setIsLoading(true);
    setMessage(null);
    setIsError(false);
    console.log('Reset password form submitted:', data);

    try {
        await resetPassword(data.token, data.newPassword); // Call the resetPassword API function
        setMessage('Password berhasil direset. Anda akan diarahkan ke halaman login.');
        setIsError(false);
        reset(); // Clear the form on success
        
        // Redirect to login page after a delay
        setTimeout(() => {
            router.push('/auth/login');
        }, 3000); // Redirect after 3 seconds

    } catch (error: any) {
        console.error('Password reset failed:', error);
        setMessage(error.response?.data?.message || 'Terjadi kesalahan saat mereset password.');
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
              Reset Password
            </Typography>
          </div>
          <div className='flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-sm text-xs text-white'>
              Enter the token from your email and your new password
            </Typography>
          </div>
          <div className='w-full flex flex-col items-center justify-between h-60'>
            {/* Token Input */}
            <div className='md:w-96 w-72 flex flex-col px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Token
              </label>
              <Input
                type='text'
                placeholder='Enter the token from your email'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden floating-none'
                }}
                crossOrigin={''} // Add crossOrigin prop
                {...register('token')}
              />
              {errors.token && (
                <Typography className='font-poppins font-normal text-sm md:text-lg text-red-900'>
                  {errors.token.message}
                </Typography>
              )}
            </div>

            {/* New Password Input */}
            <div className='md:w-96 w-72 flex flex-col px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                New Password
              </label>
              <Input
                type='password'
                placeholder='Enter your new password'
                className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                labelProps={{
                  className: 'hidden floating-none'
                }}
                 crossOrigin={''} // Add crossOrigin prop
                {...register('newPassword')}
              />
              {errors.newPassword && (
                <Typography className='font-poppins font-normal text-sm md:text-lg text-red-900'>
                  {errors.newPassword.message}
                </Typography>
              )}
            </div>

            {/* Submit Button */}
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
        <Image src={ResetPasswordImage} alt={ResetPasswordImage} />
      </div>
    </div>
  );
};

export default ResetPasswordComponent; // Export the renamed component
