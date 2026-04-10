// Reusable badge component for tags and categories

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'small',
  className = '' 
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    secondary: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
  };
  
  const sizes = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm'
  };
  
  return (
    <span 
      className={`
        inline-block
        font-medium 
        rounded-full 
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}