interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
  }
  
  export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading,
    className,
    disabled,
    ...props
  }) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50';
    
    const variants = {
      primary: 'bg-[#66FCF1] text-[#0B0C10] hover:bg-[#45e6db]',
      secondary: 'bg-[#1F2833] text-[#FFFFFF] hover:bg-[#2a3744]',
      outline: 'border-2 border-[#66FCF1] text-[#66FCF1] hover:bg-[#66FCF1] hover:text-[#0B0C10]',
    };
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  };