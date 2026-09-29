/*Express is Node JS Framework- We are using express for our Backecked--that's why its required to import*/
const express = require('express');  //importing express after installing (npm i express)
const app = express();                // to use express we have to first call it and assign it in a variable -- use same varibale to call
/*Express import Ends*/

/* some required node modules*/
const path = require('path');     //To handle paths we needed path module of NODE js
const fs = require('fs');        //File System -- To handle files related operation we are using file module of NOde JS
/*ends*/


/*Express Middlewares */
const cors = require('cors');         //We are using CORS to handle CORS errors while API communication
app.use(cors());                     //to use we have to call cors by using app.use() in express
app.use(express.json());   
app.use(express.json());           //this MW we are using to pass and receive data in json format - so that no need to convert the data in json 
/*Ends*/

const port = 8080;                   //to define ports on which backend server will run

/*MongoDB*/
const mongoose = require('mongoose');     //Mongoose is a Node.js library that acts as an Object Data Modeling (ODM) tool for MongoDB
const User = require('./models/User');    //User define model/schema for user collection
mongoose.connect('mongodb://localhost:27017/OnlineGroceryShop')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
/*MogoDB Ends*/


// Route to handle PUT request
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // For creating JWT tokens

app.post('/signup', async (req, res) => {
  const { name, number, email, password, confirmPassword, address } = req.body;

  try {
    //const user = new User({ name, number, email, password, confirmPassword });
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, number, email, password: hashedPassword, address});

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    await user.save();

    res.status(200).json({
      message: 'User registered successfully!',
    });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // If the login is successful, create a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    // Send a success response with the token
    res.status(200).json({
      message: 'Login successful',
      token: token, // Send the token to the frontend for authentication in future requests
      user: user,
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Internal server error' });
  }

  // console.log('Received user data:', req.body);
  // res.status(200).json({
  //   // message: 'Login successfully!',
  //   // name: name
  // });
});

const Order = require('./models/Order'); // Import the Order model

app.post('/api/orders', async (req, res) => {
  console.log('Received order:', req.body);

  const { items, totalPrice, date, userData, paymentMethod, address } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  try {
    const order = new Order({ items, totalPrice, date, userData, paymentMethod, address, });
    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

app.get('/api/orders/user/:userId', async (req, res) => {
  debugger;
  const { userId } = req.params;

  try {
    const userOrders = await Order.find({ 'userData.email': userId }).sort({ date: -1 });
    res.status(200).json(userOrders);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
});

const Product = require('./models/Product');       //User define model/schema for products collection 
app.get('/fetchProductData', async (req, res) => {
  try {
    const items = await Product.find({ category: req.query.category });
    res.json(items);
  } catch (error) {
    console.error('Error fetching fruits and vegetables:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /products/:id using Mongoose
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Add Product Routes
const productRoutes = require('./Routes/addProduct');
app.use('/addProduct', productRoutes);                   // Prefix all routes from the file with /api/products

//to serve uploaded image
app.use('/images', express.static(path.join(__dirname, 'uploads')));


//Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//app.listen(8080);
