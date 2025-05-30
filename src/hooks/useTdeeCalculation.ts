import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const TdeeFormSchema = z.object({
  gender: z.enum(['Male', 'Female'], {
    required_error: 'Gender is Requiered'
  }),
  age: z
    .number({
      required_error: 'Age is Requiered',
      invalid_type_error: 'Age must be a number!'
    })
    .min(10, { message: 'Age must be at least 10' })
    .max(100, { message: 'Age must be under 100' })
    .positive('Age must be with possitive'),
  weight: z
    .number({
      required_error: 'Weight is requiered',
      invalid_type_error: 'Weight must be a number!'
    })
    .min(30, { message: 'Weight must be at least 30 kg!' })
    .max(150, { message: 'Weight must be under 150 kg!' })
    .positive('Weight must be with possitive'),
  height: z
    .number({
      required_error: 'Height is required',
      invalid_type_error: 'Height must be a number!'
    })
    .min(100, { message: 'Height must be at least 100 cm tall!' })
    .max(250, { message: 'Height must be under 200 cm tall' })
    .positive('Height must be with possitive'),
  goal: z.enum(['LoseWeight', 'MaintainWeight', 'GainWeight']),
  activity_level: z.enum(
    [
      'Sedentary',
      'Lightly Active',
      'Moderately Active',
      'Very Active',
      'Extra Active'
    ],
    {
      required_error: 'Activity Level is Requiered'
    }
  )
});

export type TdeeFormType = z.infer<typeof TdeeFormSchema>;

export const useTdeeForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue
  } = useForm<TdeeFormType>({
    resolver: zodResolver(TdeeFormSchema),
    defaultValues: {
      gender: 'Male',
      age: undefined,
      weight: undefined,
      height: undefined,
      activity_level: 'Sedentary',
      goal: 'MaintainWeight'
    }
  });

  return {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue
  };
};
