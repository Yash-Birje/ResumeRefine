import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

/**
 * ProtectedRoute component - Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Preserves intended destination after login
 * @param {React.ReactNode} props.children - Protected content to render
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If not authenticated, redirect to login with return URL
  if (!currentUser) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // User is authenticated, render protected content
  return children;
};

export default ProtectedRoute;