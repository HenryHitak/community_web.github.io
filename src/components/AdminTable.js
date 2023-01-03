import styles from "../css/AdminTable.module.css";
import dbService from "../services/dbService";
import {useState,useEffect} from "react";
import Modal from "./AdminModalbox";

export default function AdminTable(){
    const[userdata,setRes] = useState([]);
    const[CommunityData,setRes2] = useState([]);
    const[data3,setRes3] = useState([]);
    const[data4,setRes4] = useState([]);


    /////////////////////////////////////search function 
    const [search, setSearch] = useState("")

    const onChangeSearch = (e) => {
        e.preventDefault();
        
        dbService.getData()
        .then(res=>{
            setRes(res.data);
        })
        .catch(err=>{console.log(err)});

        setSearch(e.target.value)
    }

    const onSearch = (e) => {
        e.preventDefault();
        if(search === null || search === "") {
            dbService.getData()
            .then(res=>{
                setRes(res.data);
            })
            .catch(err=>{console.log(err)});
        } else {
            const filterData = userdata.filter((row) => row.email.includes(search))
            setRes(filterData)
        }
    }
    ///////////////////////////////////////

    // get only selected user's posts
    const filter = (test)=>{
        dbService.change(test,"community_tb")
        .then(res=>{
            console.log(res.data)
            setRes2(res.data);
        })
        dbService.change(test,"market_td")
        .then(res=>{
            console.log(res.data)
            setRes3(res.data);
        })
        dbService.change(test,"job_tb")
        .then(res=>{
            console.log(res.data)
            setRes4(res.data);
        })
    }
    ///////////////////////////////////

    //update or activate selected user
    const update = (key,action)=>{
        dbService.update(key,action)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{console.log(err)});

        dbService.getData()
        .then(res=>{
            setRes(res.data);
        })
        .catch(err=>{console.log(err)});
    }
    //////////////////////////////////////


    function UserTable(props){   
        let key = props.userId; 
        return(
            <>
                <li className={styles.table_row} onClick={()=>filter(key)}>   
                    <div className={styles.col_1} >{props.type}</div>
                    <div className={styles.col_2}>{props.email}</div>
                    <div className={styles.col_3}>{props.firstName} {props.lastName}</div>
                    <div className={styles.col_5}>{props.dob.substr(0,10)}</div>
                    <div className={styles.col_6}>{props.gender}</div>
                    <div className={styles.col_7}>{props.status}</div>

                    <div className={styles.col_8}>
                        {props.status === "active" ?  <button className={styles.red} onClick={()=>update(key,"Blocked")} >Block</button> : <button className={styles.gray} onClick={()=>update(key,"active")} >Activate</button>}
                        {props.status === "active" ?  null : <button className={styles.red} onClick={e => this.modalOpen(e)} >Delete</button>}
                    </div>
                </li>       
            </>
        )
    }

    function PostTable(props){   
                if(props.data === "No Posts"){
                    return(
                        <>
                            <li>
                                <p>{props.data}</p>
                            </li>
                        </>
                    )
                }else{
                    return(
                        <>
                            {props.status === "active" ?  
                            <li className={styles.table_row} >
                                <div className={styles.col_1}>{props.post_id}</div>
                                <div className={styles.col_2}>{props.title}</div>
                                <div className={styles.col_3}>{props.user_name}</div>
                                <div className={styles.col_4}>{props.email}</div>
                                <div className={styles.col_5}>{props.post_time.substr(0,10) +" "+ props.post_time.substr(11,8)}</div>
                                {props.postset === "commu" ?  <div className={styles.col_6}>{props.category}</div> : ""}
                                <div className={styles.col_7}>{props.view}</div>
                                <div className={styles.col_8}>
                                    <button className={styles.gray}>Edit</button>
                                    <button className={styles.red}>Delete</button>
                                </div>
                            </li>       
                            : <li className={styles.table_row_block}>
                                <div className={styles.col_1}>{props.post_id}</div>
                                <div className={styles.col_2}>{props.title}</div>
                                <div className={styles.col_3}>{props.user_name}</div>
                                <div className={styles.col_4}>{props.email}</div>
                                <div className={styles.col_5}>{props.post_time.substr(0,10) +" "+ props.post_time.substr(11,8)}</div>
                                {props.postset === "commu" ?  <div className={styles.col_6}>{props.category}</div> : ""}
                                <div className={styles.col_7}>{props.view}</div>
                                <div className={styles.col_8}>
                                    <button className={styles.gray}>Edit</button>
                                    <button className={styles.red}>Delete</button>
                                </div>
                            </li>}
                        </>
                    )
                }
            }
    

    // db get 
    const AdminDash = ()=>{
        dbService.getData()
        .then(res=>{
            setRes(res.data);
        })
        .catch(err=>{console.log(err)});

        dbService.getPosts("community_tb")
        .then(res=>{
            setRes2(res.data);
        })

        .catch(err=>{console.log(err)});
        dbService.getPosts("market_td")
        .then(res=>{
            setRes3(res.data);
        })

        .catch(err=>{console.log(err)});
        dbService.getPosts("job_tb")
        .then(res=>{
            setRes4(res.data);
        })
        .catch(err=>{console.log(err)});
    }


    useEffect(()=>{AdminDash()},[]);
        
    return(
        <>
            <Modal></Modal>
            <h2>Admin Controll Page</h2>
            <div className={styles.admincontainer}>
                    <h3>All Users Information</h3>
                    <form className={styles.search} onSubmit={(e)=>onSearch(e)}>
                        <input type="text" value={search} placeholder="Search Email" onChange={onChangeSearch}></input>
                        <button type="submint">Search</button>
                    </form>
                    <ul className={styles.responsive_table} >
                        <li className={styles.table_header}>
                            {/* <th className='pak'>User ID</th> */}
                            <div className={styles.col_1}>type</div>
                            <div className={styles.col_2}>email</div>
                            <div className={styles.col_3}>Name</div>
                            <div className={styles.col_5}>Date of Birth</div>
                            <div className={styles.col_6}>Gender</div>
                            <div className={styles.col_7}>Status</div>
                            <div className={styles.col_8}>update</div>
                        </li>
                    {
                    userdata.map((item, idx) => {
                        return (
                            <UserTable
                            key={item.user_id}
                            type = {item.role}
                            userId = {item.user_id}
                            email = {item.email}
                            firstName = {item.firstname}
                            lastName = {item.lastname}
                            dob = {item.dob}
                            gender = {item.gender}
                            status = {item.status}
                            />
                        )
                    })
                    }
                    </ul>
            </div>

            <div className={styles.postcontainer}>
                <div className={styles.post}>
                    <button className={styles.all} onClick={()=>AdminDash()}>See all Posts</button>
                </div>
                <div className={styles.admincontainer}>
                        <h3>Community Posts</h3>
                        <ul className={styles.responsive_table}>
                            <li className={styles.table_header}>
                                <div className={styles.col_1}>Post ID</div>
                                <div className={styles.col_2}>Title</div>
                                <div className={styles.col_3}>Writer</div>
                                <div className={styles.col_4}>Email</div>
                                <div className={styles.col_5}>Post Time</div>
                                <div className={styles.col_6}>category</div>
                                <div className={styles.col_7}>View</div>
                                <div className={styles.col_8}>Control</div>
                            </li>
                        {
                        CommunityData.map((item, idx) => {
                            return (
                                <PostTable
                                key={idx}
                                data={item.no_data}
                                postset="commu"
                                post_id = {item.post_id}
                                title = {item.title}
                                user_id = {item.user_id}
                                user_name = {item.firstname + " " +item.lastname}
                                email = {item.email}
                                post_time = {item.post_time}
                                category = {item.category}
                                view = {item.view}
                                status = {item.status}
                                />
                            )
                        })
                        }
                        </ul>
                </div>
                <div className={styles.admincontainer}>
                        <h3>Market Posts</h3>
                        <ul className={styles.responsive_table}>
                            <li className={styles.table_header}>
                                <div className={styles.col_1}>Post ID</div>
                                <div className={styles.col_2}>Title</div>
                                <div className={styles.col_3}>Writer</div>
                                <div className={styles.col_4}>Email</div>
                                <div className={styles.col_5}>Post Time</div>
                                <div className={styles.col_7}>View</div>
                                <div className={styles.col_8}>Control</div>
                            </li>
                        {
                        data3.map((item, idx) => {
                            return (
                                <PostTable
                                key={idx}
                                data={item.no_data}
                                postset = "ee"
                                post_id = {item.post_id}
                                title = {item.title}
                                user_id = {item.user_id}
                                user_name = {item.firstname + " " +item.lastname}
                                email = {item.email}
                                post_time = {item.post_time}
                                category = {item.category}
                                view = {item.view}
                                status = {item.status}
                                />
                            )
                        })
                        }
                        </ul>
                </div>
                <div className={styles.admincontainer}>
                        <h3>Job Posts</h3>
                        <ul className={styles.responsive_table}>
                            <li className={styles.table_header}>
                                <div className={styles.col_1}>Post ID</div>
                                <div className={styles.col_2}>Title</div>
                                <div className={styles.col_3}>Writer</div>
                                <div className={styles.col_4}>Email</div>
                                <div className={styles.col_5}>Post Time</div>
                                <div className={styles.col_7}>View</div>
                                <div className={styles.col_8}>Control</div>
                            </li>
                        {
                        data4.map((item, idx) => {
                            return (
                                <PostTable
                                key={idx}
                                data={item.no_data}
                                post_id = {item.post_id}
                                title = {item.title}
                                user_id = {item.user_id}
                                user_name = {item.firstname + " " +item.lastname}
                                email = {item.email}
                                post_time = {item.post_time}
                                category = {item.category}
                                view = {item.view}
                                status = {item.status}
                                />
                            )
                        })
                        }
                        </ul>
                </div>
            </div>
        </>
    )
}