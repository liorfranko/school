/**
 * Created by Alex on 21/11/2016.
 */

"use strict";
import React from 'react';

const RestaurantListItem = (props) => {
  // console.log("RestaurantListItem | ", props);
  function onEditClick() {
    console.log('RestaurantListItem | onEditClick');
    props.editRest(props.resNum)
  }

  function onDeleteClick() {
    console.log('RestaurantListItem | onDeleteClick');
    props.deleteRest(props.resNum)
  }

  return (
    <li className="restItem list-group-item">
      <div className="innerItem name">
        {props.item.name}
      </div>
      <div className="innerItem address">
        {props.item.address}
      </div>
      <div className="innerItem delete" onClick={onDeleteClick.bind(this)}>
        del
      </div>
      <div className="innerItem edit" onClick={onEditClick.bind(this)}>
        edit
      </div>
    </li>
  );
};

RestaurantListItem.PropTypes = {
  item: React.PropTypes.object
};

export default RestaurantListItem;


