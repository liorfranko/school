import React from 'react';
import ListOfDishes from './ListOfDishes';
import './dishes.styl';
import AddDish from './AddDish.js';
import EditDish from './EditDish.js';
import DeleteDish from './DeleteDish.js';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import {FlatButton} from 'material-ui'
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
// import Ta from 'material-ui/'
// const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
// const baseTheme = require('material-ui/styles/baseThemes/darkBaseTheme');
import EditTable from '../../components/EditTable';
// const container = document.createElement('div');

// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';

class DishesManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: 0,
      showEditModal: false,
      showAddModal: false,
      showDeleteModal: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.openEditDish = this.openEditDish.bind(this);
    this.openDeleteDish = this.openDeleteDish.bind(this);
    this.openAddDish = this.openAddDish.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    // console.log('DishesManager | componentDidMount', this.props);
    if (!this.props.appData.data.dishes) {
      this.props.getDishes();
    }
  }


  onChange(row) {
    console.log('DishesManager | onChange | row is:', row);
    console.log('DishesManager | onChange | this.props.appData.data.dishes.length:', this.props.appData.data.dishes.length);
    // this.state = {
    //   dishName: this.props.dish['name'],
    //   dishId: this.props.dish['_id'],
    //   dishDescription: this.props.dish['description'],
    //   defaultPrice: this.props.dish['defaultPrice']
    // };
    for (let i = 0; i < row.columns.length; i++) {
      // console.log('DishesManager | onChange | row is: ', row.columns[i]);
      if (row.columns[i].id === 0) {
        // console.log('DishesManager | onChange | row is: name');
        if (row.columns[i].value === "" ) {
          // console.log('DishesManager | onChange | row is empty');
          alert('Name can\'t empty.');
          return false
        }
      }
      if (row.columns[i].id === 2) {
        // console.log('DishesManager | onChange | row is: price');
        if (row.columns[i].value === "" ) {
          // console.log('DishesManager | onChange | row is empty');
          alert('Price can\'t empty.');
          return false
        } else {
          // console.log('DishesManager | onChange | row is not empty');
          if (isNaN(row.columns[i].value)) {
            alert('Price is invalid \'' + row.columns[i].value + '\'.');
            return false
          }
        }
      }
    };

    if (row.columns[3]){
      // console.log('id exists | row[3]', row.columns[3]);
      let dish = this.props.appData.data.dishes.findIndex(x => x._id === row.columns[3].value);
      let data = {
        dishName: row.columns[0].value,
        dishDescription: row.columns[1].value,
        defaultPrice: row.columns[2].value,
        dishId: row.columns[3].value,
      };
      // console.log('data is:', data);
      this.props.editDish(data);
    } else {
      // console.log('id not exists - New dish');
      let data = {
        dishName: row.columns[0].value,
        dishDescription: row.columns[1].value,
        defaultPrice: row.columns[2].value,
      };
      // console.log('data is:', data);
      this.props.addDish(data);
    }
    return true
  }

  onDelete(e) {
    // console.log('DishesManager | onDelete', e);
    // console.log('DishesManager | Dish', this.props.appData.data.dishes[e.rowId]);
    let Dish = this.props.appData.data.dishes[e.rowId];
    if (Dish) {
      this.props.deleteDish(e.rowId);
    }
  }

  exitPopup() {
    this.setState({
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false
    });
  }

  handleAddClick(data) {
    // console.log('DishesManager | handleAddClick | data', data);
    this.props.addDish(data);
    this.setState({
      showAddModal: false,
      selectedDish: 0
    });
  }

  handleEditClick(data) {
    // console.log('DishesManager | handleEditClick', this.state);
    this.props.editDish(data);
    this.setState({
      showEditModal: false,
      selectedDish: 0
    });
  }

  handleDeleteClick() {
    // console.log('DishesManager | handleDeleteClick', this.state.selectedDish);
    this.props.deleteDish(this.state.selectedDish);
    this.setState({
      showDeleteModal: false,
      selectedDish: 0
    });
  }

  openEditDish(data) {
    // console.log('DishesManager | editDish', data);
    this.setState({
      selectedDish: data,
      showEditModal: true
    });
  }

  openDeleteDish(data) {
    // console.log('DishesManager | deleteDish', data);
    this.setState({
      selectedDish: data,
      showDeleteModal: true
    });
  }

  openAddDish() {
    // console.log('DishesManager | addDish', this.state);
    this.setState({
      showAddModal: true
    });
  }

  render() {
    // console.log('DishesManager | render', this.state);
    // console.log('DishesManager | this.props.appData.data.dishes', this.props.appData.data.dishes);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    const style = {
      marginLeft: 20,
    };
    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.exitPopup}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDeleteClick}
      />,
    ];
    const headers = [
      {value: 'Name', type: 'TextField'},
      {value: 'Description', type: 'TextField'},
      {value: 'Price', type: 'TextField'},
    ];
    let rows = [];
    if (!this.props.appData.data.dishes) {
      // console.log('DishesManager | loading');
      return (
        <div id="dishes" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Dishes:</div>
          <div className="panel-body">
            <img src={src}/>
          </div>
        </div>
      );
    } else {
      this.props.appData.data.dishes.map((row, index) => {
        rows.push(
          {
            columns: [
              {value: row.name, field: 'name', width: 50},
              {value: row.description, field: 'description', width: 50},
              {value: row.defaultPrice, field: 'defaultPrice', width: 50},
              {value: row._id, field: 'id', hidden: true}
            ]
          }
        )
      });
      return (
        <div id="dishes" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Dishes:</div>
          <div className="panel-body">
            <EditTable
              onChange={this.onChange}
              onDelete={this.onDelete}
              rows={rows}
              headerColumns={headers}
              enableDelete={true}
            />
            {/*<Table>*/}
              {/*<TableHeader>*/}
                {/*<TableRow>*/}
                  {/*<TableHeaderColumn>ID</TableHeaderColumn>*/}
                  {/*<TableHeaderColumn>Name</TableHeaderColumn>*/}
                  {/*<TableHeaderColumn>Description</TableHeaderColumn>*/}
                  {/*<TableHeaderColumn>Price</TableHeaderColumn>*/}
                {/*</TableRow>*/}
              {/*</TableHeader>*/}
              {/*<TableBody showRowHover={true}>*/}
                {/*{this.props.appData.data.dishes.map((row, index) => (*/}
                  {/*<TableRow key={index}>*/}
                    {/*<TableRowColumn>{index}</TableRowColumn>*/}
                    {/*<TableRowColumn>{row.name}</TableRowColumn>*/}
                    {/*<TableRowColumn>{row.description}</TableRowColumn>*/}
                    {/*<TableRowColumn>{row.defaultPrice}</TableRowColumn>*/}
                  {/*</TableRow>*/}
                {/*))}*/}
              {/*</TableBody>*/}
            {/*</Table>*/}

            {/*<ListOfDishes dishes={this.props.appData.data.dishes}*/}
                          {/*editDish={this.openEditDish}*/}
                          {/*deleteDish={this.openDeleteDish}/>*/}
            {/*<Button onClick={this.openAddDish}>Add Dish</Button>*/}
            {/*<AddDish handleClick={this.handleAddClick} exit={this.exitPopup}*/}
                     {/*show={this.state.showAddModal}/>*/}
            {/*<EditDish*/}
              {/*dish={this.props.appData.data.dishes[this.state.selectedDish]}*/}
              {/*handleClick={this.handleEditClick}*/}
              {/*exit={this.exitPopup}*/}
              {/*show={this.state.showEditModal}*/}
            {/*/>*/}
            {/*<DeleteDish*/}
            {/*dish={this.props.appData.data.dishes[this.state.selectedDish]}*/}
            {/*handleClick={this.handleDeleteClick}*/}
            {/*exit={this.exitPopup}*/}
            {/*show={this.state.showDeleteModal}*/}
            {/*/>*/}
            {/*<Dialog*/}
              {/*title="Dialog With Actions"*/}
              {/*actions={deleteActions}*/}
              {/*modal={false}*/}
              {/*open={this.state.showDeleteModal}*/}
              {/*onRequestClose={this.exitPopup}*/}
              {/*children={DeleteDish}*/}
            {/*>*/}
              {/*<Table>*/}
                {/*<TableHeader>*/}
                  {/*<TableRow>*/}
                    {/*<TableHeaderColumn>Dish Name</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn>Dish Description</TableHeaderColumn>*/}
                  {/*</TableRow>*/}
                {/*</TableHeader>*/}
                {/*<TableBody>*/}
                  {/*<TableRow>*/}
                    {/*<TableRowColumn>{this.props.appData.data.dishes[this.state.selectedDish]['name']}</TableRowColumn>*/}
                    {/*<TableRowColumn>{this.props.appData.data.dishes[this.state.selectedDish]['description']}</TableRowColumn>*/}
                  {/*</TableRow>*/}
                {/*</TableBody>*/}
              {/*</Table>*/}
              {/*<Paper zDepth={2}>*/}
                {/*<TextField hintText="First name" style={style} underlineShow={false}/>*/}
                {/*<Divider />*/}
                {/*<TextField hintText="Middle name" style={style} underlineShow={false}/>*/}
                {/*<Divider />*/}
                {/*<TextField hintText="Last name" style={style} underlineShow={false}/>*/}
                {/*<Divider />*/}
                {/*<TextField hintText="Email address" style={style} underlineShow={false}/>*/}
                {/*<Divider />*/}
              {/*</Paper>*/}
              {/*<div>*/}
                {/*<div>Dish Name:*/}
                  {/*{this.props.appData.data.dishes[this.state.selectedDish]['name']}*/}
                {/*</div>*/}
                {/*<div>Dish Description:*/}
                  {/*{this.props.appData.data.dishes[this.state.selectedDish]['description']}*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*Are you sure you want to delete this dish?*/}
            {/*</Dialog>*/}
          </div>
        </div>
      );
    }
  }
}

DishesManager.propTypes = {
  appData: PropTypes.object,
  getDishes: PropTypes.func,
  addDish: PropTypes.func,
  editDish: PropTypes.func,
  deleteDish: PropTypes.func
};
export default DishesManager;
