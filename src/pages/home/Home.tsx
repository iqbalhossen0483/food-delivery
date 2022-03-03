import React from 'react';
import Banner from './component/Banner';
import CategoryPart from './component/CategoryPart';
import HowToOrderPart from './component/HowToOrderPart';
import ProductPart from './component/ProductPart';
import './Home.css';

const Home: () => JSX.Element = () => {
    return (
        <div>
            <Banner />
            <CategoryPart />
            <HowToOrderPart />
            <ProductPart />
        </div>
    );
}

export default Home