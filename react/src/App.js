import React, { useState } from "react"; // import react Component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //import react-router

import ToDoList from "./components/ToDoList"; // import components in parent component
import Navbar from "./components/Navbar";
import About from "./components/About";

import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

import { CredentialsContext } from "./components/CredentialContext";

import "./Styles/App.scss"; // import styles from scss styles
import "./Styles/Mobile.scss";




function App() {
    const credentialState = useState(null);

        return ( 
            <CredentialsContext.Provider value={credentialState}>
                <Router> {/* first we ad BrowserRouter component as Router*/}
                    <div className="App"> 
                        <Navbar/> {/* nav bar component wich include links to separate pages */}
                        <div className="app-inner"> 
                            <Routes>
                            {/* to use routes in version 6 of react router we put first the Route component, then use 'exact' keyword to specifi the exact path for this route, then we specify the 'path' for the route and then specifi the component for this route*/}
                            <Route exact path='/' element={<Welcome/>}/> {/*first route to application page*/}
                            <Route exact path='/todos' element={<ToDoList/>}/> {/*first route to application page*/}
                            <Route exact path="/login" element={<Login/>}/> second route to abaout page
                            <Route exact path="/register" element={<Register/>}/> second route to abaout page
                            <Route exact path="/about" element={<About/>}/> {/* second route to abaout page */}
                            </Routes>        
                        </div>
                    </div>
                </Router>
            </CredentialsContext.Provider>
        )
    } 
 
export default App; // export default is used to export a single class, function or primitive from a script file
