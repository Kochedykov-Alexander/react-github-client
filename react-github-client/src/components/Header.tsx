import React, { useState, useEffect, useContext } from "react";
import './css/header.css';
import { AuthContext } from "../App";
import GitHubLogo from "./img/icons/github_PNG65.png";


function Header(props: { match: { params: { login: string;}; }; }) {
const { state, dispatch } = useContext(AuthContext);
const [data, setData] = useState({avatar_url:'', name:'', public_repos:0, followers:0, following:0,login:''});


const url = "https://api.github.com/users/" + props.match.params.login;

useEffect(() => {
  fetch(url)
    .then((response) => response.json())
    .then(
      (d) => {
        setData(d)
  })
}, [data]);


const {avatar_url} = state.user;



    return (
      <div className="header">
      <div className="logo">
        <a href="#"><img className = "graphic_logo" src={GitHubLogo} alt=""></img></a>
      
            <div className="search">
               <form>
                <input type="text" placeholder="Искать здесь..."></input>
                <button type="submit"></button>
                </form>
            </div>
          <div className="avatart__logo">	
          <a href="#"><img className = "avatar_github_logo" src={avatar_url} alt=""></img></a>
        </div>
      </div>
      </div>
  );
  }

export default Header;