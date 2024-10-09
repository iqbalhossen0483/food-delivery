import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { ProductSchema } from "../../../sharedComponent/Product";

interface Order {
  _id: string;
  product: ProductSchema[];
}

const MyOrder: () => JSX.Element = () => {
  const [order, setOrder] = useState<Order[] | null>(null);
  const auth = useAuth();

  useEffect(() => {
    fetch(`https://server.switchcafebd.com/food/orders/${auth?.user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [auth?.user?.email]);

  return (
    <>
      {order?.length ? (
        <div className='overflow-auto'>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      className='h-16 mx-auto'
                      src={item.product[0].imgUrl}
                      alt=''
                    />
                  </td>
                  <td>{item.product[0].name}</td>
                  <td>
                    <button className='mx-auto'>
                      <i className='fa fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='no-order'>
          <h2>
            You have {order?.length || 0} order
            {order?.length && order.length > 1 ? "s" : ""}
          </h2>
          <button
            disabled={order?.length === 0}
            className='text-base py-1 px-4 ml-5'
          >
            Let's Order Something
            <span className='icon'>&#8594;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default MyOrder;
