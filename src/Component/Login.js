import React from 'react'
import logo from '../images/logo.png'
import Button from '@mui/material/Button';
import '../CSS/Login.css'
import {auth,provider} from '../firebase'
import { useStateValue } from '../Stateprovider';
import { actionTypes } from '../reducer';

function Login() {

  const [{},dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider).then((result)=>
            {
              dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
              })
            })

    }

  return (
    <>
    <div className='login'>
        <div className='login-container'>
            <img src={logo} height={150} />
            <p>Sign In to Whatsapp</p>
            
            <Button variant="contained" className='btn' onClick={signIn}>Sign In with Google</Button>

            
            
        </div>
    </div>
      
    </>
  )
}

export default Login
