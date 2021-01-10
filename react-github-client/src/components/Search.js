import React, { useContext, useEffect, useState } from "react";
import { Redirect , Link} from "react-router-dom";
import Styled from "styled-components";
import { AuthContext } from "../App";
import axios from 'axios';

export default function Search() {
  const { state } = useContext(AuthContext);
  const api = axios.create({
    baseURL: 'https://api.github.com',
  });

//   const [searchUser, setSearchUser] = useState();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     api.get(`users/${searchUser}`).then(response => {
//       setUsers(response.data);
//     });
//   });
    const [newUser, setNewUser] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => {
    const storageUsers = localStorage.getItem('@GithubFinder:users');
    if (storageUsers) {
        setUsers(JSON.parse(storageUsers));
    } else {
        setUsers([]);
    }
    }, []);

    useEffect(() => {
    localStorage.setItem('@GithubFinder:users', JSON.stringify(users));
    }, [users]);

    async function handleAddUsers(e) {
    e.preventDefault();


    const response = await api.get(`users/${newUser}`);

    const user = response.data;

    setUsers([user]);
    setNewUser('');
        
    }


  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
    <Wrapper>
        <form onSubmit={handleAddUsers}>
            <input
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
            placeholder="Enter a Github User "
            />
            <button type="submit">Search</button>
        </form>
        <div>
            {users.map(user => (
            <Link key={user.name} to={`/users/${user.login}`}>
                <img src={user.avatar_url} alt={user.login} />
                <div>
                <strong>{user.name}</strong>
                <p id="userbio">{user.bio}</p>
                <h5>@{user.login}</h5>
                </div>
            </Link>
            ))}
        </div>
    </Wrapper>
    
    </div>
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