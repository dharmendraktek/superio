"use client"
import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const FormContent = () => {
  const [form, setForm] = useState({
    email:'',
    password:''
  });

  const router = useRouter();

  const handleChange =  (e) => {
     const {name, value} = e.target;
     setForm((prev) => ({...prev, [name]:value}))
  }

  const handleLogin = async() => { 
    if(!form.email && !form.password){
      return;
    }  
    try{
      const response = await axios.post('http://10.10.105.229:8000/api/login/', form)
      if(response.status){
         toast.success('You are logged in successfully')
        window.location.href = '/candidates-dashboard/dashboard'
      }
    }catch(err){
      toast.error(err.response.data.non_field_errors[0] || "Something went wrong")
    }

  } 

  
  return (
    <div className="form-inner">
      <h3>Login to Superio</h3>

      {/* <!--Login Form--> */}
      {/* <form > */}
        <div className="form-group">
          <label>Email</label>
          <input type="text" name="email" onChange={handleChange} placeholder="Username" required />
        </div>
        {/* name */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            onKeyDown={(e) =>{
              if(e.code == "Enter"){
                handleLogin
              }
            }}
            required
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            onClick={handleLogin}
            // type="submit"
            // name="log-in"
          >
            Log In
          </button>
        </div>
        {/* login */}
      {/* </form> */}
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
