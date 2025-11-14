/**
 * EmptyState component - Display when no data is available
 * @param {node} icon - Icon component to display
 * @param {string} title - Title text
 * @param {string} description - Description text
 * @param {object} actionButton - Optional action button {text, onClick}
 */
const EmptyState = ({ icon, title, description, actionButton }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Icon */}
      {icon && <div className="text-gray-400 mb-4">{icon}</div>}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      )}

      {/* Action Button */}
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          {actionButton.text}
        </button>
      )}
    </div>
  );
};

export default EmptyState;