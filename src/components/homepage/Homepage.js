/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';

const Homepage = (props) => {
  let styleDiv = {
    fontSize: '30'
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading" style={styleDiv}>Homepage</div>
      <div className="panel-body">
      <h1>
        Homepage
      </h1>
      </div>
    </div>
  )
};

export default Homepage;
