import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {
  element: React.ReactNode | undefined;
}

const AdminRoute: React.FC<Props> = ({ element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.loading) {
    return (
      <div className='spinner'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {auth?.user?.role === "admin" ? (
        element
      ) : (
        <Navigate to='/' state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

export default AdminRoute;
