import React from 'react';
import { Link } from 'react-router-dom';
import restaurantImage from "../asset/restaurantImage.jpeg";

const Home = () => {
  return (
    <div className="container-fluid bg-dark text-light d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
          <img src={restaurantImage} alt="Restaurant" className="img-fluid" style={{ maxHeight: '100%', width: 'auto' }} />
        </div>
        <div className="col-md-6 align-items-center justify-content-center d-flex flex-column">
          <div className="text-center mb-5">
            <h2 className="display-4 mt-5">Welcome!</h2>
            <p className="lead">Streamline your restaurant operations with TechBite. Login to access your restaurant management tools.</p>
  
          </div>
          <div className="d-flex flex-column align-items-center m-3">
            <div className="d-flex justify-content-between w-100 m-3">
              <Link to="/login" className="btn btn-primary btn-lg mr-3">Login</Link>
             
            </div>
            <div className="d-flex flex-column align-items-center m-3">
            <div className="d-flex justify-content-between  w-80 m-3">
              <Link to="/KitchenModule" className="btn btn-primary btn-lg mr-3">Kitchen</Link>
             
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
  