import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let isUserLogIn = JSON.parse(localStorage.getItem("loginData"));
    if (isUserLogIn) {
      navigate("/dashboard");
    }
  }, []);

  const changeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    localStorage.setItem("loginData", JSON.stringify(formData));
    navigate("/dashboard");
    // toast.success("login successfully");
  };

  return (
    <div className="login-form">
      <form onSubmit={submitForm}>
        <div className="form-icon">
          <span>ToDo</span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            name="username"
            placeholder="Username"
            required
            onChange={changeValue}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            name="password"
            placeholder="Password"
            required
            onChange={changeValue}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block create-account">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
