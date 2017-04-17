/**
 * Created by liorf on 4/17/17.
 */
import React from 'react';

class Table extends React.Component {
  constructor(props) {
    console.log('uTable | constructor | this.props', props);
    super(props);
  }

  render() {
    console.log('Table | render | this.props.appData', this.props);
    // const src = require("../../Images/5.gif");
    // const styleDiv = {
    //   fontSize: 30
    // };
    return (
      <div>Test</div>
    );
  }
}

export default Table;
