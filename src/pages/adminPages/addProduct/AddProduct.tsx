import { useState } from 'react'
import { useForm } from 'react-hook-form';

export interface ProductSchema {
    _id: string,
    name: string,
    img: ArrayLike<FileList[0]>,
    imgUrl: string,
    imgId: string,
    tag: string,
    recipes: string,
    price: string
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
        formData.append('img', data.img[0]);
        
        fetch("https://fooddelivery-server.herokuapp.com/products", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("product upload successfull");
                    reset();
                    setLoading(false);
                }
            })
        .catch(err=> setLoading(false))
    }

    return (
        <form
            className='add-product'
            onSubmit={handleSubmit(onSubmit)}>
            <h2>Add A Product</h2>

            <label htmlFor="name">Product Name:</label>
            <input
                {...register("name", { required: true })}
                type="text"
                placeholder='Enter category name'
            />

            <label htmlFor="tag">Tags:</label>
            <input
                {...register("tag", { required: true })}
                type="text"
                placeholder='Enter tags'
            />

            <label htmlFor="recipes">Recipes:</label>
            <input
                {...register("recipes", { required: true })}
                type="text"
                placeholder='Enter recipes'
            />

            <label htmlFor="price">Price:</label>
            <input
                {...register("price", { required: true })}
                type="number"
                placeholder='Enter price'
            />

            <label htmlFor="img">Product Image:</label>
            <input
                className='border-none'
                {...register("img", { required: true })}
                type="file"
            />
            
            <button
                className='w-32 py-1 mx-auto col-span-3 mt-7 bg-primary hover:text-primary'
                disabled={loading}
                type='submit'>
                Submit
            </button>
        </form>
    );
}

export default AddProduct