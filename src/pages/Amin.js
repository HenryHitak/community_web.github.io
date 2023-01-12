import styles from "../css/AdminTable.module.css";
import "../css/pagination.css"
import AdminUserTB from "../components/AdminUserTB"
import PostTable from "../components/AdminPostTB"
import dbService from "../services/dbService";
import {useState,useEffect} from "react";
import AdminModal from "../components/AdminModalbox";
import ReactPaginate from 'react-paginate';

export default function AdminTable(){
    const[userdata,setRes] = useState([]);
    const[CommunityData,setRes2] = useState([]);
    const[data3,setRes3] = useState([]);
    const[data4,setRes4] = useState([]);
    const [openLoginModal,setOpenLoginModal] = useState(false);
    const [userkey,selectedUser] = useState([])
    const [modalaction,setaction] = useState([])

    /////////////////////////////////////search function 
    const [search, setSearch] = useState("")

    const onChangeSearch = (e) => {
        e.preventDefault();
        
        dbService.getData()
        .then(res=>{
            setRes(res.data);
            const slice = res.data.slice(offset, offset + perPage)
            const postData = slice.map(pd => pd)
            setData(postData)
            setPageCount(Math.ceil(res.data.length / perPage))
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
                const slice = res.data.slice(offset, offset + perPage)
                const postData = slice.map(pd => pd)
                setData(postData)
                setPageCount(Math.ceil(res.data.length / perPage))
            })
            .catch(err=>{console.log(err)});
        } else {
            const filterData = userdata.filter((row) => row.email.includes(search))
            setData(filterData)
        }
    }
    ///////////////////////////////////////


    // get only selected user's posts
    const filter = (test)=>{
        dbService.change(test,"community_tb")
        .then(res=>{
            setRes2(res.data);
        })
        dbService.change(test,"market_td")
        .then(res=>{
            setRes3(res.data);
        })
        dbService.change(test,"job_tb")
        .then(res=>{
            setRes4(res.data);
        })
    }


    ///////////////////////////////////
    const modalfun = (key,action)=>{
        setOpenLoginModal(true)
        selectedUser(key)
        setaction(action)
    }
    //////////////////////////////////
    

    // db get 
    // pagination
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, viewnumber] = useState(5);
    const [pageCount, setPageCount] = useState(0)

    const view = (e) => {
        viewnumber(e.target.value)
        dbService.getData()
        .then(res=>{
            setRes(res.data);
            const slice = res.data.slice(offset, offset + perPage)
            const postData = slice.map(pd => pd)
            setData(postData)
            setPageCount(Math.ceil(res.data.length / perPage))
        })
        .catch(err=>{console.log(err)});
    }


    const AdminDash = ()=>{
        dbService.getData()
        .then(res=>{
            setRes(res.data);
            const slice = res.data.slice(offset, offset + perPage)
            const postData = slice.map(pd => pd)
            setData(postData)
            setPageCount(Math.ceil(res.data.length / perPage))
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


    useEffect(()=>{AdminDash()},[offset]);
        
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return(
        <>
            {openLoginModal ? <AdminModal closeModal={setOpenLoginModal} test={userkey} action={modalaction} modaltest={false} new={setData} view={perPage} offset={offset} /> : null}
            <h2>Admin Controll Page</h2>
            <div className={styles.admincontainer}>
                    <h3>All Users Information</h3>
                    <section className={styles.search}>
                        <select name="view" onChange={(e)=>view(e)}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>
                        <form onSubmit={(e)=>onSearch(e)}>
                            <input type="text" value={search} placeholder="Search Email" onChange={onChangeSearch}></input>
                            <button type="submint">Search</button>
                        </form>
                    </section>
                    <ul className={styles.responsive_table} >
                        <AdminUserTB data={data} modal={modalfun} filter={filter}/>
                    </ul>
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
            </div>

            <div className={styles.postcontainer}>
                <div className={styles.post}>
                    <button className={styles.all} onClick={()=>AdminDash()}>See all Posts</button>
                </div>
                <div className={styles.admincontainer}>
                        <h3>Community Posts</h3>
                        <ul className={styles.responsive_table}>
                            <PostTable data={CommunityData} postset="commu"/>
                        </ul>
                </div>
                <div className={styles.admincontainer}>
                        <h3>Market Posts</h3>
                        <ul className={styles.responsive_table}>
                            <PostTable data={data3} postset="ee"/>
                        </ul>
                </div>
                <div className={styles.admincontainer}>
                        <h3>Job Posts</h3>
                        <ul className={styles.responsive_table}>
                            <PostTable data={data4} postset="ee"/>
                        </ul>
                </div>
            </div>
        </>
    )
}