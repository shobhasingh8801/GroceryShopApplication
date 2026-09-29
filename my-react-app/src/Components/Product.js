import { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import axios from "axios";

import "./css/product.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

function Product(props) {
    const { addToCart, admin } = useContext(CartContext);
    const initialCount = props.count ? props.count : 0;
    const [count, setCount] = useState(initialCount);

    const increment = () => {
        setCount(prev => {
            const newCount = prev + 1;
            //addToCart({ ...props, count: newCount});
            addToCartFn(newCount);
            return newCount;
        });
    };

    const decrement = () => {
        setCount(prev => {
            const newCount = prev - 1;
            //addToCart({ ...props, count: newCount });
            addToCartFn(newCount);
            return newCount;
        });
    };

    const addToCartFn = (newCount) => {
        addToCart({ ...props, count: newCount });
    }

    const handleAddClick = () => {
        // console.log("Adding to cart:", props.name);
        increment(); // Start count from 0 on first Add click
        // addToCart({
        //     id: props.id,     // Ensure you have a unique identifier
        //     name: props.name,
        //     qty: props.qty,
        //     price: props.price,
        //     image: props.image,
        //     count:props.count
        // });
    };

    const updateData = (event) => {
        alert("Currently update feature not available please delete the product and add again with correct data!!");
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8080/products/${props.id}`);

            if (response.status === 200 || response.status === 204) {
                alert("Product deleted successfully!");
                // Notify parent to remove the product from UI
                if (props.onDelete) {
                    props.onDelete(props.id);
                }
            } else {
                console.error("Failed to delete the product. Status:", response.status);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Something went wrong while deleting the product.");
        }
    };



    return (
        <div className="product-template">
            {/* <img src={process.env.PUBLIC_URL + "./images/" + props.image} alt="Loading..."/> */}
            <img src={"http://localhost:8080/images/" + props.image} alt="Loading..." />
            <div className="product-content">
                <p style={{ margin: "1px" }}>{props.name}</p>
                <p style={{ margin: "1px", color: "gray", fontSize: "12px" }}>{props.qty}</p>
                <div className="button-grid" >
                    <div>
                        <button> ₹{props.price}</button>
                    </div>
                    {
                    // (props.page && props.page === "Dashboard") || (
                        props.count > 0 ?
                            <div className={`add-btn-grid blue-style`}>
                                <button className="cursor" onClick={decrement} >-</button>
                                <button className="product-counter">{props.count}</button>
                                <button className="cursor" onClick={increment}>+</button>
                            </div>
                            : (
                                (count < 1) ?
                                    <div className="add-btn-grid">
                                        <button className="cursor add" onClick={handleAddClick}>Add</button>
                                    </div>
                                    :
                                    <div className={`add-btn-grid blue-style`}>
                                        <button className="cursor" onClick={decrement} >-</button>
                                        <button className="product-counter">{count}</button>
                                        <button className="cursor" onClick={increment}>+</button>
                                    </div>)
                    // )
                    }
                </div>
                {(props.page && props.page === "Dashboard") || (
                    (admin) &&
                    <>
                        <span className="update" onClick={updateData}><FontAwesomeIcon icon={faPencil} /></span>
                        <span className="delete" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></span>
                    </>
                )
                }
            </div>
        </div>
    );
}

export default Product;