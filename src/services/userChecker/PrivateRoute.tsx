import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'

interface Props{
    element: React.ReactNode | undefined
}

const PrivateRoute: React.FC<Props> = ({ element }) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth?.loading) {
        return (
            <div className='spinner'>
                <p>Loading....</p>
            </div>
        )
    }
    return (
        <>
            {auth?.user ?
                element
                :
                <Navigate
                    to="/login"
                    state={{ from: location }}
                    replace
                />
            }
        </>
    );
}

export default PrivateRoute