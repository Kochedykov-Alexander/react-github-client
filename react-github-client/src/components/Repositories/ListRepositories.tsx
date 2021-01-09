import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../../App";
import { Redirect, NavLink, Link} from "react-router-dom";
import { statement } from "@babel/template";
import Header from "../Header";
import Footer from "../Footer";
import axios from 'axios';

export default function ListRepositories(props: { match: { params: { login: string; }; }; }) {

  
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState([{id:0,repos_url:'', login:'',html_url:'',name:'',description:'',language:'',owner:{login:''}}]);

    const api = axios.create({
      baseURL: 'https://api.github.com',
    });

   if (!state.isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const { repos_url, login } = state.user

    console.log(state)
    
    useEffect(() => {
      api.get(`users/` + props.match.params.login + `/repos`).then(response => {
        setData(response.data);
      });
    }, [state.user]);

    return (
      <ReposList>
        <Header {...props}></Header>
        
        {data.map(repository => (
        <Link className="link" key={repository.id} to={`/repository/${repository.owner.login}/${repository.name}`}>
              
                  <div>                 
                    <strong>{repository.name}</strong>
                    <p>{repository.description}</p>
                    <div className="repoInfo">
                    <p className="p2">
                      language:  {repository.language}
                    </p>
                    </div>
                    
                  </div>
                  
        </Link>  
        ))}
        <Footer></Footer>
        </ReposList>
    );
  }
  
  const ReposList = Styled.div`
  margin-top: 5px;
  margin-bottom: 5%;
  .link {
    text-decoration: none;
    background: LightSkyBlue;
    border-radius: 10px;
    width: 40%;
    padding: 20px;
    display: flex;
    justify-content: center;
    margin-left: 30%;
    align-items: center;
    transition: transform 0.4s;
    & + .link {
      margin-top: 16px;
    }
    &:hover {
      transform: translateX(-10px);
      box-shadow: 2px 2px white, 8px 8px Navy;
    }
    div {      
      
      font-size: 25px;
      color: MidnightBlue;
      p {
        font-size: 20px;
        color: DarkSlateBlue;
        margin-top: 5px;
      }
    }
    
  }
`;