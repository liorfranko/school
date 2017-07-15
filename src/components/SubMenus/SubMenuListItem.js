/**
 * Created by liorf on 12/17/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

const SubMenuListItem = (props) => {
  // console.log("SubMenuListItem | props", props);
  function onEditClick() {
    // console.log('SubMenuListItem | onEditClick');
    props.updateSubMenuDishes(props)
  }

  function onDeleteClick() {
    // console.log('SubMenuListItem | onDeleteClick | props', props);
    props.delSubMenu(props.subMenuNum)
  }
  return (
    <li className="subMenuItem list-group-item">
      <div className="innerItem name">
        <Link to={`/Admin/Restaurants/${props.rest.name}/Menus/${props.menu.name}/Submenus/${props.item.name}`}>{props.item.name}</Link>
      </div>
      <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
        del
      </a>
    </li>
  )
};

SubMenuListItem.PropTypes = {
  item: React.PropTypes.object
};

export default SubMenuListItem;
