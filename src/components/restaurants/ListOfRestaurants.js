/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import RestaurantListItem from './RestaurantListItem';

const ListOfRestaurants = (props) => {
  // console.log('ListOfRestaurants |', props);
  return (
    <ul className="restList list-group">
      {
        props.rests.map((rest, i) => {
          {/*console.log('RestaurantListItem | rest', rest);*/}
          {/*console.log('RestaurantListItem | rest.menus', rest.menus);*/}
          if (!rest.menus) {
            {/*console.log('ListOfRestaurants | loading');*/}
            props.getMenu(rest._id);
            return (
              <div key={i}>Loading</div>
            )
          } else {
            return (
              <RestaurantListItem key={i} item={rest} editRest={props.editRest} deleteRest={props.deleteRest} resNum={i} editMenu={props.editMenu} addRestMenu={props.addRestMenu}/>
            );
          }
        })
      }
    </ul>
  )
};

export default ListOfRestaurants;
