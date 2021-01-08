import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../../App";
import { Redirect, NavLink} from "react-router-dom";
import { statement } from "@babel/template";
import Header from "../Header";
import Footer from "../Footer";

export default function ListRepositories(props: { match: { params: { login: string; }; }; }) {

  
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState([{repos_url:'', login:'',html_url:'',name:''}]);

   if (!state.isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const { repos_url, login } = state.user

    console.log(state)
    
    
    useEffect(() => {
      fetch("https://api.github.com/users/Kochedykov-Alexander/repos")
        .then((response) => response.json())
        .then(
          (d) => {
            setData(d)
          })
    }, []);
    console.log(data);

    return (
      
      <Wrapper>
        <Header {...props}></Header>
        <div className="container">
          <div>
            <div className="content">
              <div className="list">
              
                <ul>
                  {data.map(data => (

                  <li><a href={data.html_url}>{data.name}</a></li>
                  ))}
                </ul>
                <NavLink to={`/profile/${login}`}>{login}</NavLink>
              
              </div>
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