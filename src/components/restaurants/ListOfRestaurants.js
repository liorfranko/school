/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import RestaurantListItem from './RestaurantListItem';

const ListOfRestaurants = (props) => {
  console.log('ListOfRestaurants |', props);
  return (
    <ul className="restList list-group">
      {
        props.rests.map((rest, i) => {
          return (
            <RestaurantListItem key={i} item={rest} editRest={props.editRest} deleteRest={props.deleteRest} resNum={i} editMorningMenu={props.editMorningMenu}/>
          );
        })
      }
    </ul>
  )
};

export default ListOfRestaurants;
