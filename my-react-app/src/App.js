import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './Components/Login.js';
import Cart from './Components/Cart.js';
import AddProduct from './Components/AddProduct.js';
import Dashboard from './Dashboard.js';
import Header from './Components/Header.js';
import SignUp from './Components/SignUP.js';
import AboutUs from './Components/AboutUs.js';
import UserProfile from './Components/UserProfile.js';
import FruitsVeg from './CategoriesHolder/FruitsVeg.js';
import Pulses from './CategoriesHolder/Pulses.js';
import DryFruits from './CategoriesHolder/DryFruits.js';
import OilsGhee from './CategoriesHolder/OilsGhee.js';
import FlourGrains from './CategoriesHolder/FlourGrains.js';
import MasalaSpices from './CategoriesHolder/MasalaSpices.js';
import Rice from './CategoriesHolder/Rice.js';
import Others from './CategoriesHolder/Others.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Dashboard />} />
            <Route path="Login" element={<Login />} />
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="FruitsVeg" element={<FruitsVeg />} />
            <Route path="Pulses" element={<Pulses />} />
            <Route path="DryFruits" element={<DryFruits />} />
            <Route path="OilsGhee" element={<OilsGhee />} />
            <Route path="FlourGrains" element={<FlourGrains />} />
            <Route path="Rice" element={<Rice />} />
            <Route path="MasalaSpices" element={<MasalaSpices />} />
            <Route path="Others" element={<Others />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element="{<No Page Found />}" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
