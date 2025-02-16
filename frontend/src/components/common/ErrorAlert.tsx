const ErrorAlert = ({ message, onClose }: { message: string; onClose?: () => void }) => {
    if (!message) return null;
  
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span className="block sm:inline">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            aria-label="Close alert"
          >
            <span className="text-red-500 hover:text-red-700">×</span>
          </button>
        )}
      </div>
    );
  };
  
  export default ErrorAlert;