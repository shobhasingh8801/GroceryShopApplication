import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/userProfile.css'; // Optional: Create a style file

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
      setUser(storedUser);

      if (storedUser.email) {
        debugger;
        (async () => {
          try {
            const orderData = await axios.get(`http://localhost:8080/api/orders/user/${storedUser.email}`);
            setOrderHistory(orderData.data);
          } catch (err) {
            console.error('Failed to fetch order history:', err);
            //alert('Failed to fetch order history:', err);
            document.getElementById("error").innerText = err.message + " : Backend not reachable!!";
            document.getElementById("error").style.color = "red";
          }
        })();
      }
    }else{
      navigate("/Login");
    }
  }, []);

  return (
    (user) &&
    <div className="user-profile-container">
      <div className="profile-card">
        <img
          src="/images/userProfile.jpg"
          alt="User avatar"
          className="profile-avatar"
        />
        <h2>{user.name}</h2>
        <p>Email: {user.email || "not available"}</p>
        <p>Phone: {user.number || "not available"}</p>
        <p>Address: {user.address || "not available"}</p>
      </div>

      <div className="order-history">
        <h3>Order History</h3>
        {orderHistory && orderHistory.length === 0 ? (
          <p id="error">No orders history found!!</p>
        ) : (
          <ul>
            {orderHistory && orderHistory.map(order => (
              <span className='orderHisCard'>

                <li key={order._id}>
                  <span style={{textAlign:"left",fontSize:"10px",float:"left"}}>Order # {order._id}</span> 
                  <span style={{textAlign:"left",fontSize:"10px",float:"right"}}>{new Date(order.date).toLocaleString()}</span> <br />
                  <br />
                  {order.items.map(data => (
                    <div style={{display:"grid", gridTemplateColumns:"20% 50% 15% 15%"}}>
                      <img src={`http://localhost:8080/images/${data.image}`} alt={data.name} width="60" height="60"/>
                      <p>{data.name}</p>
                      <p>Qty : {data.count}</p>
                      <p>Price : {data.price}</p>
                    </div>

                  ))}<br />
                  <span style={{textAlign:"left",float:"left"}}>Payment Method: {order.paymentMethod}</span> 
                  <b><span style={{textAlign:"left",float:"right"}}>Total: ₹{order.totalPrice.toFixed(2)} </span> </b>          
                  <br />
                </li>
              </span>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;