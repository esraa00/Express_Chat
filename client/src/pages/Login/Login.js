import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData;
    axios
      .post(
        loginRoute,
        { username, email: username, password },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <main>
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
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="register--input"
          ></input>
          <label className="register--label">Username Or Email</label>
        </div>
        <div className="register--textfield--div">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="register--input"
            x
          ></input>
          <label className="register--label">Password</label>
        </div>
        <button className="register--button">LogIn</button>
        <span>
          New to Express?
          <Link to="/register" className="register--login--button">
            Join us now!
          </Link>
        </span>
      </form>
    </main>
  );
};

export default Login;
