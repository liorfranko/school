/**
 * Created by liorf on 7/8/17.
 */
import React from 'react';

const Admin = (props) => {
  // console.log('porps | ', props);
  // const {appData, getRests} = props;
  return(
    <div>
      {
        props.children ? React.cloneElement(props.children, props) : "No Children"
      }
    </div>
  );
};

export default Admin;
