"use client";

import React, { createContext, useState } from 'react';

export enum Stage {
    Frutas,
    Verdura,
    Doces,
    Bebidas,
    Mercearia,
}

export type Products = {
    nome: string;
    categoria: Stage;
}

type ContextProducts = {
    produtos: Products[];
    addProduct: (nome: string) => void;
    removeProduct: (index: number) => void;
    changeCategory: (index: number, newStage: Stage) => void;
    setProdutos: React.Dispatch<React.SetStateAction<Products[]>>;
};

export const ProductContext = createContext({} as ContextProducts);

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [produtos, setProdutos] = useState<Products[]>([]);

    const addProduct = (nome: string) => {
        let newProduct = {
            nome,
            categoria: Stage.Bebidas,
        };
        setProdutos([...produtos, newProduct]);
    };

    const removeProduct = (index: number) => {
        setProdutos(produtos.filter((_, idx) => idx !== index));
    };

    const changeCategory = (index: number, newStage: Stage) => {
        let updatedProducts = [...produtos];
        updatedProducts[index].categoria = newStage;
        setProdutos(updatedProducts);
    };

    return (
        <ProductContext.Provider value={{ produtos, addProduct, removeProduct, changeCategory, setProdutos }}>
            {children}
        </ProductContext.Provider>
    );
};
