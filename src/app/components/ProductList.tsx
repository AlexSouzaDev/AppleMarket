import React from 'react';

import { trpc } from '../../server/client';


export type ProductProps = {
    sellerEmail: string;
    phoneModel: string;
    capacity: string;
    batteryHealth: number;
    physicalCondition: string;
    deviceFailure: string;
    price: number;
};

const Product: React.FC<ProductProps> = ({
    sellerEmail,
    phoneModel,
    capacity,
    batteryHealth,
    physicalCondition,
    deviceFailure,
    price,
}) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{phoneModel}</h2>
            <p className="text-gray-600 text-sm mb-1">Seller: {sellerEmail}</p>
            <p className="text-gray-600 text-sm mb-1">Capacity: {capacity}</p>
            <p className="text-gray-600 text-sm mb-1">Battery Health: {batteryHealth}%</p>
            <p className="text-gray-600 text-sm mb-1">Condition: {physicalCondition}</p>
            <p className="text-gray-600 text-sm mb-1">Device Failure: {deviceFailure}</p>
            <div className="text-xl font-bold text-blue-600">${price.toFixed(2)}</div>
        </div>
    </div>
);

type ProductListProps = {
    products: ProductProps[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <div className="w-full">
        <h2 className="text-2xl font-bold text-white-800 mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => (
                <Product key={idx} {...product} />
            ))}
        </div>
    </div>
);

export default ProductList;