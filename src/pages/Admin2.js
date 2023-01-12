import styles from "../css/AdminSum.module.css";
import dbService from "../services/dbService";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

export default function AdminTable(){
    const[data,setRes] = useState([]);
    const[data2,setRes2] = useState([]);
    const[data3,setRes3] = useState([]);
    const[data4,setRes4] = useState([]);
    
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

    console.log(data)
    useEffect(()=>{AdminDash()},[]);
        
    return(
        <>
            <h1 className={styles.h1}>Hello! Admin person You Have</h1>
            <section className={styles.user}>
                <div>
                    <h2>Enrolled Users</h2>
                    <p>{data.length}</p>
                </div>
            </section>
            <section className={styles.post}>
                <div>
                    <h2>Community</h2>
                    <p>{data2.length}</p>
                </div>
                <div>
                    <h2>Market</h2>
                    <p>{data3.length}</p>
                </div>
                <div>
                    <h2>Jobs</h2>
                    <p>{data4.length}</p>
                </div>
            </section>
        </>
    )
}