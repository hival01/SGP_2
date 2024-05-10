import React from "react";
import { Link } from "react-router-dom";
import restaurantImage from "../asset/background.jpg";
import "./Home.css"; // Import CSS file for custom styles

const Home = () => {
  return (
    <div className="home-container d-flex justify-content-center">
      <img
        src={restaurantImage}
        alt="Restaurant"
        className="background-image "
      />
      <div className="content-container">
        <div className="text-center">
          <h2 className="display-4 mt-5 style-script-regular" style={{color:"black"}}>Welcome!</h2>
          <p className="lead fw-normal" style={{color:"black"}}>
            Streamline your restaurant operations with TechBite. Login to access
            your restaurant management tools.
          </p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center  m-3">
            <Link
              to="/login"
              className="btn btn-lg"
              style={{ backgroundColor: "#FB8500" }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
