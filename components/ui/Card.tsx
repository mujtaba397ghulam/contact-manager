// Reusable card component

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'small' | 'medium' | 'large';
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'medium' 
}: CardProps) {
  const paddingSizes = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };
  
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-2xl 
        shadow-lg 
        ${hover ? 'hover:shadow-2xl transform hover:-translate-y-1' : ''} 
        transition-all duration-300 
        ${paddingSizes[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}