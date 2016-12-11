/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

const restMenuListItem = (props) => {
  // console.log("restMenuListItem | ", props);
  function onEditClick() {
    // console.log('restMenuListItem | onEditClick, props', props);
    props.editRestMenu(props)
  }
  return (
    <li className="menuItem list-group-item">
      <div className="innerItem name">
        <Link to={`/rest/${props.rest.name}/menu/${props.item.name}`}>{props.item.name}</Link>
      </div>
    </li>
  );
};

restMenuListItem.PropTypes = {
  item: React.PropTypes.object
};

export default restMenuListItem;
