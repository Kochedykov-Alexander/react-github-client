import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ListRepositories from "./components/Repositories/ListRepositories";
import { initialState, reducer } from "./store/reducer";


export const AuthContext = React.createContext(initialState);
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(reducer,initialState);
  return (
    <AuthContext.Provider
      value={
        {
        state,
        dispatch
      }
    }
    >
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/repositories" component={ListRepositories} />
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;