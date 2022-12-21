import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../components/CredentialContext";
import ToDoList from "../components/ToDoList";

import "../Styles/Welcome.scss";

export default function Welcome() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="welcome-container">
      {!user && <h2>Welcome to ToDo List</h2>}
      {!user && <h3>Please register or login to your account</h3>}
      {!user && <Link to="register">Register</Link>}
      {!user && <Link to="login">Login</Link>}
      {user && <h2>Hi {user && user.username}</h2>}
      {user && <ToDoList />}
    </div>
  );
}
