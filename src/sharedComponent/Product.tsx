import { ProductSchema } from "../pages/adminPages/addProduct/AddProduct";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";

interface Props {
  products: ProductSchema[] | null;
}

const Product: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  function cartProduct(id: string) {
    if (!auth?.user) return navigate("/login");
    if (auth?.user?.cart?.length) {
      const exist = auth.user.cart.find((item) => item === id);
      if (exist) {
        return alert("Product already added");
      }
    }
    const url = `https://myserver-production-ddf8.up.railway.app/food/users/${auth.user.email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Product added");
        }
      });
  }

  return (
    <div className='product-container'>
      {products &&
        products.map((item: ProductSchema) => {
          return (
            <div key={item.name} className='product'>
              <img className='rounded-t-2xl w-full' src={item.imgUrl} alt='' />
              <div className='px-3 pt-2'>
                <p className='tag'>{item.tag}</p>
                <p className='name'>{item.name}</p>
                <p className='price'>{item.price}</p>
                <p className='recipes'>{item.recipes}</p>
                <div className='flex flex-col items-center'>
                  <button
                    onClick={() => cartProduct(item._id)}
                    className='text-sm my-5'
                  >
                    <i
                      className='fa fa-shopping-cart mr-3'
                      aria-hidden='true'
                    ></i>
                    add to cart
                  </button>
                  <button
                    onClick={() => navigate(`/place-order/${item._id}`)}
                    className='text-sm'
                  >
                    order now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Product;
