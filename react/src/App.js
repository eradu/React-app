import React, { useState, useEffect } from "react"; // import react Component
import { Route, Routes } from "react-router-dom"; //import react-router

import ToDoList from "./components/ToDoList"; // import components in parent component
import Navbar from "./components/Navbar";
import About from "./components/About";

import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import JsonParse from "./pages/JsonParse";

import { UserContext } from "./components/CredentialContext";
import history from "./components/History";

import "./Styles/App.scss"; // import styles from scss styles
import "./Styles/Mobile.scss";


const url = "http://localhost:1234/api/user";

function App() {
  const [user, setUser] = useState('');
//added useEfect to check if the user exist; if exist we set the user id as data.user.id from context and add the username as "Already logged in, not having username"
//if user not exist we redirect to login
  useEffect(() => {
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            userId: data.user.userId,
            username: data.user.username,
          });
        } else {
          history.replace("/login");
        }
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Navbar />
      <h3>Hello {user ? user.username : ""}</h3>  
        <div className="app-inner">
          <Routes>
            {/* to use routes in version 6 of react router we put first the Route component, then use 'exact' keyword to specifi the exact path for this route, then we specify the 'path' for the route and then specifi the component for this route*/}
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="login" element={<Login />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="todos" element={<ToDoList />} />
            <Route exact path="about" element={<About />} />
            <Route exact path="json" element={<JsonParse />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App; // export default is used to export a single class, function or primitive from a script file
