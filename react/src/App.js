import React, { useState } from "react"; // import react Component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //import react-router

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
    //const credentialState = useState(null);
    const [user, setUser] = useState(null);
        return ( 
            <UserContext.Provider value={{user, setUser}}>
                <Router> {/* first we ad BrowserRouter component as Router*/}
                    <div className="App"> 
                        <Navbar/> {/* nav bar component wich include links to separate pages */}
                        <div className="app-innser"> 
                            <Routes>
                            {/* to use routes in version 6 of react router we put first the Route component, then use 'exact' keyword to specifi the exact path for this route, then we specify the 'path' for the route and then specifi the component for this route*/}
                            <Route exact path='/' element={<Welcome/>}/> {/*first route to application page*/}
                            <Route exact path='/todos' element={<ToDoList/>}/> {/*first route to application page*/}
                            <Route exact path="/login" element={<Login/>}/> 
                            <Route exact path="/register" element={<Register/>}/> 
                            <Route exact path="/about" element={<About/>}/> {/* second route to about page */}
                            </Routes>        
                        </div>
                    </div>
                </Router>
            </UserContext.Provider>
        )
    } 
 
export default App; // export default is used to export a single class, function or primitive from a script file
