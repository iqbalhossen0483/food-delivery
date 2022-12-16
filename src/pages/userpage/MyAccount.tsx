import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Outlet, useLocation } from "react-router-dom";

const MyAccount = () => {
  const auth = useAuth();
  const location = useLocation();
  return (
    <div className='my-account-container'>
      <div className='menus'>
        <Link to='myorder'>MY ORDER</Link>
      </div>
      <div className='col-span-5'>
        {location.pathname === "/myaccount" ? (
          <div className='front-page'>
            <h2>Welcome! {auth?.user?.displayName}</h2>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
