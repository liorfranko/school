/**
 * Created by liorf on 12/2/16.
 */
"use strict";
import React from 'react';
import {Link} from 'react-router';

const uTableListItem = (props) => {
  console.log('uTableListItem | props', props);
  // function onEditClick() {
  //   // console.log('DishesListItem | onEditClick');
  //   props.editTable(props.tableNum)
  // }
  // function onDeleteClick() {
  //   // console.log('restMenuListItem | onDeleteClick, props', props);
  //   props.deleteTable(props.tableNum)
  // }
  //onClick={() => browserHistory.push(`/${item.path}`) }
  //onClick={() => props.addOrder(props.item.tableNum._id)}
  // let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
  //let tableId = this.props.appData.data.rests[rest].tables[table]._id;
  return (
    <li className="menuItem list-group-item">
      <div className="innerItem name">
        {/*<Link to={`/uRestaurants/${props.rest.name}/Tables/${props.item.tableNum}`} onClick={() => props.addOrder(props.item._id)}>{props.item.tableNum}</Link>*/}
        <Link to={`/uRestaurants/${props.rest.name}/Tables/${props.item.tableNum}`} >{props.item.tableNum}</Link>
      </div>
    </li>
  );
};

uTableListItem.PropTypes = {
  item: React.PropTypes.object
};

export default uTableListItem;
