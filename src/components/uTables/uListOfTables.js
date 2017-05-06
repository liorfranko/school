/**
 * Created by liorf on 12/2/16.
 */

"use strict";

import React from 'react';
import TableListItem from './utableListItem';

const uListOfTables = (props) => {
  // console.log('uListOfTables |', props);
  return (
    <ul className="restMenuList list-group">
      {
        props.tables.map((table, i) => {
          return (
            <TableListItem
              key={i}
              item={table}
              addOrder={props.addOrder}
              rest={props.rest}
              tableNum={i}
            />
          );
        })
      }
    </ul>
  )
};

export default uListOfTables;
