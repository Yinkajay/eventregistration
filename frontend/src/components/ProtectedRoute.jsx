import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const {userInfo} = useContext(AuthContext)
    const isAuth = localStorage.getItem('token') 
    // const isAuth = localStorage.getItem('token') && userInfo;
    return isAuth ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
