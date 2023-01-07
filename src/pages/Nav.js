import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import styles from '../css/Nav.module.css';
import LoginModal from '../components/LoginModal';
import RegModal from '../components/RegModal';

export default function Nav(){
    const [user,setUser] = useState([]);
    const [openLoginModal,setOpenLoginModal] = useState(false);
    const [openRegModal,setOpenRegModal] = useState(false);
    const [chkLoginFlag,setChkLoginFlag] = useState(false);
    const [chkAdminFlag,setChkAdminFlag] = useState(false);
    const navigate = useNavigate();
    let chkStorageId = sessionStorage.getItem("sid");
    let chkStorageRole = sessionStorage.getItem("srole");
    function logout(){
        setChkLoginFlag(false);
        setChkAdminFlag(false);
        sessionStorage.removeItem('sid');
        sessionStorage.removeItem('srole');
        navigate('/');
    };
    useEffect(()=>{
        if(chkStorageId != null){
            setChkLoginFlag(true);
            if(chkStorageRole == 'admin'){
                setChkAdminFlag(true);
            }
        }
    },[]);
    return(
        <div>
            {openLoginModal ? <LoginModal closeModal={setOpenLoginModal} openReg={setOpenRegModal} loginFlag={setChkLoginFlag} adminFlag={setChkAdminFlag} loginFun={setUser}/> : null}
            {openRegModal ? <RegModal closeModal={setOpenRegModal}/> : null}
            <div className={styles.screen}>
                <SideBar openLogin={setOpenLoginModal} loginFlag={chkLoginFlag} adminFlag={chkAdminFlag} logoutFlag={logout}/>
                <section>
                    <header>
                        <div>
                            {!chkLoginFlag ? <input type="button" onClick={()=>{setOpenLoginModal(true)}} value="Login"/> : <input type="button" onClick={()=>logout()} value="Logout"/>}
                            {!chkLoginFlag ? <input type="button" onClick={()=>{setOpenRegModal(true)}} value="Sign Up"/> : null}
                        </div>
                        <h1><Link to="/">Tian Tian</Link></h1>
                        <nav>
                            <ul>
                                <li><Link to="marketplace">Marketplace</Link></li>
                                <li><Link to="community">Community</Link></li>
                                <li><Link to="contact">Contact Us</Link></li>
                                {chkLoginFlag ? <li><Link to="myprofile">My page</Link></li> : null}
                                {chkAdminFlag ? <li><Link to="admin">Admin</Link></li> : null}
                            </ul>
                        </nav>
                    </header>
                    <Outlet/>
                </section>
            </div>
        </div>
    )
}