import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MyContext from '../context/context';

const ProtectedRoute = (props) => {
    const { setIsLogin } = useContext(MyContext);
    const { Component } = props;
    const token = localStorage.getItem('token');
    const updateContext =()=>{
        setIsLogin(false);
        return <Navigate to="/login" />
    }
    return (token ) ? <Component /> : updateContext();
}

export default ProtectedRoute;
