/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfTables from './ListOfTables';
import AddTable from './AddTable'
import DeleteTable from './DeleteTable'
import EditTable from './EditTable'
import './Tables.styl';
import {Button} from 'react-bootstrap';

class TableManager extends React.Component {
  constructor(props) {
    // console.log('TableManager | constructor', props);
    super(props);
    this.exitPopup = this.exitPopup.bind(this);
    this.addTable = this.addTable.bind(this);
    this.deleteTable = this.deleteTable.bind(this);
    this.openEditDish = this.openEditDish.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showEditModal: false,
      selectedTable: 0
    }
  }

  exitPopup() {
    this.setState({
      showAddModal: false,
      showDeleteModal: false,
      showEditModal: false,
      selectedTable: 0
    });
  };

  addTable() {
    // console.log('restMenuManager | addTable');
    this.setState({
      showAddModal: true
    });
  };

  deleteTable(data) {
    // console.log('restMenuManager | deleteTable | data', data);
    this.setState({
      showDeleteModal: true,
      selectedTable: data
    });

  };

  handleAddClick(...data) {
    // console.log('TableManager | handleAddClick data', data);
    this.props.addTable(data);
    this.setState({
      showAddModal: false
    });
  }

  handleDeleteClick(...data) {
    // console.log('restMenuManager | handleDeleteClick this.props', data);
    this.props.deleteTable(...data);
    this.setState({
      selectedTable: 0,
      showDeleteModal: false
    });
  }

  handleEditClick(data) {
    // console.log('TableManager | handleEditClick', this.state);
    this.props.editTable(data);
    this.setState({
      showEditModal: false,
      selectedTable: 0
    });
  }

  openEditDish(data) {
    // console.log('TableManager | openEditDish', data);
    this.setState({
      selectedTable: data,
      showEditModal: true
    });
  }

  render() {
    // console.log('tableManager | props', this.props);
    // console.log('restMenuManager | this.state', this.state);
    let styleDiv = {
      fontSize: 30
    };
    return (
      <div id="restMenu" className="panel panel-default">
        {/*<div className="panel-heading" style={styleDiv}>{this.props.rest.name}</div>*/}
        <div className="panel-body">
          Tables:
          <ListOfTables
            tables={this.props.tables}
            rest={this.props.rest}
            deleteTable={this.deleteTable}
            editTable={this.openEditDish}
          />
          <AddTable
            handleClick={this.handleAddClick.bind(this)}
            rest={this.props.rest}
            exit={this.exitPopup.bind(this)}
            show={this.state.showAddModal}
          />
          <Button onClick={this.addTable}>Add Table</Button>
          <DeleteTable
            chosenTable={this.props.tables[this.state.selectedTable]}
            handleClick={this.handleDeleteClick.bind(this)}
            exit={this.exitPopup.bind(this)}
            show={this.state.showDeleteModal}
          />
          <EditTable
            chosenTable={this.props.tables[this.state.selectedTable]}
            handleClick={this.handleEditClick.bind(this)}
            exit={this.exitPopup.bind(this)}
            show={this.state.showEditModal}
          />
        </div>
      </div>
    )
  }
}

export default TableManager;
