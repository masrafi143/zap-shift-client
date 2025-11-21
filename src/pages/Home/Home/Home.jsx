import React from "react";
import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";

const reviewPromise = fetch("/reviews.json").then((res) => res.json())
const Home = () => {

  return (
    <div>
      <Banner />
      <Brands />
      <Reviews reviewPromise={reviewPromise}/>
    </div>
  );
};

export default Home;
