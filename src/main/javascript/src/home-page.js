import ReactDOM from "react-dom";
import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import createUser from "./createUser";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

const ulStyle = {
  listStyleType: 'none',
  margin: '0',
  padding: '0',
  width: '200px',
  backgroundColor: '#f1f1f1'
}

const navlinkStyle = {
  display: 'block',
  color: '#000',
  padding: '8px 16px',
  textDecoration: 'none'
}

const MySideNav = () => (
  <div style={{background: '#2c3e50', color: '#FFF', width: 220}}> 
      <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>       
          <Nav id='dashboard'>
              <NavText> Dashboard </NavText>
          </Nav>
          <Nav id='sales'>
              <NavText> Sales </NavText>
          </Nav>
      </SideNav>
  </div>
)

class ExpenseSheet extends React.Component {
    render() {
        return (
          //   <HashRouter>
          //   <div>
          //     <ul style={ulStyle}>
          //       <li><NavLink style={navlinkStyle} to="/create_user">Create User</NavLink></li>
          //       <li><NavLink style={navlinkStyle} to="/update_user">Update User</NavLink></li>
          //       <li><NavLink style={navlinkStyle} to="/delete_user">Delete User</NavLink></li>
          //     </ul>
          //     <div>
          //       <Route path="/create_user" component={createUser}/>
          //       <Route path="/update_user" component={updateUser}/>
          //       <Route path="/delete_user" component={deleteUser}/>
          //     </div>
          //   </div>
          // </HashRouter> 

<div style={{background: '#2c3e50', color: '#FFF', width: 220}}> 
      <SideNav highlightColor='#E91E63' >       
          <Nav id='create_user'>
              <NavText> Create User </NavText>
          </Nav>
          <Nav id='update_user'>
              <NavText> Update User </NavText>
          </Nav>
          <Nav id='delete_user'>
              <NavText> Delete User </NavText>
          </Nav>
      </SideNav>
  </div>
          
          
        );
    }
}

ReactDOM.render(<ExpenseSheet />, window.document.getElementById('container'));