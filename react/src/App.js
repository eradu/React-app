import React, { useState } from "react"; // import react Component
import { Route, Routes } from "react-router-dom"; //import react-router

import ToDoList from "./components/ToDoList"; // import components in parent component
import Navbar from "./components/Navbar";
import About from "./components/About";

import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

import { UserContext } from "./components/CredentialContext";

import "./Styles/App.scss"; // import styles from scss styles
import "./Styles/Mobile.scss";

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Navbar />
          <div className="app-inner">
            <Routes>
              {/* to use routes in version 6 of react router we put first the Route component, then use 'exact' keyword to specifi the exact path for this route, then we specify the 'path' for the route and then specifi the component for this route*/}
              <Route exact path="/" element={<Welcome />}/>
              <Route exact path="todos" element={<ToDoList />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="register" element={<Register />} />
              <Route exact path="about" element={<About />} />
            </Routes>
          </div>
        </div>
    </UserContext.Provider>
  );
}

export default App; // export default is used to export a single class, function or primitive from a script file
