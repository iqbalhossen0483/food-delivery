import React, { useEffect, useState } from "react";
import Product, { ProductSchema } from "../../sharedComponent/Product";

const Shop: () => JSX.Element = () => {
  const [products, setProducts] = useState<ProductSchema[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://server.switchcafebd.com/food/products")
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
