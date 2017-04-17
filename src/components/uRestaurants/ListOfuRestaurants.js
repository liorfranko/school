/**
 * Created by Alex on 21/11/2016.
 */

"use strict";

import React from 'react';
import RestaurantListItem from './uRestaurantListItem';

const ListOfuRestaurants = (props) => {
  // console.log('ListOfuRestaurants |', props);
  return (
    <ul className="restList list-group">
      {
        props.rests.map((rest, i) => {
          return (
            <RestaurantListItem key={i}
                                item={rest}
                                resNum={i}/>
          );
        })
      }
    </ul>
  )
};

export default ListOfuRestaurants;
