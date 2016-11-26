/**
 * Created by liorf on 11/25/16.
 */
import React from 'react';
import DishesListItem from './DishesListItem';

const ListOfDishes = (props) => {
  // console.log('ListOfDishes |', props);
  return (
    <ul className="dishList list-group">
      {
        props.dishes.map((dish, i) => {
          return (
            <DishesListItem key={i} item={dish} editDish={props.editDish} deleteDish={props.deleteDish} dishNum={i}/>
          );
        })
      }
    </ul>
  )
};

export default ListOfDishes;
