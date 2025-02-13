import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  const isAdmin = localStorage.getItem('adminRole');

  if (adminOnly && !isAdmin) {
    return <Navigate to="/login" />;
  }

  if (!user && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;