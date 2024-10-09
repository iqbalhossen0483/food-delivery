import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ProductSchema } from "../../sharedComponent/Product";

export interface OrderSchema {
  _id: string;
  name: string;
  email: string;
  productId: string | undefined;
  phone: number;
  distict: string;
  policeStation: string;
  road: string;
}

const PlaceOrder: () => JSX.Element = () => {
  const { register, handleSubmit, reset } = useForm<OrderSchema>();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductSchema | undefined>(undefined);
  const auth = useAuth();
  const name: string = auth?.user?.displayName!;
  const email: string = auth?.user?.email!;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`https://server.switchcafebd.com/food/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  function onSubmit(data: OrderSchema): void {
    setLoading(true);
    data.name = name;
    data.email = email;
    data.productId = product?._id;
    fetch("https://server.switchcafebd.com/food/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Order placed successfully");
          reset();
          navigate("/");
        }
        setLoading(false);
      });
  }

  return (
    <form className='place-order w-2/5' onSubmit={handleSubmit(onSubmit)}>
      <h2>Place Order</h2>

      <label htmlFor='name'>User Name:</label>
      <input {...register("name")} disabled defaultValue={name} type='text' />

      <label htmlFor='email'>Email:</label>
      <input
        {...register("email")}
        disabled
        defaultValue={email}
        type='email'
      />

      <label htmlFor='phone'>Phone:</label>
      <input
        {...register("phone", { required: true })}
        type='number'
        placeholder='Enter Phone number'
      />
      <label htmlFor='distict'>Distict:</label>
      <input
        {...register("distict", { required: true })}
        type='text'
        placeholder='Enter Distict'
      />

      <label htmlFor='policeStation'>Police Station:</label>
      <input
        {...register("policeStation", { required: true })}
        type='text'
        placeholder='Enter Police Station'
      />

      <label htmlFor='road'>Road/Moholla:</label>
      <input
        {...register("road", { required: true })}
        type='text'
        placeholder='Enter Road no./Moholla'
      />

      <button
        className='w-32 py-1 mx-auto col-span-3 mt-7 bg-primary hover:text-primary'
        disabled={loading}
        type='submit'
      >
        Submit
      </button>
    </form>
  );
};

export default PlaceOrder;
