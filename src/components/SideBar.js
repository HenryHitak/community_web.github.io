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
  const hoverIcon = (e) => {
    if(!isOpened && $($(e.target).parent().children()[1]).html() != undefined) {
      console.log(e.target.getBoundingClientRect().top);
      const contents = `<ul>${$($(e.target).parent().children()[1]).html()}</ul>`;
      $("#hover-menu").html(contents);
      $("#hover-menu").show();
      $("#hover-menu").css("top", `${e.target.getBoundingClientRect().top-10}px`)
      $($("#hover-menu").children()[0]).addClass("hover-list");
      console.log($($("#hover-menu").children()[0]));
    }
  }
  const loginSideBar = ()=>{
    setIsOpened(false);
    openLogin(true);
  }
  const logout = ()=>{
    logoutFlag();
  }
  return <section id="sidebar" className={isOpened ? "isOpened" : "isClosed"}>
    <button onClick={()=>setIsOpened(!isOpened)}>{isOpened ? <HiArrowNarrowLeft/> : <HiMenu onMouseEnter={(e)=>hoverIcon(e)}/>}</button>
    <div></div>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiUserCircle/>Login</div> : <HiUserCircle onMouseEnter={(e)=>hoverIcon(e)}/>}
      <ul>
        {loginFlag ? <li><Link to="/myprofile">My Profile</Link></li> : null}
        {!loginFlag ? <li><a onClick={()=>loginSideBar()}>Login</a></li> : <li><a onClick={()=>logout()}>Logout</a></li>}
      </ul>
    </article>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiShoppingCart/>Market Place</div> : <HiShoppingCart onMouseEnter={(e)=>hoverIcon(e)}/>}
      <ul>
        <li><Link to="/login">Go to Buy</Link></li>
        <li><Link to="/login">Go to Sell</Link></li>
      </ul>
    </article>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiOfficeBuilding/>Find a job</div> : <HiOfficeBuilding onMouseEnter={(e)=>hoverIcon(e)}/>}
      <ul>
        <li><Link to="/login">Find a job</Link></li>
        <li><Link to="/login">Post a job</Link></li>
      </ul>
    </article>
    <article>
      {isOpened ? <div onClick={(e)=>openList(e)}><HiUserGroup/>Community</div> : <HiUserGroup onMouseEnter={(e)=>hoverIcon(e)}/>}
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
        <li><Link to="/admindash">Dashboard</Link></li>
        <li><Link to="/admin">Management</Link></li>
      </ul>
    </article>
    : null
    }
    {isOpened && <Footer/>}
    <aside id="hover-menu" onMouseLeave={(e)=>{
      $(e.target).hide();
    }}></aside>
  </section>
}
export default SideBar;