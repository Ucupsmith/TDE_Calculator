import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const authRegisterSchema = z.object({
  username: z
    .string({
      required_error: 'name is requiered!',
      invalid_type_error: 'name must be a string!'
    })
    .min(10, { message: `name must have at least 10 character's` })
    .max(50, { message: `name must have max 50 length character's` })
    .toLowerCase()
    .regex(/^[a-zA-Zs]+$/, {
      message: 'Name can only contain letters and spaces'
    }),
  email: z
    .string({
      required_error: 'Email is requiered!',
      invalid_type_error: 'Email is invalid!'
    })
    .min(1, { message: `Email must have at least 10 character's` })
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
      required_error: 'Phone number cannot be null!'
    })
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(25, { message: 'Phone number must be under 25 digits' })
    .regex(/^[0-9\s\-]{10,25}$/, {
      message: 'Phone number can contain numbers, spaces, and dashes only.'
    }),
  password: z
    .string({ invalid_type_error: '', required_error: '' })
    .min(10, { message: 'Password must be at least 8 characters' })
    .max(25, { message: 'Password must be less than 100 characters' })
    .regex(/[0-9]/, { message: 'At least one number is required' })
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
      username: undefined,
      email: undefined,
      select_number: '+62',
      number_phone: undefined,
      password: undefined
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
