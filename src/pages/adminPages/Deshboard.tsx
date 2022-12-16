import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Deshboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin") navigate("manage-product");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className='deshboard-container'>
      <div className='menus'>
        <Link to='add-category'>ADD CATEGORY</Link>
        <Link to='add-product'>ADD PRODUCT</Link>
        <Link to='manage-product'>MANAGE PRODUCTS</Link>
        <Link to='manage-order'>MANAGE ORDER</Link>
      </div>
      <div className='col-span-5'>
        {location.pathname === "/deshboard" ? (
          <div className='front-page'>
            <p>Deshboard</p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Deshboard;
