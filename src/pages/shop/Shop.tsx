import React, { useEffect, useState } from "react";
import Product from "../../sharedComponent/Product";
import { ProductSchema } from "../adminPages/addProduct/AddProduct";

const Shop: () => JSX.Element = () => {
  const [products, setProducts] = useState<ProductSchema[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://myserver-production-ddf8.up.railway.app/food/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center h-96'>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className='lg:py-20 px-10'>
      <Product products={products} />
    </div>
  );
};

export default Shop;
