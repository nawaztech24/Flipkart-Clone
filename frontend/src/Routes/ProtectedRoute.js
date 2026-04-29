import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAdmin && user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;