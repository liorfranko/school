/**
 * Created by liorf on 12/2/16.
 */

"use strict";

import React from 'react';
import TableListItem from './tableListItem';

const ListOfTables = (props) => {
  // console.log('ListOfTables |', props);
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
              openQr={props.openQr}
              rest={props.rest}
              tableNum={i}
            />
          );
        })
      }
    </ul>
  )
};

export default ListOfTables;
