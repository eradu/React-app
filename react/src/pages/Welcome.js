import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


import { UserContext } from '../components/CredentialContext'
import ToDoList from '../components/ToDoList';

import '../Styles/Welcome.scss'

export default function Welcome() {

    const logout = () => {
        setUser(null);
    }
    const{user, setUser }  = useContext(UserContext);
    return ( 
        <div className='welcome-container'>
            <h1>Welcome { user && user.username }</h1>   
            {user && <button className='logout-btn' onClick={logout}>Logout</button>}   
            {!user && <Link to='/register'>Register</Link>}
            {!user && <Link to='/login'>Login</Link>}
            { user && <ToDoList/>}
        </div>
    )
}
