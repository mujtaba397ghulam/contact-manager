// Reusable loading component

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

export default function Loading({ 
  size = 'medium', 
  fullScreen = false,
  text = 'Loading...'
}: LoadingProps) {
  const sizes = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };
  
  const content = (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]}`}></div>
      {text && <p className="mt-4 text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }
  
  return content;
}