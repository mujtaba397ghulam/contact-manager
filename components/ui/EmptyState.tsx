// Reusable empty state component

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      {icon && (
        <div className="mb-6 flex justify-center">
          <div className="text-gray-300 dark:text-gray-600">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}