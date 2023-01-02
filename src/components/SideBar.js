import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft, HiMenu, HiUserCircle, HiShoppingCart, HiUserGroup, HiOfficeBuilding, HiDatabase } from "react-icons/hi";
import styles from "../css/SideBar.module.css";
import "../css/active.css";
import Footer from "./Footer";
import $ from "jquery";

const SideBar = ({openLogin,loginFlag,adminFlag,logoutFlag}) => {
  const [isOpened, setIsOpened] = useState(false);
  const openList = (e) => {
    $($(e.target).siblings()[0]).toggleClass("isActive");
  }
  const loginSideBar = ()=>{
    setIsOpened(false);
    openLogin(true);
  }
  const logout = ()=>{
    logoutFlag();
  }
  return <section id="sidebar" className={isOpened ? "isOpened" : "isClosed"}>
    <button onClick={()=>setIsOpened(!isOpened)}>{isOpened ? <HiArrowNarrowLeft/> : <HiMenu/>}</button>
    <div></div>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiUserCircle/>Login</div> : <HiUserCircle/>}
      <ul>
        {loginFlag ? <li><Link to="/myprofile">My Profile</Link></li> : null}
        {!loginFlag ? <li><a onClick={()=>loginSideBar()}>Login</a></li> : <li><a onClick={()=>logout()}>Logout</a></li>}
      </ul>
    </article>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiShoppingCart/>Market Place</div> : <HiShoppingCart/>}
      <ul>
        <li><Link to="/login">Go to Buy</Link></li>
        <li><Link to="/login">Go to Sell</Link></li>
      </ul>
    </article>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiOfficeBuilding/>Find a job</div> : <HiOfficeBuilding/>}
      <ul>
        <li><Link to="/login">Find a job</Link></li>
        <li><Link to="/login">Post a job</Link></li>
      </ul>
    </article>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiUserGroup/>Community</div> : <HiUserGroup/>}
      <ul>
        <li><Link to="/login">Free Board</Link></li>
        <li><Link to="/login">Life</Link></li>
        <li><Link to="/login">Weather</Link></li>
        <li><Link to="/login">Trip</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </article>
    {adminFlag ?
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiDatabase/>Admin</div> : <HiDatabase/>}
      <ul>
        <li><Link to="/admin">User Management</Link></li>
      </ul>
    </article>
    : null
    }
    {isOpened && <Footer/>}
  </section>
}
export default SideBar;