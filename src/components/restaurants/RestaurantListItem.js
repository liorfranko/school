/**
 * Created by Alex on 21/11/2016.
 */

"use strict";
import React from 'react';
import {Link} from 'react-router';
import { IndexLink } from 'react-router'
// import ListOfRestMenus from '../restMenu/ListOfRestMenus'

const RestaurantListItem = (props) => {
  // console.log("RestaurantListItem | ", props);
  function onEditClick() {
    // console.log('RestaurantListItem | onEditClick');
    props.editRest(props.resNum)
  }

  function onDeleteClick() {
    // console.log('RestaurantListItem | onDeleteClick');
    props.deleteRest(props.resNum)
  }

  function onOpenClick() {
    props.openRest(props.resNum)
  }
  // function editMenu(event) {
  //   console.log('RestaurantListItem | editMenu, event', event.target.name);
  //   // props.editMenu();
  // }
  function addRestMenu() {
    props.addRestMenu();
  }
  return (
    <li className="restItem list-group-item">
      <div className="innerItem name">
        <IndexLink to={`/rest/${props.resNum}`}>{props.item.name}</IndexLink>
      </div>

      {/*<a className="innerItem name" onClick={onOpenClick.bind(this)}>*/}
        {/**/}
      {/*</a>*/}
      <div className="innerItem address">
        {props.item.address}
      </div>
      <a className="innerItem delete" onClick={onDeleteClick.bind(this)}>
        del
      </a>
      <a className="innerItem edit" onClick={onEditClick.bind(this)}>
        edit
      </a>
      {/*<div>*/}
        {/*Menus*/}
      {/*</div>*/}
      {/*<div className="innerItem menus">*/}
        {/*<ListOfRestMenus menus={props.item.menus} editMenu={props.editMenu}/>*/}
      {/*</div>*/}
      {/*<div onClick={addRestMenu.bind(this)}>Add menu</div>*/}
    </li>
  );
};

RestaurantListItem.PropTypes = {
  item: React.PropTypes.object
};

export default RestaurantListItem;


