import dbService from "../services/dbService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Email.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


export default function EmailConfirm(){
   const [ msg, setMsg ] = useState(null);
   const [ useremail, setUserEmail ] = useState('');

  const EmailSubmit = (event)=>{
      event.preventDefault();
      let EmailFormData = new FormData(event.target);
      dbService.loginEmail(EmailFormData)
      .then(res=>{
        console.log(res);
        if(res.data !== false){
          setMsg('link');
          setUserEmail(res.data);
        }
        // setUserEmail(res.data)
      })
      .catch(err=>{console.log(err)});
  }


  return(
      <>
      { msg == null ? 
      <div className={styles.emailconf}>
        <h1>Reset Password</h1>
        <p>Enter the email associated with your account and we'll send an email with instructions to reset your password</p>
        <form className={styles.emailConForm} onSubmit={(event)=>EmailSubmit(event)}>
          <label name="email">Email</label>
            <input type="email" name="email" placeholder="Write your email"/>
            <button type="submit">Send email</button>
            <Link to="/home">Back to log in</Link>
        </form>
      </div>
        : 
        <div className={styles.afteremail}>
        <FontAwesomeIcon icon={ faEnvelope } />         
          <h1>Check Your Email</h1>
          <p>We sent password reset link to {useremail}.<br></br>The link will be expired after 15 minutes.</p>
          <div>
            <p>Didn't receive the email?</p>
            <button onClick={()=>setMsg(null)}>Click here</button>
          </div>
          <Link to="/home">Back to Login</Link>
        </div>
      }
          
      </>
  )
}