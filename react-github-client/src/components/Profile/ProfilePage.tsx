import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../../App";
import { Redirect, NavLink } from "react-router-dom";
import File from "../img/icons/file.png";
import Folder from "../img/icons/folders.png";
import { from } from "form-data";

export default function ProfilePage(props: { match: { params: { login: string; }; }; }) {

const { state, dispatch } = useContext(AuthContext);
const [data, setData] = useState({login:'', followers:0, following:0, public_repos:0, name:'', bio:'', email:'', avatar_url:''});

if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
}

const url = "https://api.github.com/users/" + props.match.params.login;

useEffect(() => {
  fetch(url)
    .then((response) => response.json())
    .then(
      (d) => {
        setData(d)
  })
}, [data]);


const handleLogout = () => {
  dispatch({
    type: "LOGOUT",
    payload:{
      isLoggedIn: false,
      user: state.user
    }
  });
} 

const {login, followers, following, public_repos, name, bio, email, avatar_url} = data;

return(
    <Wrapper>

        <div className = "button__item">
        <button onClick={()=> handleLogout()}>Logout</button>
        </div>	        
        <div className="content">

<div className="profile">
        <div className="container">
            <div className="profile__body">
                <div className="profile__row">
                    <div className="profile__column">
                        <div className="profile__item left">
                            <div className="profile__item__login">
                                <span>Имя пользователя: <span>{name}</span></span>
                            </div>

                            <div className="profile__item__name">
                                <span>Настоящее имя: <span>{login}</span></span>
                            </div>

                            <div className="profile__item__email">
                                <span>Email: <span>{email}</span></span>
                            </div>


                            <div className="profile__item__followers">
                                <span>Followers: <span>{followers}</span></span>
                            </div>

                            <div className="profile__item__following">
                                <span>Following: <span>{following}</span></span>
                            </div>




                        </div>
                    </div>

                    <div className="profile__column">
                        <div className="profile__item">
                        <div className="image__item">
                            <img src={avatar_url} className="img__avatar" alt="" />


                        </div>

                        <div className="profile__item__description">
                                {bio}
                        </div>

                        <div className="profile__item__repo">
										<span>
										<img src={File}  alt="" />
										<img src={Folder} className="img__repo" alt="" />
										</span>
						</div>

                    </div>
                </div>

                </div>
            </div>
        </div>
    </div>

</div>

    </Wrapper>
);
}

const Wrapper = Styled.section`
* {
    padding: 0;
    margin: 0;
    border: 0; }
  
  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; }
  
  :focus, :active {
    outline: none; }
  
  a:focus, a:active {
    outline: none; }
  
  nav, footer, header, aside {
    display: block; }
  
  html, body {
    height: 100%;
    width: 100%;
    font-size: 100%;
    line-height: 1;
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; }
  
  input, button, textarea {
    font-family: inherit; }
  
  input::-ms-clear {
    display: none; }
  
  button {
    cursor: pointer; }
  
  button::-moz-focus-inner {
    padding: 0;
    border: 0; }
  
  a, a:visited {
    text-decoration: none; }
  
  a:hover {
    text-decoration: none; }
  
  ul li {
    list-style: none; }
  
  img {
    vertical-align: top; }
  
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit; }
  
  
  body {
    background-color: #fff;
    color: #000;
    font-family: Arial;
     
  }
  
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;
  }
  .content {
    flex: 0 1 auto;
    padding-top: 100px;
    width: auto;
  }
  
  
  .container {
  
    width: 1520px;
    margin: 0 auto;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  }
  
  .button__item {
      padding-left: 1580px;
  }
  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    font-family: Arial;
    border: 1px solid #0041C2;
    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }
  
  .profile {
    padding: 0px 0 0 0;
  
  }
  .profile__body {
    margin: 0 auto;
  }
  .profile__row {
    display: flex;
    margin: 0 -50px;
  }
  .profile__column {
    display: flex;
    flex: 0 1 50%;
    padding: 0 50px;
    justify-content: center;
  
  }
  .profile__item {
     display: flex;
     flex-direction: column;
     font-size: 20px;
    line-height: 65px;
    
    
    letter-spacing: 0.025em;
    margin: 46px 0 0 0;
  }
  
  
  .profile__item__button {
    margin: 46px 0 0 0;
  }
  
  .img__avatar {
    border-radius: 50%;
    height: 350px;
    width: 350px;
    border: 3px solid #00a8e1;
  }
  
  .profile__item__description {
    padding-top: 20px;
  }
  
  .left {
    padding: 40px 0 0 0;
  }
  .profile__item__repo {
    padding-top: 30px;
  }
  
  .img__repo {
    padding-left: 50px;
  }
  
  
`; 