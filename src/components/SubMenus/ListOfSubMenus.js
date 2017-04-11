/**
 * Created by liorf on 12/17/16.
 */
import React from 'react';
import SubMenuListItem from './SubMenuListItem';

const ListOfSubMenus = (props) => {
  // console.log('ListOfSubMenus |', props);
  return (
    <ul className="restSubMenuList list-group">
      {
        props.subMenus.map((subMenu, i) => {
          return (
            <SubMenuListItem key={i} item={subMenu}
                             dishes={props.dishes}
                             delSubMenu = {props.delSubMenu}
                             rest = {props.rest}
                             menu = {props.menu}
                             subMenuNum = {i}
            />
          );
        })
      }
    </ul>
  )
};

export default ListOfSubMenus;
