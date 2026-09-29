import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // To handle redirection
import { fetchProductData } from "./API/fetchProductData";

import Product from "./Components/Product";
import Footer from "./Components/Footer";
import DummyProduct from "./Components/DummyProduct";


function Dashboard() {
    const categories = ["Fruits and Vegetables", "Pulses", "Dry Fruits", "Cooking Oil and Ghee", "Flours and Grains", "Rice", "Masala and Spices", "Salt Sugar and Others"];
    const [obj, setObj] = useState([]);
    const navigate = useNavigate();
    const [errorData, setErrorData] = useState([]);

    useEffect(() => {
        // If token exists, fetch product data
        const getData = async () => {
            const dataObj = {};
            for (const category of categories) {
                try {
                    const data = await fetchProductData(category);
                    dataObj[category] = data;
                } catch (error) {
                    // Optional: handle error state here
                    setErrorData(error);
                    //alert(error);
                }
            }
            setObj(dataObj);
        };
        getData();
        //}
    }, []);

    return (
        <div style={{ backgroundColor: "#f2f2f2", paddingTop: "80px" }}>
            <img src="/images/banner1.jpg" alt="Banner loading..." width="100%" height="500px"/>
            {
                categories.map((category) => (
                    <div key={category} >
                        <h3 style={{ color: "black", padding: "10px", textAlign: "left", fontFamily: "cursive" }}>{category}</h3>
                        {errorData.message ?
                            <p style={{textAlign:"left",color:"red",marginLeft:"50px"}}>{"Error : " + errorData.message + ", Backened not reachable!!"}</p>
                            :

                            <div style={{ padding: "10px", paddingTop: "0px", display: 'grid', gridTemplateColumns: "auto auto auto auto auto auto auto auto", gap: "10px" }}>
                                {
                                    (obj[category] || []).slice(0, 7).map((item, idx) => (
                                        <Product key={item._id || idx} id={item._id} image={`${item.category}/${item.image}`} name={item.name} qty={item.qty} price={item.price} page="Dashboard" />
                                    ))
                                }
                                <DummyProduct category={category}/>
                            </div>
                        }
                    </div>

                ))
            }
            <Footer />
        </div>
    );
}

export default Dashboard;