import { Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';
import Plate from '@/assets/auth/Plate.svg';
import IconList from '@/assets/auth/IconList.svg';
// Use a relevant image, can reuse ForgetPassword or add a new one
import ResetPasswordImage from '@/assets/auth/ForgotPassword.svg';

// Import necessary hooks/functions for form handling and API call
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // Assuming Zod is used for schema validation
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/repository/auth.repository'; // Make sure this function exists and works
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { setLocalStorage } from '@/utils/common/localStorage';
import { getToken } from 'next-auth/jwt';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Import ArrowLeftIcon from heroicons

// Define form schema using Zod
const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const router = useRouter();
  const { token } = router.query; // Get token from URL query parameter

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false); // State to track success
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: ResetPasswordFormType) => {
    setIsLoading(true);
    setMessage(null);
    setIsError(false);
    setResetSuccess(false); // Reset success state on new submission

    try {
      // Call the backend function to reset password
      // Need to cast token to string explicitly if it's not guaranteed by Next.js router type
      await resetPassword(token as string, data.password);
      setMessage('Your password has been reset successfully!');
      setIsError(false);
      setResetSuccess(true); // Set success state
      reset(); // Clear the form
      // Removed automatic redirect to allow user to click the button

    } catch (error: any) {
      // Display error message from backend if available, otherwise a generic one
      setMessage(error.response?.data?.message || 'Terjadi kesalahan saat mereset password.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Show a loading or error state if token is missing initially
  if (!token || typeof token !== 'string') {
      return <Typography color="red">Invalid or missing reset token.</Typography>;
  }

  return (
    <div className='w-full h-screen flex flex-row'>
      {/* Left side - similar to Forgot Password */}
      <div className='md:w-1/2 flex flex-col bg-[#132A2E] md:justify-between items-center md:py-3 py-0'>
        <div className='w-full items-center flex justify-end'>
          <Image src={Plate} alt={'Plate'} className='md:w-40 w-24' />
        </div>
        <div className='flex flex-col h-96 gap-4 items-center md:gap-10 justify-between md:justify-center md:h-full'>
          <div className='flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-2xl text-xl text-white'>
              Create New Password
            </Typography>
          </div>
          <div className='flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins md:text-sm text-xs text-white'>
              Enter your new password below
            </Typography>
          </div>
          <button
            onClick={() => router.push('/auth/login')}
            className='flex items-center text-white hover:text-gray-300'
          >
            <ArrowLeftIcon className='h-5 w-5 mr-1' /> {/* Use ArrowLeftIcon */}
            Back to Login
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className='md:w-96 w-72 flex flex-col px-3 gap-4'>
            {/* Password input fields */}
            <div className='w-full flex flex-col items-center justify-center gap-4'> {/* Adjust gap as needed */}
              <div className='md:w-96 w-72 flex flex-col px-3'>
                <label htmlFor='password' className='font-poppins font-semibold text-sm text-white'>
                  New Password
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'} // Use dynamic type based on state
                  placeholder='Enter new password'
                  className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                  labelProps={{
                    className: 'hidden floating-none'
                  }}
                  crossOrigin={''}
                  {...register('password')}
                  disabled={isLoading || resetSuccess}
                  icon={ // Add icon to toggle visibility
                    <span onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500">
                      {showPassword ? '👁️' : '🔒'} {/* Using emojis for simplicity, replace with proper icons */}
                    </span>
                  }
                />
                {errors.password && (
                  <Typography color="red" className='font-poppins font-normal text-sm mt-1'>
                    {errors.password.message}
                  </Typography>
                )}
              </div>
              <div className='md:w-96 w-72 flex flex-col px-3'>
                <label htmlFor='confirmPassword' className='font-poppins font-semibold text-sm text-white'>
                  Confirm New Password
                </label>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'} // Use dynamic type based on state
                  placeholder='Confirm new password'
                  className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                  labelProps={{
                    className: 'hidden floating-none'
                  }}
                  crossOrigin={''}
                  {...register('confirmPassword')}
                  disabled={isLoading || resetSuccess}
                  icon={ // Add icon to toggle visibility
                    <span onClick={toggleConfirmPasswordVisibility} className="cursor-pointer text-gray-500">
                      {showConfirmPassword ? '👁️' : '🔒'} {/* Using emojis for simplicity, replace with proper icons */}
                    </span>
                  }
                />
                {errors.confirmPassword && (
                  <Typography color="red" className='font-poppins font-normal text-sm mt-1'>
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </div>
            </div>

            {/* Submit Button */}
            {!resetSuccess && (
              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-2 px-4 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            )}

            {/* Messages */}
            {message && (
              <Typography color={isError ? "red" : "green"} className='font-poppins font-normal text-sm mt-1 text-center'>
                {message}
              </Typography>
            )}

            {/* Button to Login Page on Success */}
            {resetSuccess && (
              <button
                onClick={() => router.push('/auth/login')}
                className='w-full py-2 px-4 rounded-md text-indigo-600 font-medium border border-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4'
              >
                Go to Login
              </button>
            )}
          </form>
        </div>
        <div className='flex h-48 md:h-auto flex-col justify-end'>
          <Image className='w-96' src={IconList} alt={'IconList'} />
        </div>
      </div>
      {/* Right side - similar to Forgot Password */}
      <div className='md:w-1/2 hidden object-fill md:flex flex-col justify-center'>
        <Image src={ResetPasswordImage} alt={'ResetPassword'} />
      </div>
    </div>
  );
};

export default ResetPasswordForm; 