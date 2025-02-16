  import { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { useNavigate } from 'react-router-dom';
  import { RegisterFormData } from '../../types/auth.types';
  import { authApi } from '../../api/auth.api';
  import { Button } from '../common/Button';
  import { Input } from '../common/Input';
  import { useAuth } from '../../hooks/useAuth';
  import { validateEmail, validatePassword } from '../../utils/validation'; 
  import { AxiosError } from 'axios';
  import { LogIn, UserPlus} from 'lucide-react';
  import ErrorAlert from '../common/ErrorAlert';
  
  
  export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [apiError, setApiError] = useState('');
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
        setApiError("");
        const response = isLogin
          ? await authApi.login(data.email, data.password)
          : await authApi.register(
              data.email,
              data.password,
              data.confirmPassword
            );
        login(response.data);
        navigate("/dashboard");
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            const errorMessage =
              typeof error.response.data === "string"
                ? error.response.data
                : error.response.data?.message || "An error occurred";
            setApiError(errorMessage);
          } else if (error.request) {
            setApiError(
              "No response received from server. Please check your internet connection."
            );
          } else {
            setApiError(error.message || "Failed to send request");
          }
        } else {
          setApiError("An unexpected error occurred");
        }

        console.error(`${isLogin ? "Login" : "Registration"} failed:`, {
          error,
          status: (error as AxiosError)?.response?.status,
          data: (error as AxiosError)?.response?.data,
        });
      }
    };
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
      setApiError(''); 
      reset();
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-8">
            {isLogin ? (
              <LogIn className="h-8 w-8 text-cyan-500" />
            ) : (
              <UserPlus className="h-8 w-8 text-cyan-500" />
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
          </div>
  
          <ErrorAlert 
            message={apiError}
            onClose={() => setApiError('')}
          />
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  validateEmail(value) || "Please enter a valid email address",
              })}
              error={errors.email?.message}
            />
  
            <Input
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  validatePassword(value) ||
                  "Password must be at least 8 characters long",
              })}
              error={errors.password?.message}
            />
  
            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                error={errors.confirmPassword?.message}
              />
            )}
  
            <Button 
              type="submit" 
              isLoading={isSubmitting} 
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLogin ? (
                <>
                  <LogIn className="h-4 w-4 " />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 " />
                  Create Account
                </>
              )}
            </Button>
  
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={toggleForm}
                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                {isLogin
                  ? "Don't have an account? Create one"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  export default AuthForm;