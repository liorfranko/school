/**
 * Created by liorf on 11/25/16.
 */
import React from 'react';
import DishesListItem from './DishesListItem';
import ReactSuperSelect from 'react-super-select'

const ListOfDishes = (props) => {
  // console.log('ListOfDishes | props', props);
  let handlerExample = function (options) {
    console.log('ListOfDishes | options', options);
    // props.updateDishes(options)
  };
  let testData = [];
  props.dishes.map((dish) => {
    // console.log('ListOfDishes | dishes.map | ', i, dish);
    testData.push({
      "id": dish._id,
      "name": dish.name
    })
  });

  if (props.type === "inMenu") {
    return (
      <ReactSuperSelect placeholder="Make Your Selections"
                        dataSource={testData}
                        onChange={handlerExample}
                        multiple={true}
                        keepOpenOnSelection={true}/>
    )
  } else {
    return (
      <ul className="dishList list-group">
        {
          props.dishes.map((dish, i) => {
            return (
              <DishesListItem
                key={i}
                item={dish}
                editDish={props.editDish}
                deleteDish={props.deleteDish}
                dishNum={i}
              />
            );
          })
        }
      </ul>
    )
  }

};

export default ListOfDishes;
