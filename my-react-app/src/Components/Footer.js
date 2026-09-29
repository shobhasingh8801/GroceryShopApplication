import { Link } from "react-router-dom";

import './css/footer.css';
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {

    const Show = () => {
        document.getElementById("contact").style.display = "block";
    };
    return (
        <>
            <div className="footer">
                <div>
                    <h3>About</h3>
                    <p className="about1">We want our customers to focus on the more important things for themselves and not need to plan for the little things that life needs on an everyday basis., We are revolutionizing e-commerce by making the stuff most important to you, available to you in a blink of your eye.</p>
                </div>
                <div className="hover1">
                    <h3>Usefull Links</h3>
                    <p onClick={Show}>Contact Us</p>
                    <p><Link to="/AboutUs">About Us</Link></p>
                </div>
                <div className="hover1">
                    <h3>Social handle</h3>
                    <p><a href="https://www.facebook.com/Shobha Singh" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a></p>
                    <p><a href="https://www.instagram.com/_shobha.singh_" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></p>
                    <p><a href="https://www.linkedin.com/in/Shobha Kumari" target="_blank" rel="noopener noreferrer"><FaLinkedin /> Linkedin</a></p>
                    <p><a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></p>
                </div>
                <div className="hover1">
                    <h3>Product Categories</h3>
                    <p><Link to="/FruitsVeg">Fruits & Vegetables</Link></p>
                    <p><Link to="/Pulses">Pulses</Link></p>
                    <p><Link to="/DryFruits">Dry Fruits</Link></p>
                    <p><Link to="/OilsGhee">Oil & Ghee</Link></p>
                    <p><Link to="/FlourGrains">Flours & Grains</Link></p>
                    <p><Link to="/Rice">Rice</Link></p>
                    <p><Link to="/MasalaSpices">Masala & Spices</Link></p>
                    <p><Link to="/Others">Salt, Sugar & Others</Link></p>
                </div>
            </div>
            <ContactUs />
        </>

    );
};

export default Footer;