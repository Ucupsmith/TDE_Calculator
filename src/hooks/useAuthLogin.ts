import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const authLoginSchema = z.object({
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
  password: z
    .string({ invalid_type_error: '', required_error: '' })
    .min(10, { message: 'Password must be at least 8 characters' })
    .max(25, { message: 'Password must be less than 100 characters' })
    .regex(/[0-9]/, { message: 'At least one number is required' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'At least one special character is required'
    })
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
      email: undefined,
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
