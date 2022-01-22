import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav,Container, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
function odjava(){
  window.localStorage.clear('logirani');
  window.localStorage.clear('uloga');
}
export default function NavBar(){
    const loggedUser = window.localStorage.getItem('logirani');
    const uloga = window.localStorage.getItem('uloga');
    
    if(uloga=="admin"){
      return(
        <>
        <ul className="menu-bar">
          <li>
            <Link to="/">
            Home
            </Link></li>
          <li>
            <Link to="/adminpanel">
              Panel
            </Link>
          </li>
          <li>
            <Link to="/" onClick={odjava}>
              Admin odjava
            </Link>
          </li>
        </ul>
        {/* <div className="topnav">
          <Link to="/">
            Home
          </Link>
          <Link to="/adminpanel">
            Panel
          </Link>
          <Link to="/" onClick={odjava}>
            Admin odjava
          </Link>
        </div> */}
        <div className="footer">
          AJ Kriptovalute®
        </div>
      
      </>
      )
    }
    else if(uloga=="user"){
      const user = JSON.parse(loggedUser).username;

      return(
        <>
        <ul className="menu-bar">
          <li>
            <Link to="/">
              Welcome - {user}
            </Link></li>
          <li>
            <Link to="/portfolio">
              Portfolio 
            </Link>
          </li>
          <li>
            <Link to="/buycrypto">
              Buy
            </Link>
          </li>
          <li>
            <Link to='/sellcrypto'>
              Sell
            </Link>
          </li>
          <li>
            <Link to="/" onClick={odjava}>
            Odjava
            </Link>
          </li>
        </ul>
        {/* <div className="topnav">
          <Link to="/">
            Welcome - {user}
          </Link>
          <Link to="/" onClick={odjava}>
            Odjava
          </Link>
        
          <Link to="/portfolio">
            Portfolio 
          </Link>
          <Link to="/buycrypto">
            Buy
          </Link>
          <Link to='/sellcrypto'>
            Sell
          </Link>
        </div> */}
        <div className="footer">
          AJ Kriptovalute®
        </div>
      
      </>
      )
    }
    else{
      return(
        <>
        <ul className="menu-bar">
          <li>
            <Link to="/">
            Home
            </Link></li>
          <li>
            <Link to="/adminlogin">
              Admin login
            </Link>
          </li>
          <li>
            <Link to="/user/login">
              User login
            </Link>
          </li>
          <li>
            <Link to="/user/registration">
              User registration
            </Link>
          </li>
        </ul>
        {/* <div className="topnav">
          <Link to="/">
            Home
          </Link>
          <Link to="/adminlogin">
            Admin login
          </Link>
          <Link to="/user/login">
            User login
          </Link>
          <Link to="/user/registration">
            User registration
          </Link>
      </div> */}
      <div className="footer">
        AJ Kriptovalute®
      </div>
      
      </>
      )
    }

    
}