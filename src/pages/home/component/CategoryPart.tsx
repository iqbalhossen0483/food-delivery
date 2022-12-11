import { FC, useEffect, useState } from "react";
import { categorySchema } from "../../adminPages/addCategory/AddCategory";
import { HomeLoading } from "../Home";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<HomeLoading>>;
  loding: HomeLoading;
}

const CategoryPart: FC<Props> = ({ setLoading, loding }) => {
  const [categories, setCategories] = useState<categorySchema[] | null>(null);

  useEffect(() => {
    fetch(
      "https://myserver-production-ddf8.up.railway.app/food/products/category"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className='category-section'>
      <h2 className='header'>
        MORE THAN
        <span className='text-primary'> 20,000 DISHES </span>
        TO ORDER!
      </h2>
      <p className='font-semibold text-sm md:text-base text-gray my-4'>
        Welcome to The Biggest Network of Food Ordering & Delivery
      </p>
      <div className='category'>
        {categories &&
          categories?.map((item: categorySchema) => {
            return (
              <div className='item' key={item.name}>
                <img
                  className='rounded-t-2xl w-full'
                  src={item.imgUrl}
                  alt=''
                />
                <h2>{item.name}</h2>
                <p className='text-gray'>{item.tag}</p>
              </div>
            );
          })}
      </div>
      <div className='md:flex justify-center items-center mt-16'>
        <p className='mr-5 text-gray font-semibold'>
          and much more your favorite food
        </p>
        <button className='md:py-1 md:mx-3 mt-3 md:mt-0'>
          MORE CATEGORIES
        </button>
      </div>
    </div>
  );
};

export default CategoryPart;
