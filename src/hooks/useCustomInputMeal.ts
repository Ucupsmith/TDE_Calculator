import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CustomMealSchema = z.object({
  name: z
    .string({ required_error: 'Meal name is required' })
    .min(4, { message: 'Meal name must be at least 4 characters' })
    .max(20, { message: 'Meal name must be at most 20 characters' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Meal name must contain only letters and spaces'
    }),
  calories: z
    .number({
      required_error: 'Calories are required',
      invalid_type_error: 'Calories must be a number'
    })
    .min(1, { message: 'Calories must be greater than 0' }),
  unit: z
    .number({
      invalid_type_error: 'Quantity must be a number'
    })
    .min(1, { message: 'Quantity must be at least 1' })
});

export type CustomMealType = z.infer<typeof CustomMealSchema>;

export const useCustomInputMeal = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CustomMealType>({
    resolver: zodResolver(CustomMealSchema),
    defaultValues: {
      name: '',
      calories: undefined,
      unit: 1
    }
  });
  return {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  };
};
