/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import './Tables.styl';
import ListOfTables from './uListOfTables';
// import {Button} from 'react-bootstrap';

class uTableManager extends React.Component {
  constructor(props) {
    console.log('uTableManager | constructor', props);
    super(props);
    this.componentInit = this.componentInit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentInit() {
    // console.log('uTableManager | componentInit');

    // this.props.tables.map((table, i ) => {
    //   console.log('uTableManager | componentInit | table', table);
    //   if (!table.orders) {
    //     console.log('uTableManager | componentInit | table', table);
    //     this.props.getOrdersByTableId(table._id);
    //   } else {
    //     console.log('uTableManager | componentInit | table.orders', table.orders);
    //
    //   }
    // })
  }
  componentDidMount() {
    // console.log('uTableManager | componentDidMount | this.props', this.props);
    this.componentInit();
  }
  componentWillReceiveProps() {
    // console.log('uTableManager | componentWillReceiveProps | this.props', this.props);
    this.componentInit();
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
