import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import "../Styles/Login.scss";


export default function Login() {
    const[inputs, setInputs] = useState({
        username: "kkk",
        password: "kkkk"
    });
	const navigate = useNavigate(); //we use navigate instead of history because in react router version 6 useHistory not work
    const handleChange = (e) => {
        setInputs((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
	};

    const sendRequest = async () => {
        const res = await axios.post(`http://localhost:1234/api/login`, {
            username: inputs.username,
            password: inputs.password
          }, {withCredentials: true}
        ).catch(err => console.log(err));
        const data = await res.data;
        return data;      
    }
    const login = (e) => {
        e.preventDefault();
		    console.log(inputs)
        sendRequest().then(() => navigate("/todos"))
    };

  	return (
    <div className="login-container">
        <h1>Login Page</h1>
      <form onSubmit={login}>
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
        <button type="submit" className='reg-btn'>Login</button>
      </form>
    </div>
  )
}
