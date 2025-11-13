import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner component - Reusable loading indicator
 * @param {string} size - Size: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} color - Color (default: 'primary')
 * @param {boolean} center - Center in container (default: false)
 */
const LoadingSpinner = ({ size = 'md', color = 'primary', center = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  const spinnerClasses = `${sizeClasses[size]} ${colorClasses[color]} animate-spin`;

  if (center) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className={spinnerClasses} />
      </div>
    );
  }

  return <Loader2 className={spinnerClasses} />;
};

export default LoadingSpinner;