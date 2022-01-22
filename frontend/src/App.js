import {Nav, Navbar, Table, Form, Button,Alert} from 'react-bootstrap'
import Pocetna from './pages/Pocetna';
import AllPortfolio from './pages/AllPortfolio';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Favoriti from './pages/Favoriti';

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'
import BuyCrypto from './pages/BuyCrypto';
import SellCrypto from './pages/SellCrypto';



function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Pocetna} />
        <Route path="/adminlogin" exact component={AdminLogin} />
        <Route path="/user/login" exact component={UserLogin}/>
        <Route path="/user/registration" exact component={UserRegister}/>
        <Route path="/portfolio" exact component={AllPortfolio}/>
        <Route path="/adminpanel" exact component={AdminPanel}/>
        <Route path="/buycrypto" exact component={BuyCrypto}/>
        <Route path="/sellcrypto" exact component={SellCrypto}/>

      </Switch>
    </Router>
  );
}

export default App;
