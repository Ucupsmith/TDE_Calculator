export interface RegisterProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  number_phone: string;
  select_number: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  number_phone: string;
  accessToken: string;
} 