import React from "react";
import axios from "axios";
import { useState } from "react";

import { Link } from "react-router-dom";

import Product from "./Product";
import Footer from "./Footer";
import './css/addProduct.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function AddProdcut() {

    const [product, setProduct] = useState({
        category: "",
        name: "",
        qty: "",
        price: "",
        image: "",
    });

    const handleChange = (event) => {
        let eventName = event.target.name;
        let eventValue = event.target.value;
        if (eventName == "image") {
            eventValue = document.getElementById("image").files[0];   //only to take file name not path
        }

        let upadatedData = { ...product, [eventName]: eventValue };
        console.log(upadatedData);
        setProduct(upadatedData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', product.name);
        data.append('category', product.category);
        data.append('qty', product.qty);
        data.append('price', product.price);
        data.append('image', product.image); // must match field used in `upload.single('image')`


        try {
            const response = await axios.post("http://localhost:8080/addProduct", data);
            // Success feedback
            //alert(response.data.message);
            document.getElementById("message").innerHTML = "Product Added Successfully!";
            document.getElementById("message").style.color = "green";
        } catch (error) {
            // Error handling
            var msg="";
            if (error.response) {
                msg = (error.response.data.message) ? error.response.data.message : error.message;
                document.getElementById("message").innerHTML = msg;
            } else if (error.request) {
                document.getElementById("message").innerHTML = "Network Error: No response from server";
            } else {
                document.getElementById("message").innerHTML = "Error: " + error.message;
            }
            document.getElementById("message").style.color = "red";
        }

        setTimeout(() => {
            document.getElementById("message") && (document.getElementById("message").innerHTML="");
        }, 3000);
        shakeText();
    }

    function shakeText() {
        const text = document.getElementById('message');
        text.classList.remove('shake'); // Reset in case it's already shaking
        void text.offsetWidth; // Trigger reflow to restart animation
        text.classList.add('shake');
    }

    return (
        <div>
            <div className="add-product" style={{backgroundImage: "url(/images/bg.jpg)" }}>
                <h4>Add Product</h4>
                <form onSubmit={handleSubmit} >
                    <div id="message"></div>
                    <select name="category" required value={product.category} onChange={handleChange}>
                        <option value="">----Select Category----</option>
                        <option value="Fruits and Vegetables">Fruits and Vegetables</option>
                        <option value="Pulses">Pulses</option>
                        <option value="Dry Fruits">Dry Fruits</option>
                        <option value="Cooking Oil and Ghee">Cooking Oil and Ghee</option>
                        <option value="Flours and Grains">Flours and Grains</option>
                        <option value="Rice">Rice</option>
                        <option value="Masala and Spices">Masala and Spices</option>
                        <option value="Salt Sugar and Others">Salt Sugar and Others</option>
                    </select>
                    <input type="text" name="name" placeholder="Name of the Product" required minlength="2" maxlength="50" pattern="[A-Za-z\s]+" title="Name should contain only letters, spaces, minimum 2 charaters and maximum 50 characters only." value={product.name} onChange={handleChange} /><br></br>
                    <input type="text" name="qty" placeholder="Quantity of the Product" required value={product.qty} onChange={handleChange} /><br></br>
                    <input type="number" name="price" placeholder="Price of the Product" required value={product.price} onChange={handleChange} /><br></br>

                    <input type="file" name="image" id="image" required onChange={handleChange} /><br></br>


                    <button><FontAwesomeIcon icon={faCirclePlus} /> Add Product</button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

export default AddProdcut;