import axios from 'axios';
import React from 'react';
//import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
//import { CredentialsContext } from '../components/CredentialContext';

import "../Styles/Register.scss";

// export const handleErrors = async (response) => { //function to handle errors that apear when a username is allready registered
//     if(!response.ok) {
//         const { message } = await response.json()
//         throw Error(message);
//     }
//     return response.json();
// }


export default function Register() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
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
        console.log(e.target.name, "value", e.target.value)
      };
    // const [error, setError] = useState('');
    //const [, setCredentials ] = useContext(CredentialsContext);

    const sendRequest = async () => {
        const res = await axios.post(`http://localhost:1234/api/register`, {
            username: inputs.username,
            password: inputs.password
        }).catch(err => console.log(err));
        const data = await res.data;
        //console.log(res.data)
        return data;
        
    }
    const register = (e) => {
        e.preventDefault();
        console.log(inputs)
        sendRequest().then(() => navigate("/login"))
        // fetch(`http://localhost:1234/api/register`, { //we send the username and password to backend server
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username,
        //         password
        //     }),
        // })
        // .then(handleErrors) //use the handle errors function in case that exists
        // .then(() => {
        //     setCredentials({
        //         username,
        //         password
        //     });
        //     navigate("/"); //if everything is ok, the user is registered with succes, we redirect him to home page (Welcome page)
        // })
        // .catch((error) => {
        //   setError(error.message); //catch the error and use the error message in frontend code to show it to the user 
        // })
    };

	

  	return (
    <div className="register-container">
        <h1>Register Page</h1>
        {/* <span className='username-error'>{error}</span> show the error in frontend to the user */}
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
