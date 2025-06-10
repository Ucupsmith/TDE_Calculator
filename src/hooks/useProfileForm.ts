import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the Zod schema for profile form fields
const ProfileFormSchema = z.object({
  full_name: z.string().min(1, { message: 'Full Name is required' }),
  gender: z.enum(['Male', 'Female'], {
    required_error: 'Gender is required',
  }).optional(),
  address: z.string().min(1, { message: 'Address is required' }),
  phone_number: z.string().min(10, { message: 'Phone Number must be at least 10 digits' })
                       .max(12, { message: 'Phone Number must be at most 12 digits' })
                       .regex(/^[0-9]+$/, { message: 'Phone Number must contain only digits' }),
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