/*import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import ManagerDashboard from "../layout/ManagerDashboard";

function Login() {
          const [values,setValues] =useState({
            email:'',
            password:'' 
          })
          const navigate=useNavigate();
          const [errors, setErrors] = useState({})
      
        const handleInput = (event) => {
          setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
        }
      
        const handleSubmit = async (event) => {
          event.preventDefault();
          
          const validationErrors = Validation(values);
          setErrors(validationErrors);
        
          // Check for validation errors
          if (validationErrors.email === "" && validationErrors.password === "") {
            try {
              const res = await axios.post('http://localhost:8080/login', values);
              
              if (res.data === "Success") {
                navigate("/manager");
              } else {
                alert("No record");
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
        
      
      
      

  return (
    
      <div
        className="d-flex justify-content-center align-items-center  vh-100 "
        style={{ backgroundColor: "#B5E2FA" }}
      >
        <div className="bg-white p-3 rounded w-25 ">
          <h2>Login</h2>
          <hr />
          <form  onSubmit={handleSubmit}>
            <div className="md-3 mt-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email" name='email'
                onChange={handleInput}
                className="form-control rounded-0"
              />

              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="md-3 mt-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"  name='password'
                onChange={handleInput} 
                className="form-control rounded-0"
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <button type='submit' className="btn btn-success w-100 mt-4 rounded-25">
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
   
  );
}

export default Login;*/


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check for validation errors
    if (validationErrors.email === "" && validationErrors.password === "") {
      try {
        const res = await axios.post("http://localhost:8080/login", values);

        if (res.data === "Success") {
          // Assuming res.userType contains information about the user type (e.g., "waiter" or "manager")
          if (values.email === "admin123@gmail.com") {
            navigate("/manager");
          } else if (values.email === "waiter@gmail.com") {
            navigate("/waiter");
          } else {
            navigate("/KitchenModule");
          }
        } else {
          alert("No record");
        }
      } catch (err) {
        console.log(err);
      }
    };
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 " style={{ backgroundColor: "#B5E2FA" }}>
      <div className="bg-white p-3 rounded w-25 ">
        <h2>Login</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="md-3 mt-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} className="form-control rounded-0" />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="md-3 mt-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} className="form-control rounded-0" />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 mt-4 rounded-25">
            Log in{" "}
          </button>
  
        </form>
      </div>
    </div>
  );
}

export default Login;
