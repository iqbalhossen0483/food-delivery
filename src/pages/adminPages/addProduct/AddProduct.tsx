import { useState } from "react";
import { useForm } from "react-hook-form";

interface ProductSchema {
  name: string;
  img: ArrayLike<FileList[0]>;
  tag: string;
  recipes: string;
  price: string;
}

const AddProduct: () => JSX.Element = () => {
  const { register, handleSubmit, reset } = useForm<ProductSchema>();
  const [loading, setLoading] = useState<boolean>(false);

  function onSubmit(data: ProductSchema): void {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tag", data.tag);
    formData.append("recipes", data.recipes);
    formData.append("price", data.price);
    formData.append("img", data.img[0]);

    fetch("https://server.switchcafebd.com/food/products", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.insertedId) {
          alert("product upload successfull");
          reset();
        } else Error(data.message);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <form className='add-product' onSubmit={handleSubmit(onSubmit)}>
      <h2>Add A Product</h2>

      <div className='input-wrap'>
        <input
          {...register("name", { required: true })}
          type='text'
          required
          placeholder='Enter category name'
        />
        <label htmlFor='name'>Product Name:</label>
      </div>

      <div className='input-wrap'>
        <input
          {...register("tag", { required: true })}
          type='text'
          required
          placeholder='Enter tags. Like a | b | c'
        />
        <label htmlFor='tag'>Tags:</label>
      </div>

      <div className='input-wrap'>
        <input
          {...register("recipes", { required: true })}
          type='text'
          required
          placeholder='Enter recipes'
        />
        <label htmlFor='recipes'>Recipes:</label>
      </div>

      <div className='input-wrap'>
        <input
          {...register("price", { required: true })}
          type='number'
          required
          placeholder='Enter price'
        />
        <label htmlFor='price'>Price:</label>
      </div>

      <div className='input-wrap'>
        <input
          className='border-none px-0'
          {...register("img", { required: true })}
          required
          type='file'
        />
        <label htmlFor='img'>Product Image:</label>
      </div>

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

export default AddProduct;
