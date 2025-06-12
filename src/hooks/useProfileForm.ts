import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the Zod schema for profile form fields
const ProfileFormSchema = z.object({
  full_name: z.string().min(1, { message: 'Full Name is required' }),
  gender: z.enum(['Male', 'Female'], {
    required_error: 'Gender is required',
  }).optional(),
  address: z.string().optional().or(z.literal('')).transform(e => e === '' ? undefined : e),
  phone_number: z.string().optional()
                       .refine((val) => {
                         if (val === undefined || val === null || val === '') return true;
                         return /^[0-9]+$/.test(val) && val.length >= 10 && val.length <= 12;
                       }, { message: 'Phone Number must be 10-12 digits and contain only numbers' })
});

// Define the TypeScript type based on the schema
export type ProfileFormType = z.infer<typeof ProfileFormSchema>;

// Custom hook for profile form handling
export const useProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      full_name: '',
      gender: undefined,
      address: '',
      phone_number: '',
    },
  });

  return {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  };
}; 