import React from 'react'
import { Link } from 'react-router-dom';

const Banner: () => JSX.Element = () => {
    return (
        <div className='banner'>
            <div className='banner-container'>
                <p className='heading'>WE GET WHAT YOU LOVE</p>
                <p className='tag'>From Your Favorite Restaurant</p>
                <button className='mt-16 px-10'>menu</button>
                <div className='lower-caption'>
                    <p>
                        <i className="fa fa-clock-o"></i>
                        <Link to="/shop">
                            24/7 Delivary
                        </Link>
                    </p>
                    <p>
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <Link to="/shop">
                            2500 Restaurant
                        </Link>
                    </p>
                    <p>
                        <i className="fas fa-mobile-alt"></i>
                        <Link to="/shop">
                            Oder with App
                        </Link>
                    </p>
                    <p>
                        <i className="fas fa-truck"></i>
                        <Link to="/shop">
                            Fast Delivary
                       </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Banner