import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import "../Styles/Register.scss";

export default function Register() {
    const[inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate(); //we use navigate instead of history because in react router version 6 useHistory not work
    const handleChange = (e) => {
        setInputs((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
	};

    const sendRequest = async () => {
        const res = await axios.post(`http://localhost:1234/api/register`, {
            username: inputs.username,
            password: inputs.password
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;      
    }
    const register = (e) => {
        e.preventDefault();
        console.log(inputs)
        sendRequest().then(() => navigate("/login"))
    };

  	return (
    <div className="register-container">
        <h1>Register Page</h1>
      <form onSubmit={register}>
        <input 
            name="username"
            className='reg-input'
            type="text"
            placeholder='Username'
            onChange={handleChange}
            value={inputs.username}
            />
        <br />
        <input
            name="password"
            className='reg-input' 
            type="text" 
            placeholder='Password' 
            onChange={handleChange}
            value={inputs.password}
             />
        <br />
        <button type="submit" className='reg-btn'>Register</button>
      </form>
    </div>
  )
}
