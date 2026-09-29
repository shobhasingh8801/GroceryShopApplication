import React from "react";

import './css/aboutUs.css';
import Footer from "./Footer";

function AboutUs() {
    return (
        <>
            <div className="about">
                <div className="head">
                    <h3>This page is giving information about my Grocery Shop.</h3>
                </div>
                <div className="para">
                    <p>Imagine needing something when you are at home and getting it before you have tied your shoelaces to step out. We are revolutionizing e-commerce by making the stuff most important to you, available to you in a blink of your eye.</p>
                    <p>We want our customers to focus on the more important things for themselves and not need to plan for the little things that life needs on an everyday basis. We are here to get your chores out of your way.</p>
                    <h2>1.   Instant delivery service</h2>
                    <p>Shop on the go and get anything delivered in minutes. Buy everything from groceries to fresh fruits & vegetables, cakes and bakery items, to meats & seafood, cosmetics, mobiles & accessories, electronics, baby care products and much more. We get it delivered at your doorstep in the fastest and the safest way possible.</p>
                    <h2>2.   Single app for all your daily needs</h2>
                    <p>Order thousands of products at just a tap - milk, eggs, bread, cooking oil, ghee, atta, rice, fresh fruits & vegetables, spices, chocolates, chips, biscuits, noodles, cold drinks, shampoos, soaps, body wash, pet food, diapers, electronics, other organic and gourmet products from your neighbourhood stores and a lot more.</p>
                    <h2>3.   Order online to enjoy instant delivery magic</h2>
                    <p>Now a days online shoping is very famous but this online grocery shoping is very usefull for ladies who are not able to go to market and get some groceries.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs;
