interface ErrorMessageProps {
    message: string;
  }
  
  export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
      <div className="p-2 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
        {message}
      </div>
    );
  };