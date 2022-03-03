import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface User{
    role: string
}
interface Props{
    element: React.ReactNode | undefined
}

const AdminRoute:React.FC<Props> = ({element}) => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useAuth();
    const location = useLocation();

    const idToken: string = localStorage.getItem("idToken") || "";
    const email: string = auth?.user?.email || "";

    useEffect(() => {
        setLoading(true);
        if (auth?.user) {
            fetch(`https://fooddelivery-server.herokuapp.com/users/${email}`, {
                headers: {
                    "authorize": idToken,
                    "email": email
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(err => setLoading(false));
        }
    }, [auth?.user]);

    if (auth?.loading || loading) {
        return (
            <div className='spinner'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <>
            {auth?.user && user?.role === "admin" ?
                element
                :
                <Navigate
                    to="/"
                    state={{ from: location }}
                    replace
                />
            }
        </>
    );
}

export default AdminRoute