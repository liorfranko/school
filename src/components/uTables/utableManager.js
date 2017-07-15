/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import './Tables.styl';
import ListOfTables from './uListOfTables';
// import {Button} from 'react-bootstrap';

class uTableManager extends React.Component {
  constructor(props) {
    // console.log('uTableManager | constructor', props);
    super(props);
  }
  render() {
    // console.log('uTableManager | props', this.props);
    let styleDiv = {
      fontSize: 30
    };
    return (
      <div id="restMenu" className="panel panel-default">
        <div className="panel-heading" style={styleDiv}>Tables:</div>
        <div className="panel-body">
          <ListOfTables
            tables={this.props.tables}
            rest={this.props.rest}
            addOrder={this.props.addOrder}
          />
        </div>
      </div>
    )
  }
}

export default uTableManager;
