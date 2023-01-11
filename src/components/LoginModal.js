import dbService from "../services/dbService";
import { useState } from "react";
import "../css/Modal.css";

import { Link } from "react-router-dom";

export default function LoginModal({closeModal,openReg,loginFlag,adminFlag,loginFun}){
    const[msg,setMsg] = useState('');
    function makeid(){
        var result = '';
        console.log(process.env);
        var characters = process.env.REACT_APP_CHARACTERS;
        let length = process.env.REACT_APP_LENGTH;
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
       return result; //random token
    }

    const token = makeid();

    const loginSubmit = (event)=>{
        event.preventDefault();
        let loginFormData = new FormData(event.target);
        loginFormData.append('token',token)
        dbService.loginUser(loginFormData)
        .then(res=>{
            if(res.data.length <= 0){
                setMsg("Email/Password is not correct");
                loginFlag(false);
                adminFlag(false);
            }
            else{
                closeModal(false);
                setMsg('');
                loginFlag(true);
                loginFun(res.data[0]);
                if(res.data[0].role === 'admin'){
                    adminFlag(true);
                }
                else{
                    adminFlag(false);
                }
                sessionStorage.setItem("sid",res.data[0].email);
                sessionStorage.setItem("srole",res.data[0].role);
            }
        })
        .catch(err=>{console.log(err)});
    }
    
    return(
        <div className="modalBg">
            <div className="modalLoginContent">
                <div className="closeBtn">
                    <button onClick={()=>{closeModal(false)}}>X</button>
                </div>
                <div className="modalContent_body"> 
                    <h1>Login</h1>
                    <form onSubmit={(event)=>loginSubmit(event)}>
                        <input type='hidden' value={token} name="tokenCon"/>
                        <input type="text" name="formChk" defaultValue="loginForm" hidden/>
                        <div>
                            <label htmlFor="user">Email: </label>
                            <input type="email" name="user" placeholder="example@mail.com" />
                        </div>
                        <div>
                            <label htmlFor="paseeword">Password: </label>
                            <input type="password" name="pass" placeholder="password" />
                        </div>
                        <button type="submit">Login</button>
                        <Link to="/email" onClick={()=>{closeModal(false)}}>Forgot your password?</Link>
                        <p>Not a member? <a onClick={()=>{closeModal(false);openReg(true)}}>Sign Up</a></p>
                    </form>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    )
}