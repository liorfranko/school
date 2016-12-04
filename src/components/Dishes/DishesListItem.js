/**
 * Created by liorf on 11/25/16.
 */
/**
 * Created by Alex on 21/11/2016.
 */

"use strict";
import React from 'react';

const DishesListItem = (props) => {
  // console.log("DishesListItem | ", props);
  function onEditClick() {
    // console.log('DishesListItem | onEditClick');
    props.editDish(props.dishNum)
  }

  function onDeleteClick() {
    // console.log('DishesListItem | onDeleteClick');
    props.deleteDish(props.dishNum)
  }
  return (
    <li className="dishItem list-group-item">
      <div className="innerItem name">
        {props.item.name}
      </div>
      <div className="innerItem description">
        {props.item.description}
      </div>
      <div className="innerItem Price">
        {props.item.defaultPrice}
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

DishesListItem.PropTypes = {
  item: React.PropTypes.object
};

export default DishesListItem;


