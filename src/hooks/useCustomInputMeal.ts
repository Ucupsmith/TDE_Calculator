import { zodResolver } from '@hookform/resolvers/zod';
import { a } from 'framer-motion/dist/types.d-CQt5spQA';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CustomMealSchema = z.object({});

type CustomMealType = z.infer<typeof CustomMealSchema>;

const useCustomInputMeal = () => {
  const {} = useForm<CustomMealType>({
    resolver: zodResolver(CustomMealSchema),
    defaultValues: {}
  });
};
