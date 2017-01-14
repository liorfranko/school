/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

const restMenuListItem = (props) => {
  // console.log("restMenuListItem | ", props);
  function onDeleteClick() {
    // console.log('restMenuListItem | onDeleteClick, props', props);
    props.deleteRestMenu(props.item)
  }

  return (
    <li className="menuItem list-group-item">
      <div className="innerItem name">
        <Link to={`/rest/${props.rest.name}/menu/${props.item.name}`}>{props.item.name}</Link>
      </div>
      <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
        del
      </a>
    </li>
  );
};

restMenuListItem.PropTypes = {
  item: React.PropTypes.object
};

export default restMenuListItem;
