import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center  vh-100 "
        style={{ backgroundColor: "#B5E2FA" }}
      >
        <div className="bg-white p-3 rounded w-25 ">
          <h2>Login</h2>
          <hr />
          <form action="">
            <div className="md-3 mt-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control rounded-0"
              />
            </div>
            <div className="md-3 mt-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded-0"
              />
            </div>
            <button className="btn btn-success w-100 mt-4 rounded-25">
              Log in{" "}
            </button>
            <p>you are agree to our terms and conditon</p>
            <Link
              to="/signup"
              className="btn btn-defult border w-100 bg-light rounded-0 text-decoration-none"
            >
              Create Acount{""}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
