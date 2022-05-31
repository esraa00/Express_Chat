import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../../utils/RestAPIRoutes";
import "./Login.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../../store/authSlice";
import { addUser, removeUser } from "../../store/userSlice";
import { isLoggedInRoute, logoutUserRoute } from "../../utils/RestAPIRoutes";

const Login = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { name, id } = useSelector((state) => state.userSlice);
  const { isAuthorized } = useSelector((state) => state.authSlice);
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isLoggedIn = async () => {
    const res = await axios
      .get(`${isLoggedInRoute}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        setIsUserLoggedIn(true);
      })
      .catch((error) => console.log(error));
    console.log("im here");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { usernameOrEmail, password } = formData;
    axios
      .post(
        loginRoute,
        { usernameOrEmail, password },
        { withCredentials: true, credentials: "include" }
      )
      .then(({ data }) => {
        dispatch(logIn());
        dispatch(addUser({ id: data._id, name: data.username }));
        window.location.replace("http://localhost:3000/chat");
      })
      .catch((error) => console.log(error));
  };

  const logoutUser = async () => {
    const res = await axios.get(`${logoutUserRoute}`, {
      withCredentials: true,
      credentials: "include",
    });
    console.log("successfully logged out");
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  {
    isUserLoggedIn && <Navigate to="/chat"></Navigate>;
  }
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
          <li>
            <Link to="/chat" className="register--link">
              chat
            </Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit} className="register--form">
        <div className="register--textfield--div">
          <input
            type="text"
            name="usernameOrEmail"
            onChange={handleChange}
            value={formData.usernameOrEmail}
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
        <button
          className="register--button"
          type="submit"
          onClick={handleSubmit}
        >
          LogIn
        </button>
        <span>
          New to Express?
          <Link to="/register" className="register--login--button">
            Join us now!
          </Link>
        </span>
        <div>
          user name: {name}
          whose id: {id}
          and is now :{isAuthorized ? "authorized" : "not authorized"}
        </div>
        <button
          onClick={() => {
            dispatch(logOut());
            dispatch(removeUser());
            logoutUser();
          }}
          type="button"
        >
          logout
        </button>
      </form>
    </main>
  );
};

export default Login;
