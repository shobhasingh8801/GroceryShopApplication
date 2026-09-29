import { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import axios from "axios";

import { Link, NavLink, Outlet } from 'react-router-dom';

import "./css/dummyProduct.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function DummyProduct(props) {
    debugger;
    let path="";
    let category = props.category;
    const pathdata = {
        "Fruits and Vegetables" : "FruitsVeg",
        "Pulses" : "Pulses",
        "Dry Fruits" : "DryFruits",
        "Cooking Oil and Ghee" : "OilsGhee",
        "Flours and Grains" : "FlourGrains",
        "Rice" : "Rice",
        "Masala and Spices" : "MasalaSpices",
        "Salt Sugar and Others" : "Others",
    }
    path = pathdata[category];
    
    return (
        <div className="dummyProduct-template">
            
            <div style={{padding:"5px",paddingTop:"50px",textAlign:"center", minWidth: "150px"}}>
                Click here for more... <br></br>
                <p style={{fontFamily:"cursive"}}>{props.category}</p>
                <p style={{padding:"2px",backgroundColor:"#F0F0F0",width:"30%",marginLeft:"35%",borderRadius:"5px",cursor:"pointer"}}>
                    <NavLink to={path}>
                            <FontAwesomeIcon icon={faAnglesRight} className="icon-hover" />
                        </NavLink>
                    </p>

            </div>

        </div>
    );
}

export default DummyProduct;