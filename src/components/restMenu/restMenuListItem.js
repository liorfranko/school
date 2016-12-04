/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';

const restMenuListItem = (props) => {
  // console.log("restMenuListItem | ", props);
  function onEditClick() {
    console.log('restMenuListItem | onEditClick');
    props.editRest(props.resNum)
  }

  function onDeleteClick() {
    console.log('restMenuListItem | onDeleteClick');
    props.deleteRest(props.resNum)
  }

  function editMenu() {
    console.log('restMenuListItem | editMenu, props', props);
    props.editMenu(props.item);
  }
  return (
    <div className="innerItem name" onClick={editMenu.bind(this)}>
      {props.item.name}
    </div>
  );
};

restMenuListItem.PropTypes = {
  item: React.PropTypes.object
};

export default restMenuListItem;
