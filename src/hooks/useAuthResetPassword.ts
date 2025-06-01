import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ResetPasswordSchema = z.object({
  token: z.string({
    required_error: 'Token is required!'
  }).min(1, { message: 'Token is required!' }),
  newPassword: z
    .string({ invalid_type_error: '', required_error: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(25, { message: 'Password must be less than 25 characters' })
    .regex(/[0-9]/, { message: 'At least one number is required' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'At least one special character is required'
    })
    .regex(/^\S+$/, { message: 'Password must not contain spaces' })
});

export type ResetPasswordAuthType = z.infer<typeof ResetPasswordSchema>;

export const useAuthResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ResetPasswordAuthType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: '',
      newPassword: '',
    }
  });
  return {
    register,
    handleSubmit,
    formState: { errors },
    reset
  };
}; 