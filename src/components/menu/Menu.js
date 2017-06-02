/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import {browserHistory} from 'react-router';
// import {Nav, Navbar, NavItem, Breadcrumb} from 'react-bootstrap';
import {Nav, Navbar, NavItem, Breadcrumb} from 'react-bootstrap';
// import breadcrumbInstance from '../Breadcrumb'

const Menu = (props) => (

  <div>
    {console.log('Menu | props', props)}
    <Navbar inverse collapseOnSelect fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a onClick={() => browserHistory.push(`/`) } href="#">Homepage</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          {props.menu.map((item, i) => {
            return (
              <NavItem key={i} eventKey={i} onClick={() => browserHistory.push(`/${item.path}`) }>{item.name}</NavItem>
            )
          })}
        </Nav>
        {props.priv === 'user' ?
          <Nav bsStyle="pills" pullRight>
            <NavItem onClick={props.login}>Admin Login</NavItem>
          </Nav> :
          <Nav bsStyle="pills" pullRight>
            <NavItem onClick={props.logout}>Logout</NavItem>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  </div>


);
export default Menu;
