import React, { useState } from 'react';
import Banner from './component/Banner';
import CategoryPart from './component/CategoryPart';
import HowToOrderPart from './component/HowToOrderPart';
import ProductPart from './component/ProductPart';
import './Home.css';

export interface HomeLoading{
    category: boolean,
    howToOrder: boolean,
    product: boolean
}

const Home: () => JSX.Element = () => {
    const [loding, setLoading] = useState<HomeLoading>({ category: true, howToOrder: true, product: true });

    
    return (
        <div>
            <Banner />
            <CategoryPart setLoading={setLoading} loding={loding}  />
            <HowToOrderPart setLoading={setLoading} loding={loding} />
            <ProductPart setLoading={setLoading} loding={loding} />
        </div>
    );
}

export default Home