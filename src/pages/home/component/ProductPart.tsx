import { FC, useEffect, useState } from "react";
import Product from "../../../sharedComponent/Product";
import { ProductSchema } from "../../adminPages/addProduct/AddProduct";
import { HomeLoading } from "../Home";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<HomeLoading>>;
  loding: HomeLoading;
}

const ProductPart: FC<Props> = ({ setLoading, loding }) => {
  const [products, setProducts] = useState<ProductSchema[] | null>(null);

  useEffect(() => {
    fetch("https://myserver-production-ddf8.up.railway.app/food/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className='home-product-wrapper'>
      <h2>WHAT'S POPULAR</h2>
      <p className='font-semibold text-gray mb-10 text-sm lg:text-base'>
        Client's Most Popular Choise
      </p>
      <Product products={products} />
    </div>
  );
};

export default ProductPart;
