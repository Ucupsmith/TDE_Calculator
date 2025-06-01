import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ForgotSchema = z.object({
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
    })
});

// Export the type
export type ForgotAuthType = z.infer<typeof ForgotSchema>;

export const useAuthForgotPassword = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<ForgotAuthType>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: undefined,
      select_number: '+62',
      number_phone: undefined
    }
  });
  return {
    register,
    reset,
    formState: { errors },
    handleSubmit
  };
};
