export interface User { 
  token: string;
  email: string;
}
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}