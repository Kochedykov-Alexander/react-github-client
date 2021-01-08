import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import { AuthContext } from "../App";


export default function Home(props) {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  console.log(props.match.params.name);

  const { avatar_url, name, public_repos, followers, following, bio } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  return (
    <Wrapper>
      <div className="container">
       
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar"/>
            <span>{name}</span>
            <span>{public_repos} Repos</span>
            <span>{followers} Followers</span>
            <span>{following} Following</span>
            
          </div>
        </div>

        <div class="footer">
		<div class="footer__name">2021 © Все права защищены</div>
		<div class="footer__name">React course ITIS</div>
		<div class="footer__name"><button class="btn-logout">Logout</button></div>
	</div>

	</div>

     

      
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;
 
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

.footer {
  position: fixed; /* Фиксированное положение */
  left: 0; bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 50px;
  margin-top: 50px;
  background-color: #000;
  color: #fff;
  opacity: 0.6;
  
}



.btn-logout {
  all: unset;
    width: 100px;
    height: 35px;
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
`;