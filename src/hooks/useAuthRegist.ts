import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const authRegisterSchema = z.object({
  username: z
    .string({
      required_error: 'Name is required!',
      invalid_type_error: 'Name must be a string!'
    })
    .min(3, { message: 'Name must have at least 3 characters' })
    .max(50, { message: 'Name must have max 50 characters' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name can only contain letters and spaces'
    }),
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email is invalid!'
    })
    .email({ message: 'Email format is invalid' })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'Email must be a valid format'
    }),
  select_number: z.enum(['+62', '+61', '+60'], {
    required_error: 'Please select a country code',
    invalid_type_error: 'Invalid country code'
  }),
  number_phone: z
    .string({
      required_error: 'Phone number is required!'
    })
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be under 15 digits' })
    .regex(/^[0-9\s\-]{10,15}$/, {
      message: 'Phone number can contain numbers, spaces, and dashes only.'
    }),
  password: z
    .string({ 
      required_error: 'Password is required!',
      invalid_type_error: 'Password must be a string!'
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(25, { message: 'Password must be less than 25 characters' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/^\S+$/, { message: 'Password must not contain spaces' })
});

type AuthRegistType = z.infer<typeof authRegisterSchema>;

export const useAuthRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<AuthRegistType>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      select_number: '+62',
      number_phone: '',
      password: ''
    }
  });
  return {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  };
};
