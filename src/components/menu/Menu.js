/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import {Link} from 'react-router';
import {NavItem, Nav} from 'react-bootstrap';


const Menu = (props) => {
  // console.log('Menu | props', props);
  function handleSelect(selectedKey) {
    // alert('selected ' + selectedKey);
  }

  return (
  <Nav bsStyle="pills" activeKey={0} onSelect={handleSelect}>
    {props.menu.map((item, i) => {
      return (
        <li key={i}><Link to={item.path}>{item.name}</Link></li>
      )
    })}
    {/*<NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>*/}
    {/*<NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>*/}
    {/*<NavItem eventKey={3} disabled>NavItem 3 content</NavItem>*/}
  </Nav>
    // <ul>
    //   {props.menu.map((item, i) => {
    //     return (
    //       <li key={i}><Link to={item.path}>{item.name}</Link></li>
    //     )
    //   })}
    // </ul>
  )
};

export default Menu;
