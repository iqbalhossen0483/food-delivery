import { FC } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';

interface Props{
    setShowCart: (active: boolean)=> void
}

const Menus: FC<Props> = ({setShowCart}) => {
    const auth = useAuth();
    
    return (
        <div className='header menus items-center'>
            <Link to="/shop">SHOP</Link>
            <Link to="/">FEATURES</Link>
            <Link to="/">BLOG</Link>
            <Link to="/">MENUS</Link>
            <Link to="/">CONTACTS</Link>
            {auth?.user?.email && auth.userFromDb?.role === "admin" &&
                <Link to="/deshboard">DESHBOARD</Link>
            }
            
            <div className='cart'>
                <i
                    onClick={()=>setShowCart(true)}
                    title="Added Products"
                    className="fa fa-shopping-cart"
                    aria-hidden="true"
                />
                <span className='count'>{ auth?.userFromDb?.cart?.length || 0 }</span>
            </div>
            {auth?.user?.photoURL ?
                <img
                    className='h-10 w-10 ml-4 rounded-full'
                    src={auth?.user?.photoURL}
                    alt=""
                />
                :
                <span className="ml-3 font-semibold">
                    {auth?.user?.displayName?.split(" ")[0]}
                </span>
            }
            {auth?.user &&
                <i
                    title="Log Out"
                    onClick={auth.logOUt}
                    className="fa fa-sign-out" aria-hidden="true"
                />
            }
        </div>
    );
}

export default Menus