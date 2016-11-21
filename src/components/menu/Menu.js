/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import {Link} from 'react-router';

const Menu = (props) => {
  return (
    <ul>
      {props.menu.map((item, i) => {
        return (
          <li key={i}><Link to={item.path}>{item.name}</Link></li>
        )
      })}
    </ul>
  )
};

export default Menu;
