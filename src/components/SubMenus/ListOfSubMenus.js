/**
 * Created by liorf on 12/17/16.
 */
import React from 'react';
import SubMenuListItem from './SubMenuListItem';
import PropTypes from 'prop-types';

const ListOfSubMenus = (props) => {
  // console.log('ListOfSubMenus |', props);
  return (
    <ul className="restSubMenuList list-group">
      {
        props.subMenus.map((subMenu, i) => {
          return (
            <SubMenuListItem key={i} item={subMenu}
                             delSubMenu = {props.delSubMenu}
                             rest = {props.rest}
                             menu = {props.menu}
                             subMenuNum = {i}
            />
          );
        })
      }
    </ul>
  );
};
ListOfSubMenus.propTypes = {
  delSubMenu: PropTypes.func,
  rest: PropTypes.object,
  menu: PropTypes.object,
  subMenus: PropTypes.array
};
export default ListOfSubMenus;
