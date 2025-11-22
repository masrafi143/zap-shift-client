import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    console.log('location: ', location);
    const {user, loading} = useAuth();
    if(loading){
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    if(!user){
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    return children;
};

export default PrivateRoutes;