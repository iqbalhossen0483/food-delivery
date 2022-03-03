import React, { useState } from 'react';
import Menus from './component/Menus';
import { Link } from 'react-router-dom';
import TopContactInfo from './component/TopContactInfo';
import "./Header.css";
import useAuth from '../../hooks/useAuth';
import CartProduct from './component/CartProduct';

const Header: () => JSX.Element = () => {
  const [stiky, setStiky] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);

  function makeStiky(): void {
    if (window.scrollY > 35) setStiky(true);
    else setStiky(false);
  }

  window.addEventListener("scroll", makeStiky);

  return (
    <div>
      <TopContactInfo />
      <div className={`header-container ${stiky && "stikemod"}`}>
        <Link to="/">
          <img
            className='h-12 w-28'
            src="https://i.ibb.co/5MbByQn/logo-7.png" alt=""
          />
        </Link>
        <Menus setShowCart={setShowCart} />

        {showCart &&
          <CartProduct setShowCart={setShowCart} />
        }
      </div>
    </div>
  );
}

export default Header