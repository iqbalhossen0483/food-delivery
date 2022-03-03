import { useEffect, useState } from "react";

interface OrderProcess{
    img: string,
    step: string,
    smg: string
}

const HowToOrderPart: () => JSX.Element = () => {
    const [orderProcess, setOrderProcess] = useState<OrderProcess[] | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/orderProcess")
            .then(res => res.json())
            .then(data => setOrderProcess(data))
    }, []);

    return (
        <div className='how-to-order-wrapper'>
            <h2>HOW TO ORDER?</h2>
            <p className='font-semibold pb-10 text-gray'>
                Follow the Steps
            </p>
            <div className='step'>
                {orderProcess &&
                    orderProcess.map(item => {
                        return (
                            <div key={item.step}>
                                <img
                                    className='h-24 w-24 mx-auto'
                                    src={item.img}
                                    alt=""
                                />
                                <p className='count'>{item.step}</p>
                                <p className='text-xl mb-20'>{item.smg}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default HowToOrderPart