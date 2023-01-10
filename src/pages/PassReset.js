import { useEffect, useState } from "react";
import dbService from "../services/dbService";
import { Navigate, useNavigate } from "react-router-dom";

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
          setMsg(res.data);
          event.target = "";
      })
      .catch(err=>{console.log(err)});
  }
  return(
      <>
          <h1>Reset your password</h1>
          <form onSubmit={(event)=>passResetSubmit(event)}>
              <input type="email" name="email" placeholder="Enter your email"/>
              <input type="password" name="pass" placeholder="Enter your password"/>
              <input type="password" name="passCon" placeholder="Confirm your password"/>
              <button type="submit">Confirm</button>
          </form>
          { msg !== null ? <h1>{msg}</h1> : null }
      </>
  )
}