import styles from "../css/AdminTable.module.css";

export default function UserTable(table){   
    
    function AdminUserTB2(props){
        let key = props.userId; 
        return(
            <>
                {props.status === "active" ?  
                <li className={styles.table_row} 
                onClick={()=>table.filter(key)}> 
                    <div className={styles.col_1} >{props.type}</div>
                    <div className={styles.col_2}>{props.email}</div>
                    <div className={styles.col_3}>{props.firstName} {props.lastName}</div>
                    <div className={styles.col_5}>{props.dob.substr(0,10)}</div>
                    <div className={styles.col_6}>{props.gender}</div>
                    <div className={styles.col_7}>{props.status}</div>
                    <div className={styles.col_7}>{props.join}</div>

                    <div className={styles.col_8}>
                        {props.status === "active" ?  <button className={styles.red} onClick={()=>{table.modal(props,"block")}} >Block</button> : <button className={styles.gray} onClick={()=>{table.modal(props,"active")}} >Activate</button>}
                        {props.status === "active" ?  null : <button className={styles.red} onClick={()=>{table.modal(props,"delete")}}>Delete</button>}
                    </div>
                </li>      
                : 
                <li className={styles.table_row_block} 
                onClick={()=>table.filter(key)}> 
                    <div className={styles.col_1} >{props.type}</div>
                    <div className={styles.col_2}>{props.email}</div>
                    <div className={styles.col_3}>{props.firstName} {props.lastName}</div>
                    <div className={styles.col_5}>{props.dob.substr(0,10)}</div>
                    <div className={styles.col_6}>{props.gender}</div>
                    <div className={styles.col_7}>{props.status}</div>
                    <div className={styles.col_7}>{props.join}</div>

                    <div className={styles.col_8}>
                        {props.status === "active" ?  <button className={styles.red} onClick={()=>{table.modal(props,"block")}} >Block</button> : <button className={styles.gray} onClick={()=>{table.modal(props,"active")}} >Activate</button>}
                        {props.status === "active" ?  null : <button className={styles.red} onClick={()=>{table.modal(props,"delete")}}>Delete</button>}
                    </div>
                </li>   
                }   
            </>
        )
    }

    return(
        <>
            <li className={styles.table_header}>
                {/* <th className='pak'>User ID</th> */}
                <div className={styles.col_1}>type</div>
                <div className={styles.col_2}>email</div>
                <div className={styles.col_3}>Name</div>
                <div className={styles.col_5}>Date of Birth</div>
                <div className={styles.col_6}>Gender</div>
                <div className={styles.col_7}>Status</div>
                <div className={styles.col_7}>Joined</div>
                <div className={styles.col_8}>update</div>
            </li>
            {
                table.data.map((item, idx) => {
                    return (
                        <AdminUserTB2
                        key={item.user_id}
                        type = {item.role}
                        userId = {item.user_id}
                        email = {item.email}
                        firstName = {item.firstname}
                        lastName = {item.lastname}
                        dob = {item.dob}
                        gender = {item.gender}
                        status = {item.status}
                        join = {item.join_date}
                        />
                    )
                })
            }
        </>
    )
}