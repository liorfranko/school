/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';

const RestaurantListItem = (props) => {
  return (
    <li className="restItem list-group-item">
      <div className="innerItem name">
        {props.item.name}
      </div>
      <div className="innerItem address">
        {props.item.address}
      </div>
      <div className="innerItem delete">
        del
      </div>
      <div className="innerItem edit" onClick={props.editRest}>
        edit
      </div>
    </li>
  )
};

RestaurantListItem.PropTypes = {
  item: React.PropTypes.object
};

export default RestaurantListItem;


