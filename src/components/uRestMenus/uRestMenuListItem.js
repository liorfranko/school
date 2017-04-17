/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

const uRestMenuListItem = (props) => {
  console.log("uRestMenuListItem | ", props);
  return (
    <li className="menuItem list-group-item">
      <div className="innerItem name">
        <Link to={`/uRestaurants/${props.rest.name}/Menus/${props.item.name}`}>{props.item.name}</Link>
      </div>
    </li>
  );
};

uRestMenuListItem.PropTypes = {
  item: React.PropTypes.object
};

export default uRestMenuListItem;
