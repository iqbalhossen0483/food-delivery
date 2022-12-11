import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSchema } from "../addProduct/AddProduct";

const ManageProduct: () => JSX.Element = () => {
  const [prosucts, setProducts] = useState<ProductSchema[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://myserver-production-ddf8.up.railway.app/food/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className='manage-product'>
      <div className='header'>
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Recipes</p>
        <p>Tag</p>
        <div className='flex justify-end'>
          <p
            onClick={() => navigate("/deshboard/add-product")}
            title='Add Product'
            className='plus'
          >
            &#43;
          </p>
        </div>
      </div>
      {prosucts &&
        prosucts.map((item) => {
          return (
            <div className='product' key={item._id}>
              <img src={item.imgUrl} alt='' />
              <p className='name'>{item.name}</p>
              <p className='price'>{item.price}</p>
              <p className='recipes'>{item.recipes}</p>
              <div>
                <p className='tag'>{item.tag}</p>
              </div>
              <div className='action'>
                <button>update</button>
                <button>delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ManageProduct;
