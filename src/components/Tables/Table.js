/**
 * Created by liorf on 4/17/17.
 */
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Table extends React.Component {
  constructor(props) {
    console.log('Table | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentDidMount() {
    console.log('Table | componentDidMount | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name===this.props.params.restName);
      console.log('Table | componentDidMount | rest', rest);
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      } else {
        let table = this.props.appData.data.rests[rest].tables.findIndex(x => x.tableNum===this.props.params.tableName);
        console.log('Table | componentDidMount | table', table);
        let tableId = this.props.appData.data.rests[rest].tables[table]._id;
        console.log('Table | componentDidMount | tableId', tableId);
        this.props.getOrdersByTableId(tableId)
      }
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log('Table | componentWillReceiveProps | nextProps', nextProps);
  //   console.log('Table | componentWillReceiveProps | this.props', this.props);
  //   if (!this.props.appData.data.rests) {
  //     this.props.getAllRests();
  //   } else {
  //     let rest = this.props.appData.data.rests.findIndex(x => x.name===this.props.params.restName);
  //     console.log('Table | componentWillReceiveProps | rest', rest);
  //     if (!this.props.appData.data.rests[rest].tables) {
  //       this.props.getTables(this.props.appData.data.rests[rest]._id);
  //     } else {
  //       let table = this.props.appData.data.rests[rest].tables.findIndex(x => x.tableNum===this.props.params.tableName);
  //       console.log('Table | componentWillReceiveProps | table', table);
  //       let tableId = this.props.appData.data.rests[rest].tables[table]._id;
  //       console.log('Table | componentWillReceiveProps | tableId', tableId);
  //       this.props.getOrdersByTableId(tableId)
  //     }
  //   }
  // }

  render() {
    console.log('Table | render | this.props.appData', this.props);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.rests) {
      return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      )
    } else {
      return (
        <div>Test</div>
      );
    }

  }
}

export default Table;
