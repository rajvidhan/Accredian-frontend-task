import React, { useState } from 'react'
import styles from "./style.module.css"
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
const navigate = useNavigate();
const [values, setvalues] = useState({
  name:"",
  email:"",
  password:"",
  confirmpassword:""
})
  //handle the changes 
  const handlechange = (event)=>{
    setvalues({...values,[event.target.name]:event.target.value});
    
  }
  
  
const toastOptons ={
  positions:"bottom-left",
  autoclose:8000,
  pauseOnhover:true,
  draggable:true,
  theme:"dark"
}
//handle validation
console.log(values);
const handlevalidation=()=>{
  const { password, confirmpassword,name,email } = values;

  if(password!==confirmpassword){
    toast.error(" 'Hello'👋 Your password and confirm password is not match",toastOptons);
    return false;
  }
  else if(name.length<3){
    toast.error("'Hello' 👋 Username should be greater then 3 charecter",toastOptons);
    return false;
  }
  else if(password.length<8){
    toast.error("'Hello' 👋 password should be equal and greater then 8 charecters",toastOptons);
    return false;
  }
  else if(email == ""){
    toast.error("'Hello' 👋Please Enter Email Here",toastOptons);
    return false;
  }
  return true;
}
//handlesubmit 
const handlesubmit =(event)=>{
  event.preventDefault();
  
  // const {name,email,password} = values;
  
  if(handlevalidation()){
     axios.post('http://localhost:8081/register',values)
     .then(res=>{
      navigate("/");
      console.log(res);
     })
     .catch(err=>console.log(err));
  }
  else{
    console.log("the validation is failed");
  }
}





  return (
    
  <div>
      <div className={styles.container}>
    <form >
    <h1 className={styles.heading}>
      Register Form </h1>

      <input onChange={(event)=>handlechange(event)} type="text" name='name' placeholder='Username' />
      <input onChange={(event)=>handlechange(event)} type="email" name='email' placeholder='Enter Your Email' />
      <input onChange={(event)=>handlechange(event)} type="password" name='password' placeholder='Password' />
      <input onChange={(event)=>handlechange(event)} type="password" name='confirmpassword' placeholder='Confirm Password' />


      <br />
      <button onClick={(event => handlesubmit(event))} type='submit'>Submit</button>
    </form>
   
 </div>
  <ToastContainer />
  </div>
  
  )
}

export default Register
