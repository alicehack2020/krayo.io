import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import gmail from "../img/gmail.png"
import event from "../img/event.svg"
import festival from "../img/festival.svg"
import { GoogleLogin} from 'react-google-login';
import axios from 'axios'
// import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { gapi } from "gapi-script" 
const Login = () => {
const Navigate=useNavigate()
const clientId = "164254241743-1mnk3o9k8v4p63851ktbah3kuae0oo9i.apps.googleusercontent.com";

 const onLoginSuccess = async(res) => {
    console.log(res)
    await axios.post("http://localhost:8000/api/user/register", res.profileObj).then((res) => {
      console.log(res)
       
      localStorage.setItem('token', JSON.stringify(res.data.data.token))
      localStorage.setItem('user',JSON.stringify(res.data.data.data))
      console.log(res)
      Navigate("/list")
    }).catch((error) => {
       
     })
   
};

const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);



  return (
    <>
      <div className='loginMain'>
        <div>
           <img src={event} alt="" className='homeImage'/>
        </div>
         
          <GoogleLogin
              clientId={clientId}
              buttonText="Sign In"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}>Login with Gmail</GoogleLogin>
        
      </div>
      <div className='headingHome'>
        <p>Create Your Event For Free Let's Join</p>
      </div>
      
      
    
    </>
  )
}

export default Login