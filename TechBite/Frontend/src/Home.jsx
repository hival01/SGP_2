import React from 'react';
import { Link } from 'react-router-dom';
import restaurantImage from "./restaurantImage.jpeg";

const Home = () => {
  return (
    <div className="container-fluid bg-dark text-light d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
          <img src={restaurantImage} alt="Restaurant" className="img-fluid" style={{ maxHeight: '100%', width: 'auto' }} />
        </div>
        <div className="col-md-6 align-items-center justify-content-center d-flex">
          <div className="text-center">
            <h2 className="display-4 mt-5">Welcome, Manager!</h2>
            <p className="lead mb-5">Streamline your restaurant operations with TechBite. Login to access your restaurant management tools or sign up to get started.</p>
            <div className="d-flex justify-content-center">
              <Link to="/login" className="btn btn-primary btn-lg mr-3" style={{ marginRight: '10px' }}>Login</Link>
              <Link to="/signup" className="btn btn-secondary btn-lg">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
