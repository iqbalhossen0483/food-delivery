import React from 'react';
import { Link } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';

const TopContactInfo: () => JSX.Element = () => {
    const auth = useAuth();
  return (
      <div className='flex justify-between px-2 lg:px-20 py-2 items-center'>
          <div className='flex'>
              <p className='text-slate-500'>Call us for Ordering</p>
              <i className="fas fa-phone text-primary px-1 mt-1"></i>
              <p className='font-semibold'>+880 18467 70635</p>
          </div>
          <div className='text-slate-500'>
              {auth?.user ?
                  <Link to="/myaccount">My Account</Link>
                  :
                  <Link to="/login">Login/Register</Link>
              }
          </div>
      </div>
  )
}

export default TopContactInfo