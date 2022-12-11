import { useState } from "react";
import { useForm } from "react-hook-form";

export interface categorySchema {
  name: string;
  tag: string;
  img: ArrayLike<FileList[0]>;
  imgUrl: string;
  imgId: string;
}

const AddCategory: () => JSX.Element = () => {
  const { register, handleSubmit, reset } = useForm<categorySchema>();
  const [loading, setLoading] = useState<boolean>(false);

  function onSubmit(data: categorySchema): void {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tag", data.tag);
    formData.append("img", data.img[0]);

    fetch(
      "https://myserver-production-ddf8.up.railway.app/food/products/category",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Upload successfull");
          reset();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <form className='add-category' onSubmit={handleSubmit(onSubmit)}>
      <h2>Add A Category</h2>

      <label htmlFor='name'>Category Name:</label>
      <input
        {...register("name", { required: true })}
        type='text'
        placeholder='Enter category name'
      />

      <label htmlFor='tag'>Tag Line:</label>
      <input
        {...register("tag", { required: true })}
        type='text'
        placeholder='Enter tag line'
      />

      <label htmlFor='img'>Category Image:</label>
      <input
        className='border-none'
        {...register("img", { required: true })}
        type='file'
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

export default AddCategory;
