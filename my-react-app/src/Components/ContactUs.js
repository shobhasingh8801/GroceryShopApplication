import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSquarePhone, faTruckFast } from '@fortawesome/free-solid-svg-icons';

import './css/contactUs.css';

function ContactUs() {
    const hide = () => {
            document.getElementById("contact").style.display = "none";
    }
    return (
        <div id="contact" >
            <div className="wrapper" >
                <button className="btn-close" onClick={()=>hide("hide")} >X</button>
                <h3 className="heading"><FontAwesomeIcon icon={faTruckFast} /> Online Grocey Shop</h3>
                <div className="help">
                    <h3>Do you need help getting started?</h3>
                    <p>We’ll help you every step of the way! Simply send us an email or give us a call for assistance. (All days, between 7:00 a.m. to 10:00 p.m.)</p>
                    <p><FontAwesomeIcon icon={faSquarePhone} /> Call</p>
                    <p>+91-7717706043</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> Email</p>
                    <p>groceryshop@gmail.com</p>
                </div>
                <div className="info">
                    <h3>Log in for more!</h3>
                    <p>To make the most of our offers, track your order history and re-order products, we recommend that you Login / Create to your account.</p>
                </div>
            </div>
        </div>

    )
}

export default ContactUs;