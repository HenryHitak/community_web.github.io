import styles from "../css/AdminTable.module.css";
import dbService from "../services/dbService";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

export default function AdminTable(){
    const[data,setRes] = useState([]);
    const[data2,setRes2] = useState([]);
    const[data3,setRes3] = useState([]);
    const[data4,setRes4] = useState([]);

    const Submit = (event)=>{
        event.preventDefault();
        console.log(event.target)
        // let regFormData = new FormData(event.target);
        // dbService.getSeleted(regFormData)
        // .then(res=>{console.log(res.data)})
        // .catch(err=>{console.log(err)});
    }

    function UserTable(props){   
        let key = props.key; 
        return(
            <>
                <tbody onClick={(event)=>Submit(event)}>
                    <tr>   
                        {/* <td className='pak'>{props.userId}</td> */}
                        <td className='tripdetail'>{props.email}</td>
                        <td className='dura'>{props.firstName}</td>
                        <td className='date'>{props.lastName}</td>
                        <td className='company'>{props.dob}</td>
                        <td className='company'>{props.gender}</td>
                        <td className='company'>active</td>

                        <td className='review'><Link to="/mytripreview" state={{ from: key }} className='rbutton'>BLOCK</Link></td>
                    </tr>       
                </tbody>
            </>
        )
    }

    function PostTable(props){   
        let key = props.key; 
        return(
            <>
                <tbody>
                    <tr>   
                        <td className='pak'>{props.post_id}</td>
                        <td className='tripdetail'>{props.title}</td>
                        <td className='dura'>{props.user_name}</td>
                        <td className='dura'>{props.email}</td>
                        <td className='date'>{props.post_time}</td>
                        <td className='company'>{props.category}</td>
                        <td className='company'>{props.view}</td>
                        <td className='company'><button>Edit</button><button>Delte</button></td>
                    </tr>       
                </tbody>
            </>
        )
    }
    
    const AdminDash = ()=>{
        dbService.getData()
        .then(res=>{
            setRes(res.data);
        })
        .catch(err=>{console.log(err)});

        dbService.getPosts()
        .then(res=>{
            setRes2(res.data);
        })

        .catch(err=>{console.log(err)});
        dbService.getPosts2()
        .then(res=>{
            setRes3(res.data);
        })

        .catch(err=>{console.log(err)});
        dbService.getPosts3()
        .then(res=>{
            setRes4(res.data);
        })
        .catch(err=>{console.log(err)});
    }

    console.log(data)
    useEffect(()=>{AdminDash()},[]);
        
    return(
        <>
            <h2>Admin Controll Page</h2>
            <h3>{data.length}</h3>
            <table>
                    <caption>All Users Information</caption>
                    <thead>
                        <tr>
                            {/* <th className='pak'>User ID</th> */}
                            <th className='pak'>email</th>
                            <th className='pak'>First Name</th>
                            <th className='pak'>Last Name</th>
                            <th className='pak'>Date of Birth</th>
                            <th className='pak'>Gender</th>
                            <th className='pak'>Status</th>
                            <th className='pak'>Block</th>
                        </tr>
                    </thead>
                    {
                    data.map((item, idx) => {
                        return (
                            <UserTable
                            key={idx}
                            userId = {item.user_id}
                            email = {item.email}
                            firstName = {item.firstname}
                            lastName = {item.lastname}
                            dob = {item.dob}
                            gender = {item.gender}
                            />
                        )
                    })
                    }
            </table>
            <h2>Posts Control</h2>
            <table>
                    <caption>Community Posts</caption>
                    <thead>
                        <tr>
                            <th className='pak'>Post ID</th>
                            <th className='pak'>Title</th>
                            <th className='pak'>Writer</th>
                            <th className='pak'>Email</th>
                            <th className='pak'>Post Time</th>
                            <th className='pak'>category</th>
                            <th className='pak'>View</th>
                            <th className='pak'>Control</th>
                        </tr>
                    </thead>
                    {
                    data2.map((item, idx) => {
                        return (
                            <PostTable
                            key={idx}
                            post_id = {item.post_id}
                            title = {item.title}
                            user_id = {item.user_id}
                            user_name = {item.firstname + " " +item.lastname}
                            email = {item.email}
                            post_time = {item.post_time}
                            category = {item.category}
                            view = {item.view}
                            />
                        )
                    })
                    }
            </table>
            <table>
                    <caption>Market Posts</caption>
                    <thead>
                        <tr>
                            <th className='pak'>Post ID</th>
                            <th className='pak'>Title</th>
                            <th className='pak'>Writer</th>
                            <th className='pak'>Email</th>
                            <th className='pak'>Post Time</th>
                            <th className='pak'>category</th>
                            <th className='pak'>View</th>
                            <th className='pak'>Control</th>
                        </tr>
                    </thead>
                    {
                    data3.map((item, idx) => {
                        return (
                            <PostTable
                            key={idx}
                            post_id = {item.post_id}
                            title = {item.title}
                            user_id = {item.user_id}
                            user_name = {item.firstname + " " +item.lastname}
                            email = {item.email}
                            post_time = {item.post_time}
                            category = {item.category}
                            view = {item.view}
                            />
                        )
                    })
                    }
            </table>
            <table>
                    <caption>Job Posts</caption>
                    <thead>
                        <tr>
                            <th className='pak'>Post ID</th>
                            <th className='pak'>Title</th>
                            <th className='pak'>Writer</th>
                            <th className='pak'>Email</th>
                            <th className='pak'>Post Time</th>
                            <th className='pak'>category</th>
                            <th className='pak'>View</th>
                            <th className='pak'>Control</th>
                        </tr>
                    </thead>
                    {
                    data4.map((item, idx) => {
                        return (
                            <PostTable
                            key={idx}
                            post_id = {item.post_id}
                            title = {item.title}
                            user_id = {item.user_id}
                            user_name = {item.firstname + " " +item.lastname}
                            email = {item.email}
                            post_time = {item.post_time}
                            category = {item.category}
                            view = {item.view}
                            />
                        )
                    })
                    }
            </table>
        </>
    )
}