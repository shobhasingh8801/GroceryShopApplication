import React, { useEffect, useState, useContext } from "react";
import { fetchProductData } from "../API/fetchProductData";

import Footer from "../Components/Footer";
import Product from "../Components/Product";

import { CartContext } from '../CartContext';

function FruitsVeg() {

    const [obj, setObj] = useState([]);
    const { cartItems } = useContext(CartContext);
    const [errorData, setErrorData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchProductData("Fruits and Vegetables");
                console.log("Product Fetched:", data);
                setObj(data);
            } catch (error) {
                // Optional: handle error state here
                setErrorData(error);
            }
        };

        getData();
    }, []);

    // This function will be called when a product is deleted
    const handleProductDelete = (deletedId) => {
        setObj(prevProducts => prevProducts.filter(product => product._id !== deletedId));
    };

    return (
        <div style={{ backgroundColor: "#f2f2f2" }}>
            {errorData.message ?
                <p style={{paddingTop: "100px", color: "red", marginLeft: "50px" }}>{"Error : " + errorData.message + ", Backened not reachable!!"}</p>
                :
                <div style={{ padding: "10px", paddingTop: "100px", display: 'grid', gridTemplateColumns: "auto auto auto auto auto auto auto auto", gap: "10px" }}>
                    {
                        obj.map((data, index) => {
                            const count = cartItems.find(items => items.id === data._id)?.count || 0;
                            return (
                                <Product id={data._id} image={data.category + "/" + data.image} name={data.name} qty={data.qty} price={data.price} onDelete={handleProductDelete} count={count} />
                            )
                        })
                    }
                </div>
            }
            <Footer />
        </div>
    )
}

export default FruitsVeg;