import React from "react";
import { Link } from "react-router-dom";
import add_user from "../asset/add-user.png";
import edit_menu from "../asset/edit-menu.png";
import generate_bill from "../asset/payment.png";

const ManagerDashboard = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center mb-4">
            <h1 style={{ color: "#007bff" }}>Manager Dashboard</h1>
          </div>
        </div>

<hr /><br /><br /><br /><br /><br /><br />

        {/* 1st */}
        <Link
          to="/manager/orders"
          style={{
            width: "20rem",
            border: "solid black",
            padding: "20px",
            margin: "auto",
 
          }}
        >
          <div className="card" style={{ border: "none" }}>
            <img
              src={generate_bill}
              className="card-img-top"
              alt="add people"
            />
            <div className="card-body d-flex justify-content-center align-items-center">
              <h5 className="btn btn-primary btn-lg btn-block">
                Generate Bill
              </h5>
            </div>
          </div>
        </Link>

        {/* </div> */}

        {/* 2nd */}
        <Link
          to="/manager/changeMenu"
          style={{
            width: "20rem",
            border: "solid black",
            padding: "20px",
            margin: "auto",

          }}
        >
          <div className="card" style={{ border: "none" }}>
            <img
              src={add_user}
              className="card-img-top"
              alt="add people"
            />
            <div className="card-body d-flex justify-content-center align-items-center">
              <h5 className="btn btn-primary btn-lg btn-block">
              Add New Waiter
              </h5>
            </div>
          </div>
        </Link>
        {/* 3rd */}
        <Link
          to="/addWaiter"
          style={{
            width: "20rem",
            border: "solid black",
            padding: "20px",
            margin: "auto",
          }}
        >
          <div className="card" style={{ border: "none" }}>
            <img
              src={edit_menu}
              className="card-img-top"
              alt="add people"
            />
            <div className="card-body d-flex justify-content-center align-items-center">
              <h5 className="btn btn-primary btn-lg btn-block">
              Edit Menu
              </h5>
            </div>
          </div>
        </Link>
    
        <div className="logout-btn">
          <Link
            to="/"
            className="btn btn-danger"
            style={{ position: "absolute", top: "20px", right: "20px", fontSize: "1.3rem" }}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
