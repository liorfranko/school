/**
 * Created by liorf on 12/2/16.
 */

"use strict";

import React from 'react';
import TableListItem from './utableListItem';

const ListOfOrders = (props) => {
  console.log('ListOfOrders |', props);
  return (
    <ul className="restMenuList list-group">
      {
        props.tables.map((table, i) => {
          return (
            <TableListItem
              key={i}
              item={table}
              deleteTable={props.deleteTable}
              editTable={props.editTable}
              rest={props.rest}
              tableNum={i}
            />
          );
        })
      }
    </ul>
  )
};

export default ListOfOrders;
