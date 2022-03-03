import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';

const Deshboard = () => {
    const location = useLocation();

    return (
        <div className='deshboard-container'>
            <div className='menus'>
                <Link to="add-category">ADD CATEGORY</Link>
                <Link to="add-product">ADD PRODUCT</Link>
                <Link to="manage-product">MANAGE PRODUCTS</Link>
                <Link to="manage-order">MANAGE ORDER</Link>
            </div>
            <div className='col-span-5'>
                {location.pathname === "/deshboard" ?
                    <div className='front-page'>
                        <p>Deshboard</p>
                    </div>
                    :
                    <Outlet />
                }
            </div>
        </div>
    );
}

export default Deshboard