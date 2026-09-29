// CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';

// console.log("CartContext loaded");

// Create a context for the cart
export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];          
    });
    //&& (Object.keys(JSON.parse(savedCart)).length > 0)

    const [login, setLogin] = useState(() => {
        const savedLogin = localStorage.getItem('userData');
        return savedLogin ? JSON.parse(savedLogin) : {};
    });

    const [admin, setAdmin] = useState(false);


    // Function to remove item from cart
    const removeItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // Save to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(p => p.id === item.id);

            if (existingItem) {
                if (item.count === 0) {
                    // Remove item from cart
                    return prevItems.filter(p => p.id !== item.id);
                } else {
                    // Update item count
                    return prevItems.map(p =>
                        p.id === item.id ? { ...p, count: item.count } : p
                    );
                }
            } else {
                // Add new item if count > 0
                return item.count > 0 ? [...prevItems, item] : prevItems;
            }
        });
    };

    // Function to update item count (used for increment/decrement)
    const updateItemCount = (id, count) => {
        setCartItems(prevItems =>
            prevItems.map(p =>
                p.id === id ? { ...p, count } : p
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // clear storage too
    };
    debugger;
    // Total number of items (sum of counts)
    const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);
    //const totalItems = [];
    return (
        <CartContext.Provider value={{ cartItems, clearCart, addToCart, updateItemCount, totalItems, removeItem, setLogin, setAdmin, admin}}>
            {children}
        </CartContext.Provider>
    );
};