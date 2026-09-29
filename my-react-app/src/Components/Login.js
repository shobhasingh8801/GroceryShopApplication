import React from "react";
import axios from "axios";
import { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import './css/login.css';
import Footer from "./Footer";

import { CartContext } from '../CartContext';

function Login() {

    const navigate = useNavigate();

    const { setLogin, setAdmin } = useContext(CartContext);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        let eventName = event.target.name;
        let eventValue = event.target.value;
        let upadatedData = { ...data, [eventName]: eventValue };
        console.log(upadatedData);
        setData(upadatedData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Success
            const { token, user } = response.data;  // Assuming 'user' contains user details like name
            document.getElementById("message").innerHTML = response.data.message || "Login successful!";
            document.getElementById("message").style.color = "green";

            // Store token and user details in localStorage
            localStorage.setItem('authToken', token);
            //localStorage.setItem('userName', user.name);  // Store user name in localStorage
            localStorage.setItem('userData', JSON.stringify({...user, isLoggedIn : true}));  // Store user name in localStorage
            setLogin(localStorage.getItem('userData'));
            if(user.email == "shobhasingh8801@gmail.com"){
                setAdmin(true);
                localStorage.setItem("admin",true);
            } else {
                setAdmin(false);
                localStorage.setItem("admin",false);
            }

            navigate("/");  // Redirect to home or dashboard

        } catch (error) {
            // If login fails (user not registered, wrong password, etc.)
            document.getElementById("message").innerHTML =
                error.response?.data?.message || "Login failed. Please try again.";
            document.getElementById("message").style.color = "red";
        }

        // setTimeout(() => {
        //     document.getElementById("message").innerHTML = "";
        // }, 5000);
    }

    return (
        <div>
            <div className="loginSection" style={{backgroundImage: "url(/images/login.jpg)"}}>
                <h4>Login Page</h4>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Enter Email id" required title="Enter a valid email address" value={data.email} onChange={handleChange} /><br></br>
                    <input type="password" name="password" placeholder="Password" required title="Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character." value={data.password} onChange={handleChange} /><br></br>
                    <span id="message"></span><br></br>
                    <button>Login <FontAwesomeIcon icon={faCircleUser} /></button>
                </form>
                <p>New User? <Link to="/SignUp">Sign Up <FontAwesomeIcon icon={faUserPlus} /></Link></p>
            </div>
            <Footer />
        </div>
    )
}

export default Login;