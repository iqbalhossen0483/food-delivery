import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { OrderSchema } from "../../placeOrder/PlaceOrder";

const MyOrder: () => JSX.Element = () => {
  const [order, setOrder] = useState<OrderSchema[] | null>(null);
  const [productIds, setProductIds] = useState<string[] | null>(null);
  const auth = useAuth();

  const idToken: string = localStorage.getItem("idToken") || "";

  useEffect(() => {
    fetch(
      `https://myserver-production-ddf8.up.railway.app/food/orders/${auth?.user?.email}`,
      {
        headers: {
          authorize: idToken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, []);

  useEffect(() => {
    let ids: string[] = [];
    order?.forEach((item) => {
      if (item.productId) ids.push(item.productId);
    });
    setProductIds(ids);
  }, [order]);

  console.log(productIds);
  return (
    <div className='my-order'>
      <h2>
        You have {order?.length || 0} order
        {order?.length && order.length > 1 ? "s" : ""}
      </h2>
      <button
        disabled={order?.length === 0}
        className='text-base py-1 px-4 ml-5'
      >
        Let's see
        <span className='icon'>&#8594;</span>
      </button>
    </div>
  );
};

export default MyOrder;
