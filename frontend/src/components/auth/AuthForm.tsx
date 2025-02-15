  import { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { useNavigate } from 'react-router-dom';
  import { RegisterFormData } from '../../types/auth.types';
  import { authApi } from '../../api/auth.api';
  import { Button } from '../common/Button';
  import { Input } from '../common/Input';
import { useAuth } from '../../hooks/useAuth';
  
  export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
      reset
    } = useForm<RegisterFormData>();
  
    const onSubmit = async (data: RegisterFormData) => {
      try {
        const response = isLogin
          ? await authApi.login(data.email, data.password)
          : await authApi.register(data.email, data.password, data.confirmPassword);
        
        login(response.data);
        navigate('/dashboard');
      } catch (error) {
        console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
      }
    };
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
      reset();
    };
  
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="w-full max-w-md p-6 rounded-lg bg-gray-800">
          <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
            {isLogin ? 'Login' : 'Register'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />
  
            <Input
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />
  
            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                error={errors.confirmPassword?.message}
              />
            )}
  
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full"
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
  
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={toggleForm}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Register" 
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AuthForm;