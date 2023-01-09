import dbService from "../services/dbService";
import { useState } from "react";
import { useCookies } from 'react-cookie';

export default function EmailConfirm(){
   const [ result, setResult ] = useState(null);
   const [cookies, setCookie, removeCookie] = useCookies(['cookie']);

  const EmailSubmit = (event)=>{
      event.preventDefault();
      let EmailFormData = new FormData(event.target);
      dbService.loginEmail(EmailFormData)
      .then(res=>{
        //I couldn't set cookie from backend, so now just set in frontend 
        setCookie('key', res.data);
        setResult('Email has been sent successfully');
        event.target = '';
        // setResult(res.data);
        console.log(res);
      })
      .catch(err=>{console.log(err)});
  }
  return(
      <>
          <h1>Confirm your email</h1>
          <form onSubmit={(event)=>EmailSubmit(event)}>
              <input type="email" name="email" placeholder="Write your email"/>
              <button type="submit">Send Email</button>
          </form>
          { result !== null ? <h1>{result}</h1> : null }
      </>
  )
}