import { Button } from '@material-tailwind/react';
import { signOut } from 'next-auth/react';
import React from 'react';

const ProfilePages = () => {
  return (
    <div className='min-h-screen bg-[#132A2E] text-gray-200 p-4'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        {/* Back Arrow - Placeholder */}
        <div className='text-2xl cursor-pointer'>&larr;</div>
        {/* Sign Out Button */}
        <Button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: '/homepage'
            })
          }
          className='px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-md'
        >
          sign out
        </Button>
      </div>

      {/* User Info Section */}
      <div className='flex flex-col items-center mb-8'>
        <div className='w-24 h-24 rounded-full bg-gray-700 mb-4'>
          {/* Image goes here */}
        </div>
        <div className='text-xl font-semibold mb-1'>username</div>
        <div className='text-gray-400'>email@example.com</div>
      </div>

      {/* Form Detail Profil */}
      <div className='flex flex-col space-y-4'>
        {/* Phone Number (Display Only) */}
        <div className='bg-[#34D399] rounded-md p-3 text-center text-black'>
          081298357279 {/* Placeholder phone number */}
        </div>

        {/* Full Name Input */}
        <input
          type='text'
          placeholder='Full Name'
          className='bg-[#34D399] rounded-md p-3 text-sm text-[#888]! placeholder-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        {/* Gender Dropdown */}
        <div className='relative'>
          <select className='block appearance-none w-full bg-[#34D399] border border-gray-700 text-sm text-[#888]! py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-[#34D399] focus:border-gray-500'>
            <option value=''>Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {/* Dropdown Arrow Icon */}
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#D9D9D9]'>
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>
          </div>
        </div>

        {/* Address Textarea */}
        <textarea
          placeholder='Address'
          rows={4}
          className='bg-[#34D399] rounded-md p-3 text-sm text-[#888]! placeholder-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
        ></textarea>
      </div>

    </div>
  );
};

export default ProfilePages;
