/**
 * Created by liorf on 4/17/17.
 */

import React from 'react';
import ListOfRestaurants from './ListOfuRestaurants';
import EditTable from '../../components/EditTable';

import './rests.styl';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

class uRestaurantsManager extends React.Component {
  constructor(props) {
    // console.log('RestaurantsManager | constructor', props);
    super(props);
    this.isSelected = this.isSelected.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onRowSelection = this.onRowSelection.bind(this);

    this.state = {
      selectedRes: 0,
      selected: [1],
    };
  }

  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1;
  };
  onRowSelection(rows) {
    console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      // console.log(this.props.appData.data.rests[rows[i]]);
      browserHistory.push(`/uRestaurants/${this.props.appData.data.rests[rows[i]].name}`);
    }
  }
  handleRowSelection(selectedRows) {
    this.setState({
      selected: selectedRows,
    });
  };

  componentDidMount() {
    // console.log('RestaurantsManager | componentDidMount', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    }
  }

  render() {
    // console.log('uRestaurants Manager | this.props', this.props);
    // console.log('uRestaurants Manager | this.state', this.state);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.rests) {
      // console.log('uRestaurantsManager | loading');
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.children ? React.cloneElement(this.props.children, this.props) : (
            <div id="rests" className="panel panel-default">
              <div className="panel-heading" style={styleDiv}>Restaurants:</div>
              <div className="panel-body">


                <Table selectable={true} onRowSelection={this.onRowSelection}>
                  <TableHeader displaySelectAll={false } adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn>ID</TableHeaderColumn>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Address</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {this.props.appData.data.rests.map( (row, index) => (
                      <TableRow key={index}   style={{cursor: 'pointer'}}>
                        <TableRowColumn>{index}</TableRowColumn>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        <TableRowColumn>{row.address}</TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )
          }
        </div>

      );
    }

  }
}

export default uRestaurantsManager;
