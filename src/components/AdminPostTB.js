import styles from "../css/AdminTable.module.css";
import {useState} from "react";
import ReactPaginate from 'react-paginate';

export default function PostTable(post){   
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)


    function PostLi(props){
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

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        post.offset = selectedPage + 1;
    };

    return(
        <>
            <li className={styles.table_header}>
                <div className={styles.col_1}>Post ID</div>
                <div className={styles.col_2}>Title</div>
                <div className={styles.col_3}>Writer</div>
                <div className={styles.col_4}>Email</div>
                <div className={styles.col_5}>Post Time</div>
                {post.postset === "commu" ?  <div className={styles.col_6}>category</div>: ""}
                <div className={styles.col_7}>View</div>
                <div className={styles.col_8}>Control</div>
            </li>
            {
                post.data.map((item, idx) => {
                    return (
                        <PostLi
                        key={idx}
                        data={item.no_data}
                        postset={post.postset}
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
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={post.pagecount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </>
    )
}