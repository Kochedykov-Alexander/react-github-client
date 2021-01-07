import React, { createContext, Dispatch, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { initialState, reducer } from "./store/reducer";


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
        <Route path="/login" component={Login}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export const AuthContext = React.createContext({} as IContextProps);

