import { Link, NavLink, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faCartPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useCart, CartContext } from '../CartContext';

import './css/header.css';
import { TbBoxMargin } from 'react-icons/tb';

const Header = () => {
    debugger;
    const { totalItems } = useCart();  //Get total items from context
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userName = userData && userData.name;  // Get username from localStorage
    const { admin, setAdmin } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        // Optional: Navigate or filter based on search
        // Example: navigate(`/search?query=${query}`);
    };
    let isAdmin = localStorage.getItem("admin");

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');

        localStorage.setItem("admin", false);
        isAdmin = localStorage.getItem("admin");
        setAdmin(false);
        window.location.reload(); // Reload page to reflect logout
    };


    return (
        <>
            <div className='Head-fix'>
                <nav className="navbar">
                    <div style={{ fontSize: "22px", marginLeft: "100px", color: "#007bff", fontWeight: "bolder", fontFamily: "-moz-initial" }}><Link to="/">Online Grocery Shop <FontAwesomeIcon icon={faTruckFast} /></Link></div>

                    <div className='cart' style={{ marginRight: "50px" }}>
                        <Link to="/Cart" style={{ fontSize: "20px", position: 'relative', display: 'inline-block', float: "right" }}><FontAwesomeIcon icon={faCartPlus} />
                            {totalItems > 0 && (<span style={badgeStyle}>{totalItems}</span>)}
                        </Link>

                        {/* {userName ? (
                            <span style={{ color: "#007bff", float: "right", marginRight: "50px" }}><strong>{userName}</strong>  <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} style={{ cursor: "pointer" }} title='Click here to Logout!' /></span>  // Show username if logged in
                        ) : (
                            <span style={{ color: "#007bff", float: "right", marginRight: "50px" }}><Link to="/Login">Login</Link></span>  // Else show login link
                        )} */}

                        {userName ? (
                            <span style={{ color: "#007bff", float: "right", marginRight: "50px" }}>
                                <Link
                                    to="/profile"
                                    style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                                >
                                    {userName}
                                </Link>
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    onClick={handleLogout}
                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                    title='Click here to Logout!'
                                />
                            </span>
                        ) : (
                            <span style={{ color: "#007bff", float: "right", marginRight: "50px" }}>
                                <Link to="/Login">Login</Link>
                            </span>
                        )}

                        <span style={{ color: "#007bff", float: "right", marginRight: "50px" }}><Link to="/AboutUs">About Us</Link></span>
                        {(isAdmin == "true") &&
                            <span style={{ color: "#007bff", float: "right", marginRight: "50px" }}><Link to="/AddProduct">Add Product</Link></span>
                        }
                        <div style={{ flex: 1, marginRight: "500px" }}>
                            <input type="text" placeholder="Search for products..." value={searchTerm} onChange={handleSearch} className="search-input"
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: "20px",
                                    border: "1px solid #ccc",
                                    outline: "none",
                                }}
                            />
                        </div>
                    </div>
                </nav>

                <div className='categories'>
                    <div>
                        <NavLink to="/FruitsVeg" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Fruits & Vegetables
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/Pulses" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Pulses
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/DryFruits" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Dry Fruits
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/OilsGhee" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Cooking Oil & Ghee
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/FlourGrains" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Flours & Grains
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/Rice" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Rice
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/MasalaSpices" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Masala & Spices
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/Others" className={({ isActive }) => isActive ? 'category-link active' : 'category-link'}>
                            Salt, Sugar & Others
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet />
        </>

    );
};

// Optional: Add a red badge style for the cart count
const badgeStyle = {
    position: 'absolute',
    top: '-8px',
    right: '-10px',
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold'
};

export default Header;