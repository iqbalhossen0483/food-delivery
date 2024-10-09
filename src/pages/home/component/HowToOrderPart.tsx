import { FC, useEffect, useState } from "react";
import { HomeLoading } from "../Home";

interface OrderProcess {
  img: string;
  step: string;
  smg: string;
}
interface Props {
  setLoading: React.Dispatch<React.SetStateAction<HomeLoading>>;
  loding: HomeLoading;
}

const HowToOrderPart: FC<Props> = ({ setLoading, loding }) => {
  const [orderProcess, setOrderProcess] = useState<OrderProcess[] | null>(null);

  useEffect(() => {
    fetch("https://server.switchcafebd.com/food/orderProcess")
      .then((res) => res.json())
      .then((data) => {
        setOrderProcess(data);
      });
  }, []);

  return (
    <div className='how-to-order-wrapper'>
      <h2>HOW TO ORDER?</h2>
      <p className='font-semibold pb-10 text-gray'>Follow the Steps</p>
      <div className='step'>
        {orderProcess &&
          orderProcess.map((item) => {
            return (
              <div key={item.step}>
                <img className='h-24 w-24 mx-auto' src={item.img} alt='' />
                <p className='count'>{item.step}</p>
                <p className='text-xl mb-20'>{item.smg}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HowToOrderPart;
