import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../../App";
import { Redirect, NavLink } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { from } from "form-data";

export default function FullProfile(props: { match: { params: { login: string;}; }; }) {
    
const { state, dispatch } = useContext(AuthContext);
const [follower, setFollowers] = useState([{login:''}]);
const [following1, setFollowing] = useState([{login:''}]);
const [data, setData] = useState({avatar_url:'', name:'', public_repos:0, followers:0, following:0,login:''});



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

  

useEffect(() => {
  
  fetch("https://api.github.com/users/" + props.match.params.login + "/followers")
    .then((response) => response.json())
    .then(
      (d) => {
        setFollowers(d)
      })
    }, [follower]);


useEffect(() => {
  fetch("https://api.github.com/users/" + props.match.params.login + "/following")
    .then((response) => response.json())
    .then(
      (d) => {
        setFollowing(d)
      })
    }, [following1]);


console.log(data)   

const {avatar_url, name, public_repos, followers, following, login} = data;

const handleLogout = () => {
  dispatch({
    type: "LOGOUT",
    payload:{
      isLoggedIn: false,
      user: state.user
    }
  });
} 

return (
  <Wrapper>
    <Header {...props}></Header>
  <div className="container">
    <div>
      <div className="content">
        <img src={avatar_url} alt="Avatar"/>
        <span>{name}</span>
        <span>{public_repos} Repos</span>
        <span>{followers} Followers:</span>
        <ul>
          {follower.map(follower => (
                  <li><NavLink to={`/profile/${follower.login}` }>{follower.login}</NavLink></li>
                  ))}
                </ul>
        <span>{following} Following: </span>
        <ul>                  
          {following1.map(following1 => (
                  <li><NavLink to={`/profile/${following1.login}`} >{following1.login}`</NavLink></li>
                  ))}
        </ul>
        <NavLink to={`/profile/${props.match.params.login}/full`}>More information</NavLink>
      </div>
    </div>
  </div>
  <Footer></Footer>
</Wrapper>
  );
}

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;
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
    border: 1px solid #0041C2;
    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }
  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      width: auto;
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
  
    }
  }
}
`;