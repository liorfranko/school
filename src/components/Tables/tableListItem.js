/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

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

  return (
    <li className="menuItem list-group-item">
      <a className="innerItem name" onClick={onEditClick.bind(this)} >
        {props.item.tableNum}
      </a>
      <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
        del
      </a>
    </li>
  );
};

TableListItem.PropTypes = {
  item: React.PropTypes.object
};

export default TableListItem;
