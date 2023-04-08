import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const GuestLayout = () => {

    const { currentUser, userToken, currentUserRole } = useStateContext();

    if (userToken && currentUserRole == 'admin') {
        return <Navigate to='/admin/dashboard' />
    } else if (userToken && currentUserRole == 'customer') {
        return <Navigate to='/customer/dashboard' />
    }

    return (
        <div className='py-5 px-5'>
            <Outlet />
        </div>
    )
}

export default GuestLayout
