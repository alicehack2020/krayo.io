import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./nav.css"
import { GoogleLogout } from 'react-google-login';
const NavBar = () => {
const clientId = "164254241743-1mnk3o9k8v4p63851ktbah3kuae0oo9i.apps.googleusercontent.com";
const token =JSON.parse(localStorage.getItem('token'))

const [login,setLogin]=useState(false)
  
  const navigation = useNavigate()
  const onLoginSuccess = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLogin(false)
    navigation("/")
  }

  useEffect(() => {
    if (token)
    {
      setLogin(true)
    }
  },token)

  return (
      <div className='nav_header'>   
      <div>
        {
          login?<div></div>:<Link to="/" className='nav_link'>Home</Link>
        }
        {
          login?<div className='navButton'>
              <Link to="/list" className='nav_link'>All Files</Link></div>:<div></div>
        }    
      </div>
      
      
      {login? <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLoginSuccess}
        >
        </GoogleLogout>
      </div>:<div></div>}
    </div>
  )
}

export default NavBar