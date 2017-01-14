/**
 * Created by liorf on 12/17/16.
 */
import React from 'react';
import SubMenuListItem from './SubMenuListItem';

const ListOfSubMenus = (props) => {
  console.log('ListOfSubMenus |', props);
  return (
    <ul className="subMenusList list-group">
      <li className="subMenuItem list-group-item">
      {
        props.subMenus.map((subMenu, i) => {
          return (
            <SubMenuListItem key={i} item={subMenu}
                             dishes={props.dishes}
                             delSubMenu = {props.delSubMenu}
                             editSubMenu = {props.editSubMenu}
            />
          );
        })
      }
      </li>
    </ul>
  )
};

export default ListOfSubMenus;
