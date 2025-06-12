// Add type definitions
interface ProfileData {
  username: string;
  email: string;
  phone_number: string;
  full_name: string;
  gender: string;
  address: string;
  avatar?: string; // Avatar might be optional
}

// Extend NextAuth Session type to match project usage

import { Avatar, Button } from '@material-tailwind/react';
import { signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getProfile, updateProfile } from '@/repository/profile.repository';
import { useProfileForm, ProfileFormType } from '@/hooks/useProfileForm';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PlaceHolderImage from '@/assets/profile/placeholderimage.png';

interface PayloadProfile {
  userId: number;
  accessToken: string;
}

const ProfilePages = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.user.accessToken as string;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useProfileForm();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      if (status === 'authenticated') {
        try {
          if (!session?.user.accessToken) {
            setLoading(false);
            return;
          }
          const payload: PayloadProfile = {
            userId: session?.user.userId as number,
            accessToken: session?.user.accessToken
          };
          const response = await getProfile(payload);
          const data = await response;
          if (!data) {
            console.log('data null:', data);
          } else {
            setProfileData(data);
          }
          setValue('full_name', data.data.full_name || '');
          setValue('phone_number', data.data.phone_number || '');
          setValue(
            'gender',
            data.data.gender === 'Male' || data.data.gender === 'Female'
              ? data.data.gender
              : undefined
          );
          setValue('address', data.data.address || '');
          setLoading(false);
          setProfileData(data);
          return data;
        } catch (error) {
          console.error('Error fetching profile:', error);
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
      }
    };

    void fetchProfile();
  }, [session, status, setValue]);

  const handleImageUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      try {
        // Create a FormData object to send the image
        const formData = new FormData();
        formData.append('avatar', files);
        formData.append('accessToken', accessToken);

        // Call your API to upload the image
        const response = await updateProfile({
          avatar: formData,
          accessToken: accessToken
        });

        if (response) {
          setProfileData((prev) =>
            prev ? { ...prev, avatar: response.data.avatar } : null
          );
          setImageUrl(URL.createObjectURL(files));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleEdit = () => {
    console.log('handleEdit called');
    if (!session?.user.accessToken) {
      console.error('Access token not available in handleEdit');
      return;
    }
    // Store the access token in localStorage when entering edit mode
    localStorage.setItem('user.accessToken', session.user.accessToken);
    setIsEditing(true);
  };

  const onSubmit = async (data: ProfileFormType) => {
    try {
      if (!session?.user.accessToken) {
        console.error('Access token not available');
        return;
      }

      // Store the access token in localStorage
      localStorage.setItem('user.accessToken', session.user.accessToken);

      const updatedData = await updateProfile({
        full_name: data.full_name,
        gender: data.gender,
        address: data.address,
        phone_number: data.phone_number,
        accessToken: accessToken
      });

      if (updatedData) {
        setProfileData((prev) =>
          prev ? { ...prev, ...updatedData.data } : null
        );
        setIsEditing(false);
        reset(updatedData.data);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      // Optionally, you might want to show an error message to the user here
    }
  };

  const handleCancel = () => {
    if (profileData) {
      reset({
        full_name: profileData.full_name || '',
        gender:
          profileData.gender === 'Male' || profileData.gender === 'Female'
            ? profileData.gender
            : undefined,
        address: profileData.address || '',
        phone_number: profileData.phone_number || ''
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-[#132A2E] text-gray-200 p-4 flex justify-center items-center'>
        Loading profile...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className='min-h-screen bg-[#132A2E] text-gray-200 p-4 flex justify-center items-center'>
        Please login to view this page.
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className='min-h-screen bg-[#132A2E] text-gray-200 p-4 flex justify-center items-center'>
        Could not load profile data.
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#132A2E] text-gray-200 p-4 pb-80 md:w-full'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div
          className='text-2xl cursor-pointer'
          onClick={() => router.push('/homepage')}
        >
          &larr;
        </div>
      </div>

      {/* User Info Section */}
      <div className='flex flex-col items-center mb-8 relative'>
        <div className='w-24 h-24 rounded-full bg-gray-700 mb-4 relative flex items-center justify-center overflow-hidden'>
          <input
            type='file'
            accept='image/*'
            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10'
            onChange={handleImageUrl}
          />
          {imageUrl || profileData?.avatar ? (
            <Image
              src={imageUrl || profileData?.avatar || ''}
              alt='Profile'
              width={96}
              height={96}
              className='w-24 h-24 rounded-full object-cover'
            />
          ) : (
            <Image
              src={PlaceHolderImage}
              alt='Default Profile'
              className='w-24 h-24 rounded-full'
            />
          )}
        </div>
        <div className='text-xl font-semibold mb-1'>
          {profileData.username || session?.user?.name || 'N/A'}
        </div>
        <div className='text-gray-400'>
          {profileData.email || session?.user?.email || 'N/A'}
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-4 relative py-4'>
        {!isEditing ? (
          <Button
            onClick={handleEdit}
            className='px-4 py-2 text-sm shadow-md shadow-green-500 bg-[#132A2E] hover:bg-blue-700 rounded-md cursor-pointer'
          >
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              type='button'
              onClick={handleSubmit(onSubmit)}
              className='px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-md cursor-pointer'
            >
              Save
            </Button>
            <Button
              type='button'
              onClick={handleCancel}
              className='px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 rounded-md cursor-pointer'
            >
              Cancel
            </Button>
          </>
        )}
      </div>

      {/* Form Detail Profil */}
      <div className='flex flex-col space-y-4'>
        {/* Phone Number (Display Only) */}
        <div className='bg-[#132A2E] rounded-md p-3 text-sm text-white placeholder-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg shadow-green-500'>
          {profileData.phone_number || 'N/A'}
        </div>

        {/* Full Name Input */}
        <div className='flex flex-col gap-1'>
          <label className='text-white text-sm'>Full Name</label>
          <input
            type='text'
            placeholder='Full Name'
            {...register('full_name')}
            readOnly={!isEditing}
            className={`bg-[#132A2E] rounded-md p-3 text-sm text-white placeholder-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg shadow-green-500 ${
              !isEditing ? 'cursor-not-allowed' : ''
            } ${isEditing ? 'relative z-50' : ''}`}
          />
          {errors.full_name && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.full_name.message}
            </p>
          )}
        </div>

        {/* Gender Dropdown */}
        <div className='flex flex-col gap-1'>
          <label className='text-white text-sm'>Gender</label>
          <div className='relative'>
            <select
              className={`block appearance-none w-full bg-[#132A2E] border border-gray-700 text-sm text-white py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-green-500 focus:border-green-500 shadow-lg shadow-green-500 ${
                !isEditing ? 'cursor-not-allowed' : ''
              } ${isEditing ? 'relative z-50' : ''}`}
              {...register('gender')}
              disabled={!isEditing}
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#D9D9D9]'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
          {errors.gender && (
            <p className='text-red-500 text-xs mt-1'>{errors.gender.message}</p>
          )}
        </div>

        {/* Address Textarea */}
        <div className='flex flex-col gap-1'>
          <label className='text-white text-sm'>Address</label>
          <textarea
            placeholder='Address'
            rows={4}
            {...register('address')}
            readOnly={!isEditing}
            className={`bg-[#132A2E] rounded-md p-3 text-sm text-white placeholder-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg shadow-green-500 resize-none ${
              !isEditing ? 'cursor-not-allowed' : ''
            } ${isEditing ? 'relative z-50' : ''}`}
          ></textarea>
          {errors.address && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Edit/Save/Cancel Buttons */}
      </div>

      {/* Sign Out Button */}
      <div className='flex justify-end mt-8 cursor-pointer'>
        <Button
          onClick={() => signOut({ callbackUrl: '/homepage', redirect: true })}
          className='px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-md cursor-pointer'
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePages;

// Add global style to prevent __next-build-watcher from blocking clicks
<style jsx global>
  {`
    #__next-build-watcher {
      pointer-events: none !important;
    }
  `}
</style>;
