import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import { OrderSchema } from '../../placeOrder/PlaceOrder';
import SeeProduct from './SeeProduct';


const ManageOrder = () => {
    const [orders, setOrders] = useState<OrderSchema[] | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [id, setId] = useState<string | undefined>(undefined);
    const auth = useAuth();

    const idToken: string = localStorage.getItem("idToken") || "";
    const email: string = auth?.user?.email || "";

    useEffect(() => {
        fetch("https://fooddelivery-server.herokuapp.com/orders", {
            headers: {
                "authorize": idToken,
                "email":email
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, []);

    function handleProductDetails(id:string | undefined) {
        if (show) {
            setShow(false);
            setId(undefined);
        }
        else {
            setShow(true);
            setId(id);
        }
    }
    
    return (
        <div className='manage-order'>
            <div className="header">
                <p>Users Name</p>
                <p>Product Id</p>
                <p>Users Details</p>
                <p></p>
            </div>
            {orders &&
                orders.map(item => {
                    return (
                        <div className='order' key={item._id}>
                            <p>{item.name}</p>
                            <p className='productId'>{item.productId}</p>
                            <div>
                                <p>{item.distict}</p>
                                <p>{item.policeStation}</p>
                                <p>{item.road}</p>
                                <p>{item.phone}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleProductDetails(item.productId)}
                                    className='text-sm px-3 py-1'>
                                    see product
                                </button>
                                <select name="action">
                                    <option value="Pending"> Pending</option>
                                    <option value="Approved"> Approved</option>
                                    <option value="Proccessing">
                                        Proccessing
                                    </option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancel">Cancel</option>
                                </select>
                            </div>
                        </div>
                    )
                })
            }

            {show &&
                <SeeProduct id={id} setShow={setShow} />
            }
        </div>
    );
}

export default ManageOrder