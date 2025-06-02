import { useSessionExpired } from '@/common/SessionExpiredContext';
import { Button, Typography } from '@material-tailwind/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SessionExpiredModal = () => {
  const { open, hide } = useSessionExpired();
  const router = useRouter();

  if (!open) return null;
  const handleLogin = async () => {
    hide();
    await signOut({ redirect: false });
    await router.push('/auth/login');
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='flex flex-col items-center justify-center bg-white p-6 rounded shadow'>
        <Typography className='text-lg font-bold mb-2'>
          Session Expired
        </Typography>
        <Typography className='mb-4'>Session Timeout Please Login!</Typography>
        <Button
          onClick={handleLogin}
          className='bg-green-600 text-white px-4 py-2 rounded'
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
