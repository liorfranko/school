/**
 * Created by Alex on 21/11/2016.
 */

"use strict";
import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const RestaurantListItem = (props) => {
  // console.log("RestaurantListItem | ", props);
  const onEditClick = () => {
    // console.log('RestaurantListItem | onEditClick');
    props.editRest(props.resNum);
  };

  const onDeleteClick = () => {
    // console.log('RestaurantListItem | onDeleteClick');
    props.deleteRest(props.resNum);
  };

  return (
    <li className="restItem list-group-item">
      <div className="innerItem name">
        <Link to={`/Admin/Restaurants/${props.item.name}`}>{props.item.name}</Link>
      </div>
      <div className="innerItem address">
        {props.item.address}
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

RestaurantListItem.propTypes = {
  item: PropTypes.object,
  resNum: PropTypes.number,
  deleteRest: PropTypes.func
};

export default RestaurantListItem;


