/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import {browserHistory} from 'react-router';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

const Menu = (props) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a onClick={() => browserHistory.push(`/`) }>Homepage</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        {props.menu.map((item, i) => {
          return (
            <NavItem eventKey={i} onClick={() => browserHistory.push(`/${item.path}`) }>{item.path}</NavItem>
          )
        })}
      </Nav>
      {props.uid != null ?
        <Nav bsStyle="pills" pullRight>
          <NavItem onClick={props.logout}>Logout</NavItem>
        </Nav> : null
      }
    </Navbar.Collapse>
  </Navbar>
);
export default Menu;
