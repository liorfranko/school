/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import {IndexLink} from 'react-router';
import {Nav} from 'react-bootstrap';


const Menu = (props) => {
  // console.log('Menu | props', props);
  function handleSelect(selectedKey) {
    // alert('selected ' + selectedKey);
  }

  return (
  <Nav bsStyle="pills" activeKey={0} onSelect={handleSelect}>
    {props.menu.map((item, i) => {
      return (
        <li key={i}><IndexLink to={`/${item.path}`}>{item.name}</IndexLink></li>
      )
    })}
  </Nav>
  )
};

export default Menu;
