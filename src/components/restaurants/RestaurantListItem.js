/**
 * Created by Alex on 21/11/2016.
 */

"use strict";
import React from 'react';
import {Link} from 'react-router';
// import ListOfRestMenus from '../restMenu/ListOfRestMenus'

const RestaurantListItem = (props) => {
  // console.log("RestaurantListItem | ", props);
  function onEditClick() {
    // console.log('RestaurantListItem | onEditClick');
    props.editRest(props.resNum)
  }

  function onDeleteClick() {
    // console.log('RestaurantListItem | onDeleteClick');
    props.deleteRest(props.resNum)
  }

  return (
    <li className="restItem list-group-item">
      <div className="innerItem name">
        <Link to={`/${props.item.name}`}>{props.item.name}</Link>
      </div>
      <div className="innerItem address">
        {props.item.address}
      </div>
      <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
        del
      </a>
      <a className="innerItem edit" onClick={onEditClick.bind(this)}>
        edit
      </a>
    </li>
  );
};

RestaurantListItem.PropTypes = {
  item: React.PropTypes.object
};

export default RestaurantListItem;


