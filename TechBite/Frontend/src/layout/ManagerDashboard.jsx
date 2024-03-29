import React from 'react';
import { Link } from 'react-router-dom';

const ManagerDashboard = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center mb-4">
            <h1 style={{ color: '#007bff' }}>TechBite Manager</h1>
            <hr style={{ backgroundColor: '#007bff', height: '2px', width: '50%', margin: 'auto' }} />
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <Link to="/manager/orders" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>Orders</Link>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6 offset-md-3">
              <Link to="/manager/change-menu" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}>Change Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
