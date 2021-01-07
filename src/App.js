import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Chathome from './Chathome';
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="App">
      <div className="body2"></div>
      {!user ? (
        <Login/>
      ):(
       <div className="body">
          <Router>
            <Switch>              
              <Route path="/rooms/:roomId">
              <Sidebar/>
              <Chat />
              </Route>
              <Route path="/">
              <Sidebar/>
              <Chathome/>
              </Route>
           </Switch>
         </Router>
      </div>
      )}
    </div>
  );
}

export default App;