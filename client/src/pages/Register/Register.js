import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../../utils/RestAPIRoutes";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password, phone } = formData;
      axios
        .post(registerRoute, { username, email, password, phone })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      console.log("password and confirm password doesn't match");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <main className="register--main">
      <nav className="register--nav">
        <ul className="register--ul">
          <li>
            <Link to="/login" className="register--link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="register--link">
              Register
            </Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit} className="register--form">
        <div className="register--textfield--div">
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="register--input"
            required
          ></input>
          <label forhtml="username" className="register--label">
            Username
          </label>
        </div>
        <div className="register--textfield--div">
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register--input"
            required
          ></input>
          <label forhtml="email" className="register--label">
            Email
          </label>
        </div>
        <div className="register--textfield--div">
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register--input"
            required
          ></input>
          <label forhtml="password" className="register--label">
            Password
          </label>
        </div>
        <div className="register--textfield--div">
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="register--input"
            required
          ></input>
          <label forhtml="confirmPassword" className="register--label">
            Confirm Password
          </label>
        </div>
        <div className="register--textfield--div">
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="register--input"
            required
          ></input>
          <label forhtml="phone" className="register--label">
            Phone
          </label>
        </div>
        <button className="register--button">sign up</button>
        <span>
          Already have an account?
          <Link to="/login" className="register--login--button">
            Login
          </Link>
        </span>
      </form>
    </main>
  );
};

export default Register;
