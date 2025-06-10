import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  number_phone: string;
  select_number: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  number_phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(13, 'Phone number must not exceed 13 digits'),
  select_number: yup
    .string()
    .required('Country code is required')
});

export const useAuthRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    watch,
    formState: { errors }
  };
}; 