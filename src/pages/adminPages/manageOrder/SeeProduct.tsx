import React, { useEffect, useState } from "react";
import { ProductSchema } from "../../../sharedComponent/Product";

interface Props {
  id: string | undefined;
  setShow: (active: boolean) => void;
}

const SeeProduct: React.FC<Props> = ({ id, setShow }) => {
  const [product, setProduct] = useState<ProductSchema | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://server.switchcafebd.com/food/products/${id}`)
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) setProduct(data);
          else Error(data.message);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <div onClick={() => setShow(false)} className='product-in-manage-order'>
      {product ? (
        <div onClick={(e) => e.stopPropagation()} className='product'>
          <img
            className='w-full mb-2 rounded-t h-2/5'
            src={product?.imgUrl}
            alt=''
          />
          <div className='px-3'>
            <p className='tag'>{product?.tag}</p>
            <p className='name'>{product?.name}</p>
            <p className='recipes'>{product?.recipes}</p>
          </div>
        </div>
      ) : (
        <p className='text-white'>No Product found</p>
      )}
    </div>
  );
};

export default SeeProduct;
