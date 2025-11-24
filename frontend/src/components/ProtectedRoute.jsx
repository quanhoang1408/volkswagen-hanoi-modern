import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div style={{ padding: '5rem', textAlign: 'center' }}>Đang tải...</div>;
    }

    return currentUser ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;