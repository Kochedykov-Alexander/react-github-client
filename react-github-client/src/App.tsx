import React, { createContext, Dispatch, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import FullProfile from './components/Profile/FullProfile';
import ListRepositories from "./components/Repositories/ListRepositories";
import FullRepository from './components/Repositories/FullRepository';
import { initialState, reducer } from "./store/reducer";
import ProfilePage from './components/Profile/ProfilePage';

interface IContextProps {
  state: any; 
  dispatch: Dispatch<{ type: any; payload: { isLoggedIn: any; user: any; }; }>;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(reducer,initialState);
  return (
    <AuthContext.Provider
    value={value}> 
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/profile/:login" component={FullProfile}/>
        <Route exact path="/repositories/:login" component={ListRepositories} />
        <Route exact path="/repository/:owner/:name" component={FullRepository} />
        <Route exact path="/profile/:login/full" component={ProfilePage}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export const AuthContext = React.createContext({} as IContextProps);

