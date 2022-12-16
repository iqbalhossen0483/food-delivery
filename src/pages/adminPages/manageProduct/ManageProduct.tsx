import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSchema } from "../../../sharedComponent/Product";

const ManageProduct: () => JSX.Element = () => {
  const [prosucts, setProducts] = useState<ProductSchema[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://myserver-production-ddf8.up.railway.app/food/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Recipes</th>
          <th>Tag</th>
          <th>
            <div className='flex justify-center'>
              <button
                onClick={() => navigate("add-product")}
                title='Add Product'
                className='px-2 py-2'
              >
                <i className='fa fa-plus' />
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {prosucts &&
          prosucts.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <img className='h-16' src={item.imgUrl} alt='' />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.recipes}</td>
                <td>
                  <p className='tag'>{item.tag}</p>
                </td>
                <td>
                  <div className='flex justify-center'>
                    <button className='px-2 py-1 text-sm'>
                      <i className='fa fa-edit' />
                    </button>
                    <button className='px-2 py-1 text-sm'>
                      <i className='fa fa-trash' />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default ManageProduct;
