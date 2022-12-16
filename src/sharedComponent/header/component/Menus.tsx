import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

interface Props {
  setShowCart: (active: boolean) => void;
}

const Menus: FC<Props> = ({ setShowCart }) => {
  const auth = useAuth();

  useEffect(() => {
    fetch(``);
  }, []);

  return (
    <div className='header menus items-start pl-5 md:pl-0 md:items-center'>
      <Link to='/shop'>MENUS</Link>
      <Link to='/'>FEATURES</Link>
      <Link to='/'>BLOG</Link>
      <Link to='/'>CONTACTS</Link>
      {auth?.user?.email && auth.user?.role === "admin" && (
        <Link to='/admin'>DESHBOARD</Link>
      )}
      <div className='flex items-center py-5 md:py-0'>
        <div className='cart'>
          <i
            onClick={() => setShowCart(true)}
            title='Added Products'
            className='fa fa-shopping-cart'
            aria-hidden='true'
          />
          <span className='count'>{auth?.user?.cart?.length || 0}</span>
        </div>
        {auth?.user?.photoURL ? (
          <img
            className='h-10 w-10 ml-4 rounded-full'
            src={auth?.user?.photoURL}
            alt=''
          />
        ) : (
          <span className='ml-3 font-semibold'>
            {auth?.user?.displayName?.split(" ")[0]}
          </span>
        )}
        {auth?.user && (
          <i
            title='Log Out'
            onClick={auth.logOUt}
            className='fa fa-sign-out'
            aria-hidden='true'
          />
        )}
      </div>
    </div>
  );
};

export default Menus;
