import { useEffect, useState } from 'react'
import Product from '../../../sharedComponent/Product'
import { ProductSchema } from '../../adminPages/addProduct/AddProduct';

const ProductPart: () => JSX.Element = () => {
  const [products, setProducts] = useState<ProductSchema[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data=> setProducts(data))
  },[])

  return (
      <div className='home-product-wrapper'>
          <h2>WHAT'S POPULAR</h2>
          <p className='font-semibold text-gray mb-10'>
              Client's Most Popular Choise
          </p>
          <Product products={products} />
    </div>
  )
}

export default ProductPart