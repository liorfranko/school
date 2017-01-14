/**
 * Created by liorf on 12/17/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

const SubMenuListItem = (props) => {
  console.log("SubMenuListItem | props", props);
  function onEditClick() {
    console.log('SubMenuListItem | onEditClick');
    props.editSubMenu(props)
  }

  function onDeleteClick() {
    console.log('SubMenuListItem | onDeleteClick | props', props);
    props.delSubMenu({subMenuId: props.item._id, menuId: props.item.menuId})
  }

  if (props.item.dishArray == null) {
    return (
      <div className="innerItem sub">
        SubMenu Name: {props.item.name}
        <div className="innerItem">
          <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
            Delete Submenu
          </a>
        </div>
        <div className="innerItem">
          <a className="innerItem edit" onClick={onEditClick.bind(this)}>
            Edit Submenu
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="innerItem sub">
        SubMenu Name: {props.item.name}
        {console.log('SubMenuListItem | dishArray', props.item.dishArray)}
        {props.item.dishArray.map((dish, i) => {
          let dish_index = props.dishes.findIndex(x => x._id==dish);
          {/*console.log('SubMenuListItem | dish_index', props.dishes[dish_index].name);*/}
          return (
            <div key={i}>
              <div>Name: {props.dishes[dish_index].name}</div>
              <div>Price: {props.dishes[dish_index].defaultPrice}</div>
              <div>Description: {props.dishes[dish_index].description}</div>
            </div>
          );
        })}
        <div className="innerItem">
          <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
            Delete Submenu
          </a>
        </div>
        <div className="innerItem">
          <a className="innerItem edit" onClick={onEditClick.bind(this)}>
            Edit Submenu
          </a>
        </div>
      </div>
    );
  }

};

SubMenuListItem.PropTypes = {
  item: React.PropTypes.object
};

export default SubMenuListItem;
