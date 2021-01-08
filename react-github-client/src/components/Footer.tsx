import React, { useState, useEffect, useContext } from "react";
import './css/header.css';
import { AuthContext } from "../App";

function Footer() {

    const { state, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({
          type: "LOGOUT",
          payload:{
            isLoggedIn: false,
            user: state.user
          }
        });
      } 
      

    return(
        <div className="footer">
		<div className="footer__name">2021 © Все права защищены</div>
		<div className="footer__name">React course ITIS</div>
		<div className="footer__name"><button className="btn-logout" onClick={()=> handleLogout()}>Logout</button></div>
	</div>);
}

export default Footer;