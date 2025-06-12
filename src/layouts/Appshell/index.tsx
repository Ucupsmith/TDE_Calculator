import Navbar from '@/components/navbar/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const dissableNavbar = [
  '/auth/register',
  '/auth/login',
  '/auth/forget-password',
  '/auth/forget-password/auth-otp',
  '/auth-otp',
  '/404',
  '/'
];

const AppShell: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className='md:w-full md:px-10 px-0 bg-[#132A2E]'>
      <div className='md:flex md:flex-col md:justify-normal gap-10 items-center justify-center md:px-20 px-0 md:py-4 py-0 overflow-auto'>
        {!dissableNavbar.includes(pathname) ? <Navbar /> : null}
        {children}
      </div>
    </div>
  );
};

export default AppShell;
