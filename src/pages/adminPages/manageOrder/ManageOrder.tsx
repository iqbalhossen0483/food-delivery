import { useEffect, useState } from "react";
import { OrderSchema } from "../../placeOrder/PlaceOrder";
import SeeProduct from "./SeeProduct";

const ManageOrder = () => {
  const [orders, setOrders] = useState<OrderSchema[] | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch("https://myserver-production-ddf8.up.railway.app/food/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  function handleProductDetails(id: string | undefined) {
    if (show) {
      setShow(false);
      setId(undefined);
    } else {
      setShow(true);
      setId(id);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Users Name</th>
          <th>Users Details</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders?.length &&
          orders.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <div>
                    <p>{item.distict}</p>
                    <p>{item.policeStation}</p>
                    <p>{item.road}</p>
                    <p>{item.phone}</p>
                  </div>
                </td>
                <td>
                  <div className='flex items-center gap-1 justify-center'>
                    <button
                      onClick={() => handleProductDetails(item.productId)}
                      className='text-sm px-3 py-1'
                    >
                      <i className='fa fa-eye'></i>
                    </button>
                    <select className='bg-transparent focus:outline-none'>
                      <option value='Pending'> Pending</option>
                      <option value='Approved'> Approved</option>
                      <option value='Proccessing'>Proccessing</option>
                      <option value='Delivered'>Delivered</option>
                      <option value='Cancel'>Cancel</option>
                    </select>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>

      {show && <SeeProduct id={id} setShow={setShow} />}
    </table>
  );
};

export default ManageOrder;
