import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import "../Styles/Login.scss";


export default function Login() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
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
        console.log(e.target.name, "value", e.target.value)
      };
    // const [error, setError] = useState('');
    //const [, setCredentials ] = useContext(CredentialsContext);

    const sendRequest = async () => {
        const res = await axios.post(`http://localhost:1234/api/login`, {
            username: inputs.username,
            password: inputs.password
          }, {withCredentials: true}
        ).catch(err => console.log(err));
        const data = await res.data;
        //console.log(res.data)
        return data;
        
    }
    const login = (e) => {
        e.preventDefault();
		    console.log(inputs)
        sendRequest().then(() => navigate("/todos"))
        // fetch(`http://localhost:1234/api/login`, { //we send the username and password to backend server
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username,
        //         password
        //     }),
        // })
        // // .then(handleErrors) //use the handle errors function in case that exists
        // .then(() => {
        //     setCredentials({
        //         username,
        //         password
        //     });
        //     navigate("/"); //if everything is ok, the user is loged in with succes, we redirect him to home page (Welcome page)
        // })
        // .catch((error) => {
        //   setError(error.message); //catch the error and use the error message in frontend code to show it to the user 
        // })
    };

  	return (
    <div className="login-container">
        <h1>Login Page</h1>
        {/* <span className='username-error'>{error}</span> show the error in frontend to the user */}
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
