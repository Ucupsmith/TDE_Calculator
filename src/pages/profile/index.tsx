import { Button } from '@material-tailwind/react';
import { signOut } from 'next-auth/react';
import React from 'react';

const ProfilePages = () => {
  return (
    <div className='flex flex-row justify-end px-2 py-3'>
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: '/homepage'
          })
        }
        className=''
      >
        sign out
      </Button>
    </div>
  );
};

export default ProfilePages;
