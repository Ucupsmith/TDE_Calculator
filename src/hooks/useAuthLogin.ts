import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const authLoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email is invalid!'
    })
    .email({ message: 'Email format is invalid' })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'Email must be a valid format'
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

export type AuthLoginType = z.infer<typeof authLoginSchema>;

export const useAuthLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<AuthLoginType>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: '',
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
