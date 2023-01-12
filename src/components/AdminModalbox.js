import "../css/AdminModal.css";
import dbService from "../services/dbService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function AdminModal(props){

    const[test1,test2] = useState(false);

    //update or activate selected user
    const update = (event,key,action)=>{
      event.preventDefault();
      test2(true)

      dbService.update(key,action)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{console.log(err)});
    }
    //////////////////////////////////////
    
    const close = () =>{
      dbService.getData()
      .then(res=>{
        const slice = res.data.slice(props.offset, props.offset + props.view)
        const postData = slice.map(pd => pd)
        props.new(postData)
      })
      .catch(err=>{console.log(err)});

      props.closeModal(false)
    }

    console.log(props.action)

    return(
        <div className="amodalBg">
            <div className="amodalRegContent">
                <div className="closeBtn">
                    <button type="button" onClick={()=>close()}>X</button>
                </div>
                {test1 ?
                    <div className="modalContent_success">
                        <FontAwesomeIcon icon={faCircleCheck} className="chkIcon"/>
                        <div className="AdminMsg">
                            <p>The user status of "{props.test.email}" is now "{props.action}"</p>
                            <p>And informed the user about the status change through an email</p>
                        </div>
                    </div>
                    :
                    <div className="modalContent_body">
                        <h1>Are you sure you want to {props.action} "{props.test.email} ?"</h1>
                        <form onSubmit={(event)=>update(event,props.test.userId,props.action)}>
                            <div className="AdminMsg">
                                <label htmlFor="email">Send a message to the user</label>
                                <input type="text" name="EmailMsg" placeholder="Why" required/>
                            </div>
                            <button type="submit">{props.action}</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}