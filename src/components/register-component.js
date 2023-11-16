import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth_service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  //Event Listener Handler
  const UsernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const EmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const RoleHandler = (e) => {
    setRole(e.target.value);
  };
  const RegisterHandler = (e) => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration succeeds, You are now redirect to the login page."
        );
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
          <label htmlFor="username">Username</label>
          <input
            onChange={UsernameHandler}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={EmailHandler}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={PasswordHandler}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">role</label>
          <input
            onChange={RoleHandler}
            type="text"
            className="form-control"
            name="role"
          />
        </div>
        <br />
        <button onClick={RegisterHandler} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
