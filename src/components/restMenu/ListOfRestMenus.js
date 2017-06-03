/**
 * Created by liorf on 12/2/16.
 */

"use strict";

import React from 'react';
import RestMenuListItem from './restMenuListItem';
import PropTypes from 'prop-types';

const ListOfRestMenus = (props) => {
  // console.log('ListOfRestMenus |', props);
  return (
    <ul className="restMenuList list-group">
      {
        props.menus.map((menu, i) => {
          return (
            <RestMenuListItem
              key={i}
              item={menu}
              deleteRestMenu={props.deleteRestMenu}
              rest={props.rest}
              menuNum={i}/>
          );
        })
      }
    </ul>
  );
};
ListOfRestMenus.propTypes = {
  editRest: PropTypes.func,
  deleteRestMenu: PropTypes.func,
  rest: PropTypes.object,
  menus: PropTypes.array
};
export default ListOfRestMenus;
