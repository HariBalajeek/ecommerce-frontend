import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const LoginPopup = ({setShowLogin}) => {
  
const {url,setToken} = useContext(StoreContext)  
const [currState,setCurrState] = useState("Login")
const [data,setData] = useState({
  name:'',
  email:'',
  password:'',
})

const onchangeHandler = (event) =>{
  const name = event.target.name;
  const value = event.target.value
  setData({...data,[name]:value})
}

const onLogin = async (event) => {
  event.preventDefault()
  let newUrl = url
  if(currState ==='Login'){
    newUrl += "api/user/login"
  }
  else{
    newUrl += "api/user/register"
  }
    const response = await axios.post(newUrl,data)
    
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
}

  return (
    <div className='login-popup'>
<form onSubmit={onLogin} action="" className="login-popup-container">
    <div className="login-popup-title">
        <h2> {currState}</h2>
        <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
    </div>
    <div className="login-popup-inputs">
        {currState==="Login"?<></>:<input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder='Your Name' required=""/>}
        <input type="email" name='email' onChange={onchangeHandler} value={data.email} placeholder='Your email' required />
        <input type="password" name='password' onChange={onchangeHandler} value={data.password}  placeholder='password' required  />
    </div>
    <button type='submit'>{currState==="Sign-up"?"create account":"Login"}</button>
    <div className="login-popup-condition"> 
    <input type="checkbox" required />
    <p>agree to our terms and conditions</p>
    </div>
    {currState==="Login"?<p>create new account? <span onClick={()=>setCurrState("Sign-up")}>click here</span></p>:
    <p>continue account <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
    
    
</form>
    </div>
  )
}

export default LoginPopup