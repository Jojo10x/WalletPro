import api from './axios';

export const authApi = {
  register: (email: string, password: string, confirmPassword: string) =>
    api.post('/auth', { 
      email, 
      password, 
      confirmPassword,
      type: 'register'
    }),
  
  login: (email: string, password: string) =>
    api.post('/auth', { 
      email, 
      password,
      type: 'login'
    }),
};