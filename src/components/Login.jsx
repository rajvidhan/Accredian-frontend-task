import React,{useState} from 'react'
import styles from "./style.module.css"
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
const [values,setvalues] = useState({
  email:"",
  password:""
});
//handle the change of input 
const handlechange = (event)=>{
  setvalues({...values,[event.target.name]:event.target.value});
}


const toastcss ={
  width: "100%",
  height: "80px",
  padding: "20px",
  position:"bottom-center",
  theme:"dark",
  autoClose:3000,
  draggable:true
}

//handle the validation 
const handlevalidation =()=>{
  const {email,password } = values;
  if(email==""){
    toast.error("EMAIL AND PASSWORD IS REQUIRED..",toastcss);
    return false;
  }
  if(password== ""){
    toast.error("EMAIL AND PASSWORD IS REQUIRED ..",toastcss);
    return false;
  }
  return true;
}

//handlesubmit 
const handlesubmit =(event)=>{
  event.preventDefault();
  if(handlevalidation()){
    axios.post('http://localhost:8081/login',values)
    .then(res=>{
    if(res.data === "Success"){
      navigate("/home")
    }else{
      alert("Sorry the user is not registered 😞")
    }
    })
    .catch(err=>console.log(err));
 }
 else{
   console.log("the validation is failed");
 }

}


  return (
    <div className={styles.container}>
    <form  >
    <h1 className={styles.heading}>
      Login Form </h1>

      <input onChange={(event)=>handlechange(event)} type="email" name='email' placeholder='Enter Your Email' />
      <input onChange={(event)=>handlechange(event)} type="password" name='password' placeholder='Password' />
      <br />
      <button onClick={(event => handlesubmit(event))} type='submit'>Submit</button>
      <p>Not have an account? <a href="/register">Register</a></p>

    </form>
    <ToastContainer />
 </div>
  )
}

export default Login
