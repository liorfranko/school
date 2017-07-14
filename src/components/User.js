/**
 * Created by liorf on 7/8/17.
 */
import React from 'react';

const User = (props) => {
  return(
    <div>
      {
        props.children ? React.cloneElement(props.children, props) : "No Children"
      }
    </div>
  );
};

export default User;
/**
 * Created by liorf on 7/8/17.
 */
