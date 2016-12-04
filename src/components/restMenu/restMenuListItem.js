/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';

const restMenuListItem = (props) => {
  // console.log("restMenuListItem | ", props);
  function onEditClick() {
    console.log('restMenuListItem | onEditClick, props', props);
    props.editRestMenu(props)
  }
  var style = {
    display: 'block'
  };
  return (
    <a className="innerItem name" onClick={onEditClick.bind(this)} style={style}>
      {props.item.name}
    </a>
  );
};

restMenuListItem.PropTypes = {
  item: React.PropTypes.object
};

export default restMenuListItem;
