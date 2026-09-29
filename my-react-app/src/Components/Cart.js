import { useContext, useState } from 'react';
import { CartContext } from '../CartContext';

import Footer from "./Footer";
import './css/cart.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Cart() {
    const { cartItems, clearCart, removeItem, addToCart  } = useContext(CartContext);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    const login = JSON.parse(localStorage.getItem('userData'));  // Get userData from localStorage

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
    );

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) return

        try {
            if (login && login.isLoggedIn) {
                const orderData = {
                    userData: {
                        _id: login._id,
                        name: login.name,
                        number: login.number,
                        email: login.email,
                        address: login.address
                    },
                    items: cartItems,
                    totalPrice: totalPrice,
                    paymentMethod: paymentMethod,
                    date: new Date().toISOString()
                };

                const response = await fetch('http://localhost:8080/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                const data = await response.json();
                if (response.ok) {
                    setOrderPlaced(true);
                    clearCart(); // Optional: clear cart after placing order
                    // alert('Your order has been placed!');
                } else {
                    alert(data.message || 'An error occurred while placing your order.');
                }
            } else {
                // alert("Please Login to proceed!!");
                document.getElementById("message").style.color = "red";
                document.getElementById("message").innerHTML = '<style>#message a{text-decoration:none}#message a:hover{color:blue;text-decoration:underline}</style>Please <a href="/Login">Login</a> to proceed!!';
                
            }

        } catch (error) {
            console.error('Fetch error:', error);
            alert("An error occurred while placing your order.");
        }
    };

        const increment = (item) => {
        addToCart({ ...item, count: item.count + 1 });
    };

    const decrement = (item) => {
        if (item.count > 1) {
            addToCart({ ...item, count: item.count - 1 });
        } else {
            removeItem(item.id);
        }
    };

    // Handle item removal from the cart
    const handleRemoveItem = (itemId) => {
        removeItem(itemId); // Assuming removeItem is a function in CartContext to remove items
    };

    return (
        <>
            <div style={{ paddingTop: "100px", marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
                <div style={{ width: "80%", maxWidth: "1000px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                    <h3 style={{ borderBottom: "2px solid #000" }}>My Cart</h3>

                    {login && login.isLoggedIn && (
                        <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px", border: "1px solid #ccc", textAlign: "left" }}>
                            <p><strong>Delivery Address : </strong> {login.name}, {login.address} , {login.number}</p>
                        </div>
                    )}

                    {orderPlaced ? (
                        <h2 style={{ color: 'green', textAlign: 'center' }}>Your order has been placed successfully! it will reach within 10 minutes</h2>
                    ) : cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                                        <th style={thStyle}>Image</th>
                                        <th style={thStyle}>Name</th>
                                        <th style={thStyle}>Quantity</th>
                                        <th style={thStyle}>Price per item</th>
                                        <th style={thStyle}>Subtotal</th>
                                        <th style={thStyle}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
                                            <td style={tdStyle}>
                                                <img src={`http://localhost:8080/images/${item.image}`} alt={item.name} width="80" />
                                            </td>
                                            <td style={tdStyle}>{item.name}</td>
                                            <td style={tdStyle}>{item.count}</td>
                                            <td style={tdStyle}>₹{item.price}</td>
                                            <td style={tdStyle}>₹{item.price * item.count}</td>
                                            <td style={{paddingLeft: "80px"}}>
                                                {/* <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="delete-btn">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button> */}
                                                <div className="add-btn-grid blue-style">
                                                    <button className="cursor" onClick={() => decrement(item)}>-</button>
                                                    <button className="product-counter">{item.count}</button>
                                                    <button className="cursor" onClick={() => increment(item)}>+</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h2 style={{ textAlign: "right", marginTop: "20px" }}>Total: ₹{totalPrice}</h2>

                            {/* Payment Dropdown */}
                            <div style={{ marginTop: "20px", textAlign: "left", textAlign: "center" }}>
                                <label htmlFor="paymentMethod" style={{ marginRight: "10px", fontWeight: "bold" }}>
                                    Select Payment Method:
                                </label>
                                <select
                                    id="paymentMethod"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                                >
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Net Banking">Net Banking</option>
                                </select>

                                {/* Conditional message */}
                                {paymentMethod !== "Cash on Delivery" && (
                                    <p style={{ color: "red", marginTop: "10px", paddingLeft:"10%"}}>
                                        Currently this payment method is not available, Kindly proceed with Cash on Delivery!!
                                    </p>
                                )}

                            </div>

                            <span id="message"></span>
                            <div className="Orderbtn-container">
                                <button className='Orderbtn' onClick={handlePlaceOrder}>Place Order</button>
                                <button className='Orderbtn clearCartBtn' onClick={clearCart}>Clear Cart</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

const thStyle = {
    padding: "12px",
    borderBottom: "2px solid #ddd"
};

// const tdStyle = {
//     padding: "10px"
// };
const tdStyle = {
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
};


export default Cart;