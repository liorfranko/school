/**
 * Created by liorf on 11/25/16.
 */
import React from 'react';
import DishesListItem from './DishesListItem';
import ReactSuperSelect from 'react-super-select'
import _ from 'lodash';

const ListOfDishes = (props) => {
  console.log('ListOfDishes | props', props);

  var handlerExample = function (options) {
    var output = [];
    _.map(options, function (option) {
      output = output.concat([
        'Multiselect Chosen Option = {\n',
        '\tid: ', option.id, '\n',
        '\tname: ', option.name, '\n',
        '\tsize: ', option.size, '\n\t};']);
    });
    console.log(output.join(''));
    console.log('ListOfDishes | options', options);
    // props.updateDishes(options)
  };
  var testData = [];
  props.dishes.map((dish) => {
    // console.log('ListOfDishes | dishes.map | ', i, dish);
    testData.push({
      "id": dish._id,
      "name": dish.name
    })
  });

  if (props.type ==="inMenu"){
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
              <DishesListItem key={i} item={dish} editDish={props.editDish} deleteDish={props.deleteDish} dishNum={i}/>
            );
          })
        }
      </ul>
    )
  }

};

export default ListOfDishes;
