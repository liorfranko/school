/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const restMenuListItem = (props) => {
  // console.log("restMenuListItem | ", props);
  const onDeleteClick = () => {
    // console.log('restMenuListItem | onDeleteClick, props', props);
    props.deleteRestMenu(props.menuNum);
  };

  return (
    <li className="menuItem list-group-item">
      <div className="innerItem name">
        <Link to={`/Admin/Restaurants/${props.rest.name}/Menus/${props.item.name}`}>{props.item.name}</Link>
      </div>
      <a className="innerItem delete" onClick={onDeleteClick}>
        del
      </a>
    </li>
  );
};

restMenuListItem.propTypes = {
  item: PropTypes.object,
  rest: PropTypes.object,
  deleteRestMenu: PropTypes.func,
  menuNum: PropTypes.number
};
export default restMenuListItem;
