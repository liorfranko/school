"use strict";
import React from 'react';
import PropTypes from 'prop-types';


const DishesListItem = (props) => {
  // console.log("DishesListItem | ", props);
  const onEditClick = () => {
    // console.log('DishesListItem | onEditClick');
    props.editDish(props.dishNum);
  };

  const onDeleteClick = () => {
    // console.log('DishesListItem | onDeleteClick');
    props.deleteDish(props.dishNum);
  };

  return (

    <li className="dishItem list-group-item">
      <a className="innerItem name" onClick={onEditClick}>
        {props.item.name}
      </a>
      <div className="innerItem description">
        {props.item.description}
      </div>
      <div className="innerItem Price">
        {props.item.defaultPrice}
      </div>
      <a className="innerItem delete" onClick={onDeleteClick}>
        del
      </a>
      <a className="innerItem edit" onClick={onEditClick}>
        edit
      </a>
    </li>
  );
};

DishesListItem.propTypes = {
  item: PropTypes.object,
  deleteDish: PropTypes.func,
  editDish: PropTypes.func,
  dishNum: PropTypes.number
};
export default DishesListItem;


