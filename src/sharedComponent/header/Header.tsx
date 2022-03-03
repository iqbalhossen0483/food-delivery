import React, { useState } from 'react';
import Menus from './component/Menus';
import { Link } from 'react-router-dom';
import TopContactInfo from './component/TopContactInfo';
import "./Header.css";
import useAuth from '../../hooks/useAuth';
import CartProduct from './component/CartProduct';

const Header: () => JSX.Element = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showMobile, setMobile] = useState<boolean>(false);
  const [stiky, setStiky] = useState<boolean>(false);

  function makeStiky(): void {
    if (window.scrollY > 35) setStiky(true);
    else setStiky(false);
  }

  window.addEventListener("scroll", makeStiky);

  function toggleMenu() {
    if (showMobile) setMobile(false);
    else setMobile(true);
  }

  return (
    <div>
      <TopContactInfo />
      <div className={`header-container ${stiky && "stikemod"}`}>
        <i
          onClick={toggleMenu}
          className="fas fa-bars text-xl md:hidden"
        />
        <Link to="/">
          <img
            className='h-12 w-28'
            src="https://i.ibb.co/5MbByQn/logo-7.png" alt=""
          />
        </Link>

        {/* for desktop view */}
        <div className='hidden md:block'>
          <Menus setShowCart={setShowCart} />
        </div>

        {showCart &&
          <CartProduct setShowCart={setShowCart} />
        }

        {/* mobile view */}
        <div className={`mobile-view ${showMobile ? "block" : "hidden"}`}>
          <Menus setShowCart={setShowCart} />
        </div>
      </div>
    </div>
  );
}

export default Header