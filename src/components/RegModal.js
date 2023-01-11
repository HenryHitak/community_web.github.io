import "../css/Modal.css";
import dbService from "../services/dbService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function RegModal({closeModal}){
    const[msg,setMsg] = useState('');
    const[regsucc,setRegSucc] = useState(false);
    const formSubmit = (event)=>{
        event.preventDefault();
        let regFormData = new FormData(event.target);
        dbService.registerUser(regFormData)
        .then(res=>{
            if(res.data == true){
                setMsg('');
                setRegSucc(true);
            }
            else{
                setMsg('Email already registered');
            }
        })
        .catch(err=>{console.log(err)});
    }
    return(
        <div className="modalBg">
            <div className="modalRegContent">
                <div className="closeBtn">
                    <button onClick={()=>{closeModal(false)}}>X</button>
                </div>
                {regsucc ?
                    <div className="modalContent_success">
                        <FontAwesomeIcon icon={faCircleCheck} className="chkIcon"/>
                        <p>We've sent a confirmation to your email for verification</p>
                        <div>
                            <button onClick={()=>{closeModal(false)}}>OK</button>
                        </div>
                    </div>
                    :
                    <div className="modalContent_body">
                        <h1>Register</h1>
                        <form onSubmit={(event)=>formSubmit(event)}>
                            <input type="text" name="formChk" defaultValue="regForm" hidden/>
                            <div>
                                <label htmlFor="email">Email: </label>
                                <input type="email" name="email" placeholder="example@email.com" required/>
                            </div>
                            <div>
                                <label htmlFor="password">Password: </label>
                                <input type="password" name="password" placeholder="Your password" required/>
                            </div>
                            <div>
                                <label htmlFor="firstname">First Name: </label>
                                <input type="text" name="firstname" placeholder="Your first name" required/>
                            </div>
                            <div>
                                <label htmlFor="lastname">Last Name: </label>
                                <input type="text" name="lastname" placeholder="Your last name" required/>
                            </div>
                            <div>
                                <label htmlFor="dob">Date of Birth: </label>
                                <input type="date" name="dob" required/>
                            </div>
                            <div>
                                <label htmlFor="gender">Gender: </label>
                                <input type="radio" id="male" name="gender" value="M" required/>
                                <label htmlFor="male">Male</label>
                                <input type="radio" id="female" name="gender" value="F" />
                                <label htmlFor="female">Female</label>
                                <input type="radio" id="not" name="gender" value="N" />
                                <label htmlFor="not">Perfer not to say</label>
                            </div>
                            <div>
                                <label htmlFor="regType">Register for: </label>
                                <select name="regType" required>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        <p>{msg}</p>
                    </div>
                }
            </div>
        </div>
    )
}