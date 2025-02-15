interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
  }
  
  export const Input: React.FC<InputProps> = ({
    label,
    error,
    className,
    ...props
  }) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-[#C5C6C7]">
          {label}
        </label>
        <input
          className={`
            w-full px-3 py-2 rounded-lg
            bg-[#1F2833] text-[#FFFFFF]
            border border-[#C5C6C7]
            focus:outline-none focus:border-[#66FCF1]
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  };
  