import { Button, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import Plate from '@/assets/auth/Plate.svg';
import SignInIcon from '@/assets/auth/SignInIcon.svg';
import FruitList from '@/assets/auth/FruitList.svg';
import Google from '@/assets/auth/Google.svg';
import Facebook from '@/assets/auth/Facebook.svg';
import { signIn } from 'next-auth/react';
import { useAuthLogin } from '@/hooks/useAuthLogin';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { set } from 'react-hook-form';
const LoginComponent = (): JSX.Element => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const errorParams = searchParams.get('error');
  const [isLogin, setIsLogin] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch
  } = useAuthLogin();
  useEffect(() => {
    if (errorParams === 'CredentialsSignin') {
      setErrorMessage('Account not found or incorrect passwor');
    } else if (errorParams === 'OAuthAccountNotLinked') {
      setErrorMessage(
        'This email is already registered with another provider.'
      );
    }
  }, [errorParams]);
  const handleCredentialsLogin = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const result = await signIn('credentials', {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: '/homepage'
      });
      reset();
      console.log(`login result :${result}`);
      return result;
    } catch (error) {
      console.error(`login error : ${error}`);
      alert('An error occurred during login');
    }
  };
  return (
    <div className='w-full min-h-screen flex flex-row'>
      <div className='md:w-1/2 hidden object-fill md:flex flex-col justify-center'>
        <Image src={SignInIcon} alt={SignInIcon} />
      </div>
      <div className='md:w-1/2 w-full flex flex-col bg-[#132A2E] overflow-y-hidden items-center'>
        <div className='w-full items-center flex justify-start'>
          <Image src={Plate} alt={Plate} className='md:w-40 w-24 ' />
        </div>
        <div className='flex flex-col h-full gap-4 items-center md:w-96 w-full justify-between'>
          <div className='w-full flex flex-row justify-center'>
            <Typography className='font-semibold font-poppins text-2xl text-white'>
              Sign In
            </Typography>
          </div>
          <div className='w-full flex flex-col items-center justify-between h-60'>
            <div className='md:w-full w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Email
              </label>
              <div className='flex flex-col gap-1'>
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
                {errors.email && (
                  <Typography className='font-poppins font-normal text-red-900 text-sm md:text-lg'>
                    {errors.email.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className='md:w-full w-72 flex flex-col gap-1 px-3'>
              <label className='font-poppins font-semibold text-sm text-white'>
                Password
              </label>
              <div className='flex flex-col gap-1'>
                <Input
                  type='password'
                  placeholder='please insert your password'
                  className='bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white'
                  labelProps={{
                    className: 'hidden floating-none'
                  }}
                  crossOrigin={''}
                  {...register('password')}
                />
                {errors.password && (
                  <Typography className='font-poppins font-normal text-red-900 text-sm md:text-lg'>
                    {errors.password.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className='md:w-80 w-60 flex flex-col justify-center items-center gap-2 text-center'>
              <Button
                onClick={() => handleSubmit(handleCredentialsLogin)()}
                className='border-none w-full rounded-[25px] bg-[#144B3C]'
              >
                Sign in
              </Button>
              {errorMessage && (
                <Typography className='font-poppins font-normal text-red-900 text-sm md:text-lg'>
                  {errorMessage}
                </Typography>
              )}
              <div className='flex flex-row gap-1'>
                <Typography className='font-semibold font-poppins md:text-sm text-[12px] text-white'>
                  Don’t have an Account?
                </Typography>
                <Typography
                  onClick={async () => await push('/auth/register')}
                  className='font-semibold font-poppins md:text-sm text-[12px] text-blue-800 underline'
                >
                  Sign up Here!
                </Typography>
              </div>
            </div>
          </div>
          <div className='md:w-1/2 w-72 flex flex-col items-center gap-2'>
            <Typography className='font-semibold font-poppins text-[12px] text-white'>
              or
            </Typography>
            <Typography className='font-semibold font-poppins text-[12px] text-white'>
              Sign Up With
            </Typography>
            <div className='flex flex-col items-center'>
              <div
                onClick={async () =>
                  await signIn('google', {
                    callbackUrl: '/homepage',
                    redirect: true
                  })
                }
                className='flex flex-row justify-center gap-1'
              >
                <Image
                  onClick={async () => await signIn('google')}
                  src={Google}
                  alt={Google}
                  className='cursor-pointer'
                />
                <Image
                  className='cursor-pointer'
                  src={Facebook}
                  alt={Facebook}
                />
              </div>
            </div>
          </div>

          <div className='flex flex-row'>
            <Image className='w-96' src={FruitList} alt={FruitList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
