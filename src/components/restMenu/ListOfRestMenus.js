/**
 * Created by liorf on 12/2/16.
 */

"use strict";

import React from 'react';
import RestMenuListItem from './restMenuListItem';

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
  )
};

export default ListOfRestMenus;
