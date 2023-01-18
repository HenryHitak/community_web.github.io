import { useEffect, useState } from "react";
import dbService from "../services/dbService";
import { Link, useNavigate } from "react-router-dom";
import style from '../css/Email.module.css';

export default function PassReset(){
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const checker = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let pass = urlParams.get('pass');
    console.log(pass); //querystring from url(passed pass)
    dbService.checkPass(pass)
     .then(res => {
        console.log(res.data);
        if(res.data !== true){
            navigate('/404'); //link is invalid or expired
        }
     })
     .catch(err=>{console.log(err)});
    }
    useEffect(()=>checker(),[]);

  const passResetSubmit = (event)=>{
      event.preventDefault();
      let passResetFormData = new FormData(event.target);
      dbService.resetPass(passResetFormData)
      .then(res=>{
          console.log(res.data);
          setMsg(true);
          event.target = "";
      })
      .catch(err=>{console.log(err)});
  }
  return(
      <>
      { msg == null ? 
        <form className={ style.resetconf } onSubmit={(event)=>passResetSubmit(event)}>
        <h1>Reset your password</h1>
            <input type="email" name="email" placeholder="Enter your email"/>
            <input type="password" name="pass" placeholder="Enter your password"/>
            <input type="password" name="passCon" placeholder="Confirm your password"/>
            <div>
                <button type="submit">Confirm</button>
            </div>
        </form>
      :
      <div className={ style.succes }>
        <h1>Update succesfully</h1>
        <Link to="/">Back to Login</Link>
      </div>
       }
          
          
      </>
  )
}