import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCircleUser, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import './css/signup.css';

function SignUp() {
    const [data, setData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
    });

    const resetForm = () => {
        setData({
            name: "",
            number: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
        });
    };

    const handleChange = (event) => {
        let eventName = event.target.name;
        let eventValue = event.target.value;
        let upadatedData = { ...data, [eventName]: eventValue };
        console.log(upadatedData);
        setData(upadatedData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var is_valid = validatePassword();

        if (is_valid) {
            try {
                const response = await axios.post("http://localhost:8080/signup", data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // // Save user data to localStorage, after signup login automatically
                // localStorage.setItem('userData', JSON.stringify({
                //     isLoggedIn: true,
                //     name: data.name,
                //     number: data.number,
                //     email: data.email,
                //     address: data.address
                // }));

                document.getElementById("message").innerHTML = "User Added Successfully, Login to Proceed!";
                document.getElementById("message").style.color = "green";
                resetForm();
            }
            catch (error) {
                var msg = "";
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
                document.getElementById("message").innerHTML = "";
            }, 3000);
            shakeText();
        }
    }
    function shakeText() {
        const text = document.getElementById('message');
        text.classList.remove('shake'); // Reset in case it's already shaking
        void text.offsetWidth; // Trigger reflow to restart animation
        text.classList.add('shake');
    }

    function validatePassword() {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            return false; // Prevent form submission
        }
        return true;
    }

    return (
        <div>
            <div className="SignupSection" style={{backgroundImage: "url(/images/SignUp.jpg)"}}>
                <h4>Sign Up Page</h4>
                <form onSubmit={handleSubmit}>
                    <div id="message"></div>
                    <input type="text" name="name" placeholder="Enter Full Name" required minlength="2" maxlength="50" pattern="[A-Za-z\s]+" title="Name should contain only letters and spaces." value={data.name} onChange={handleChange} /><br></br>
                    <input type="tel" name="number" placeholder="Enter Mobile No." required pattern="[6-9][0-9]{9}" maxlength="10" title="Enter a valid 10-digit mobile number starting with 6-9" value={data.number} onChange={handleChange} /><br></br>
                    <input type="email" name="email" placeholder="Enter Email id" required title="Enter a valid email address" value={data.email} onChange={handleChange} /><br></br>
                    <input type="password" id="password" name="password" placeholder="Enter Password" required minlength="8" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}" title="Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character." value={data.password} onChange={handleChange} /><br></br>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" required value={data.confirmPassword} onChange={handleChange} /><br></br>
                    <textarea type="text" name="address" placeholder="Enter your Address" required value={data.address} onChange={handleChange}></textarea><br />
                    <span id="message"></span><br></br>
                    <button>Sign Up <FontAwesomeIcon icon={faUserPlus} /> </button>
                    <button type="reset" onClick={resetForm}>Reset Form <FontAwesomeIcon icon={faRotateLeft} /></button>
                </form>

                <p>Existing User? <Link to="/Login">Login <FontAwesomeIcon icon={faCircleUser} /> </Link></p>

            </div>
            <footer />
        </div>
    )
}

export default SignUp;