/**
 * Created by Alex on 21/11/2016.
 */

"use strict";
import React from 'react';
import {Link, NavLink} from 'react-router';
// import ListOfRestMenus from '../restMenu/ListOfRestMenus'

const uRestaurantListItem = (props) => {
  // console.log("RestaurantListItem | ", props);

  return (
    <li className="restItem list-group-item">
      <div className="innerItem name">
        <Link to={`/uRestaurants/${props.item.name}`}>{props.item.name}</Link>
      </div>
      <div className="innerItem address">
        {props.item.address}
      </div>
    </li>
  );
};

uRestaurantListItem.PropTypes = {
  item: React.PropTypes.object
};

export default uRestaurantListItem;


