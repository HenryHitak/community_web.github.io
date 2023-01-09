import { useEffect, useState } from "react";
import dbService from "../services/dbService";
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate } from "react-router-dom";



export default function PassReset(){
  const [msg, setMsg] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie']);
  const navigate = useNavigate();
 
  let checker = () =>{
      if(!cookies.key){
        console.log('error');
        navigate('/home');
    }
  }
  checker();

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