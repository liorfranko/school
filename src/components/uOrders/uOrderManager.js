/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import './Orders.styl';
// import ListOfTables from './uListOfTables';
// import {Button} from 'react-bootstrap';

class uOrderManager extends React.Component {
  constructor(props) {
    console.log('uOrderManager | constructor', props);
    super(props);
  }


  render() {
    console.log('uOrderManager | props', this.props);
    // console.log('restMenuManager | this.state', this.state);
    // let styleDiv = {
    //   fontSize: 30
    // };
    return (
      <div id="restMenu" className="panel panel-default">
        {/*<div className="panel-heading" style={styleDiv}>{this.props.rest.name}</div>*/}
        <div className="panel-body">
          Orders
        </div>
      </div>
    )
  }
}

export default uOrderManager;
