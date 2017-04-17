/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

const uTableListItem = (props) => {
  // console.log('TableListItem | props', props);
  // function onEditClick() {
  //   // console.log('DishesListItem | onEditClick');
  //   props.editTable(props.tableNum)
  // }
  // function onDeleteClick() {
  //   // console.log('restMenuListItem | onDeleteClick, props', props);
  //   props.deleteTable(props.tableNum)
  // }

  return (
    <li className="menuItem list-group-item">
      <div className="innerItem name">
        <Link to={`/uRestaurants/${props.rest.name}/Tables/${props.item.tableNum}`}>{props.item.tableNum}</Link>
      </div>
    </li>
  );
};

uTableListItem.PropTypes = {
  item: React.PropTypes.object
};

export default uTableListItem;
