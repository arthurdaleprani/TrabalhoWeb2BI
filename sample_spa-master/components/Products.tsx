"use client";

import React, { useContext, useState, useEffect } from 'react';
import { ProductContext, Products, Stage } from "@/context/ProductsContex";
import Select from 'react-dropdown-select';
import { request } from '@/services/request';

const ListProduct = () => {
    const { produtos, setProdutos, removeProduct } = useContext(ProductContext);
    const [selectedTab, setSelectedTab] = useState(Stage.Bebidas);

    const options = Object.keys(Stage)
        .filter((item) => isNaN(Number(item)))
        .map((item) => ({
            label: item,
            value: Stage[item as keyof typeof Stage]
        }));

    const deleteProduct = async (index: number) => {
        try {
            const response = await request(`http://127.0.0.1:5000/products/${index}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9pIiwiaWF0IjoxNzE4MzI0NjUzfQ.V6ewEFTfTdzoJf8DULI9yVE7c8WKI2fPoV5FE8xsqs0', 
                    'isAdmin': 'true'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });

            if (response == true) {
                removeProduct(index);
            } else {
                console.error('Erro ao deletar produto');
            }
        } catch (error) {
            console.error('Erro ao realizar a requisição', error);
        }
    };

    const listProducts = async () => {
        try {
            const response = await request(`http://127.0.0.1:5000/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9pIiwiaWF0IjoxNzE4MzI0NjUzfQ.V6ewEFTfTdzoJf8DULI9yVE7c8WKI2fPoV5FE8xsqs0', 
                    'isAdmin': 'true'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });

            
        } catch (error) {
            console.error('Erro ao realizar a requisição', error);
        }
    };

    useEffect(() => {
        listProducts();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-4 text-xl font-semibold text-gray-600">
                Lista de Produtos
            </h2>
            <div className='flex gap-2 text-gray-700 mb-4'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTab(option.value)}
                        className={selectedTab === option.value ? 'active-tab' : ''}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <ul className="max-w-md space-y-1 text-gray-700 text-center mb-4">
                {produtos.map((product: Products, index: number) => (
                    <li className={`flex justify-between gap-2 mb-2 ${product.categoria !== selectedTab && selectedTab !== Stage.Bebidas ? 'hidden' : ''}`} key={index}>
                        {product.nome}
                        <button onClick={() => deleteProduct(index)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListProduct;
