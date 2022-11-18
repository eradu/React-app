import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


import { CredentialsContext } from '../components/CredentialContext'
import ToDoList from '../components/ToDoList';

import '../Styles/Welcome.scss'

export default function Welcome() {

    const logout = () => {
        setCredentials(null);
    }
    const[ credentials, setCredentials ] = useContext(CredentialsContext);
    return ( 
        <div className='welcome-container'>
            <h1>Welcome { credentials && credentials.username }</h1>   
            {credentials && <button className='logout-btn' onClick={logout}>Logout</button>}   
            {!credentials && <Link to='/register'>Register</Link>}
            {!credentials && <Link to='/login'>Login</Link>}
            { credentials && <ToDoList/>}
        </div>
    )
}
