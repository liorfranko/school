/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
const TableListItem = (props) => {
  // console.log('TableListItem | props', props);
  function onEditClick() {
    // console.log('DishesListItem | onEditClick');
    props.editTable(props.tableNum)
  }
  function onDeleteClick() {
    // console.log('restMenuListItem | onDeleteClick, props', props);
    props.deleteTable(props.tableNum)
  }

  function openQr() {
    // console.log('restMenuListItem | onDeleteClick, props', props);
    props.openQr(props.tableNum)
  }

  return (
    <li className="menuItem list-group-item">
      <a className="innerItem name" onClick={onEditClick.bind(this)} >
        {props.item.tableNum}
      </a>
      <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
        del
      </a>
      <a className="innerItem openQr" onClick={openQr.bind(this)}>
        Get QR Code
      </a>
    </li>
  );
};

TableListItem.PropTypes = {
  item: React.PropTypes.object
};

export default TableListItem;
