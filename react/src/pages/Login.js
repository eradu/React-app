import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../Styles/Login.scss";
import { UserContext } from "../components/CredentialContext";
// TODO add back context to store the user object to be later used to add list items based on
//

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  //const[user, setUser] = useState({})
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); //we use navigate instead of history because in react router version 6 useHistory not work
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const sendRequest = async () => {
  //   const res = await axios
  //     .post(
  //       `http://localhost:1234/api/login`,
  //       {
  //         username: inputs.username,
  //         password: inputs.password,
  //       },
  //       { withCredentials: true }      )
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  // const login = (e) => {
  //   e.preventDefault();
  //   console.log(inputs);
  //   sendRequest().then(() => navigate("/todos"));
  //   fetch(`http://localhost:1234/api/login`, {
  //     method: 'POST',
  //     headers: {"Content-type": "application/json"},
  //     body: JSON.stringify({user})

  //   }).then(() => {
  //     setUser({user})

  //   }).catch((error) => console.error("Error " + error));
  // };

  const fetchData = async (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    try {
      const response = await axios.post(`http://localhost:1234/api/login`, {
        username: inputs.username,
        password: inputs.password,
      },
      { withCredentials: true });
      navigate("/todos");
      setUser(response.data.user);
    } catch (err) {
      if (err.response) {
        //if NOT in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        // for no response or other status errors (404...)
        console.log(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={fetchData}>
        <input
          name="username"
          className="reg-input"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          value={inputs.username}
        />
        <br />
        <input
          name="password"
          className="reg-input"
          type="text"
          placeholder="Password"
          onChange={handleChange}
          value={inputs.password}
        />
        <br />
        <button type="submit" className="reg-btn">
          Login
        </button>
      </form>
    </div>
  );
}
