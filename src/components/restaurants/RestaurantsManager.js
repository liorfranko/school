/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import ListOfRestaurants from './ListOfRestaurants';
import './rests.styl';
import EditRestaurant from './EditRestaurant.js';
import DeleteRestaurant from './DeleteRestaurant.js';
import AddRestaurant from './AddRestaurant.js';
import {Button} from 'react-bootstrap';
import EditTable from '../../components/EditTable';

class RestaurantsManager extends React.Component {
  constructor(props) {
    // console.log('RestaurantsManager | constructor | props', props);
    super(props);
    this.state = {
      selectedRes: 0,
      selectedMenu: null,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false
    };
    this.editRest = this.editRest.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.deleteRest = this.deleteRest.bind(this);
    this.addRest = this.addRest.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);

  }

  componentDidMount() {
    // console.log('RestaurantsManager | componentDidMount', this.props);
    // alert(1);
    if (!this.props.appData.data.rests) {
      // alert(2);
      this.props.getRests();
    }
  }
  onChange(row) {
    // console.log('RestaurantsManager | onChange | row is:', row);
    for (let i = 0; i < row.columns.length; i++) {
      // console.log('DishesManager | onChange | row is: ', row.columns[i]);
      if (row.columns[i].id === 0) {
        // console.log('DishesManager | onChange | row is: name');
        if (row.columns[i].value === "") {
          // console.log('DishesManager | onChange | row is empty');
          alert('Name can\'t empty.');
          return false
        }
      }
    }
    if (row.columns[2]){
      // resName: '',
      //   resAddress: '',
      let data = {
        resName: row.columns[0].value,
        resAddress: row.columns[1].value,
        resId: row.columns[2].value,
      };
      // console.log('editRest data is:', data);
      this.props.editRest(data);
    } else {
      let data = {
        resName: row.columns[0].value,
        resAddress: row.columns[1].value,
      };
      // console.log('addRest data is:', data);
      this.props.addRest(data);
    }
    return true
  }

  onDelete(e) {
    // console.log('RestaurantsManager | onDelete', this.props.appData);
    let Rest = this.props.appData.data.rests[e.rowId];
    if (Rest) {
      this.props.deleteRest(e.rowId);
    }
  }
  exitPopup() {
    this.setState({
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedRes: 0
    });
  }


  handleDeleteClick() {
    // console.log('RestaurantsManager | handleDeleteClick', resNum);
    // console.log('RestaurantsManager | handleDeleteClick', this.state.selectedRes);
    this.props.deleteRest(this.state.selectedRes);
    this.setState({
      showDeleteModal: false,
      selectedRes: 0
    });
  }

  handleAddClick(data) {
    // console.log('RestaurantsManager | handleAddClick', this.state);
    this.props.addRest(data);
    this.setState({
      showAddModal: false,
      selectedRes: 0
    });
  }

  handleEditClick(data) {
    // console.log('RestaurantsManager | handleEditClick', this.state);
    this.props.editRest(data);
    this.setState({
      showEditModal: false,
      selectedRes: 0
    });
  }

  editRest(data) {
    // console.log('RestaurantsManager | editRest', data);
    this.setState({
      selectedRes: data,
      showEditModal: true
    });
  }

  addRest() {
    // console.log('RestaurantsManager | addRest');
    this.setState({
      showAddModal: true
    });
  }

  deleteRest(data) {
    // console.log('RestaurantsManager | deleteRest', data);
    this.setState({
      showDeleteModal: true,
      selectedRes: data
    });
  }

  render() {
    // console.log('Restaurants Manager | this.props', this.props);
    // console.log('Restaurants Manager | this.state', this.state);
    // const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    let rows = [];
    if (!this.props.appData.data.rests) {
      // console.log('RestaurantsManager | loading');
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      const headers = [
        {value: 'Name', type: 'TextField'},
        {value: 'Address', type: 'TextField'},
      ];
      this.props.appData.data.rests.map((row, index) => {
        rows.push(
          {
            columns: [
              {value: row.name, field: 'name', required: true},
              {value: row.address, field: 'description'},
              {value: row._id, field: 'id', hidden: true},
              {value: `/Admin/Restaurants/${row.name}`, field: 'Link', link: true, hidden: true}
            ]
          }
        )
      });
      // console.log('Restaurants Manager | rows', rows);
      return (
        <div>
          {this.props.children ? React.cloneElement(this.props.children, this.props) : (
            <div id="rests" className="panel panel-default">
              <div className="panel-heading" style={styleDiv}>Restaurants:</div>
              <div className="panel-body">
                <EditTable
                  onChange={this.onChange}
                  onDelete={this.onDelete}
                  rows={rows}
                  headerColumns={headers}
                  enableDelete={true}
                />
                {/*<ListOfRestaurants rests={this.props.appData.data.rests}*/}
                                   {/*editRest={this.editRest}*/}
                                   {/*deleteRest={this.deleteRest}*/}
                {/*/>*/}
                {/*<AddRestaurant handleClick={this.handleAddClick}*/}
                               {/*exit={this.exitPopup}*/}
                               {/*show={this.state.showAddModal}/>*/}
                {/*<Button onClick={this.addRest}>Add restaurant</Button>*/}
                {/*<DeleteRestaurant*/}
                  {/*rest={this.props.appData.data.rests[this.state.selectedRes]}*/}
                  {/*handleClick={this.handleDeleteClick}*/}
                  {/*exit={this.exitPopup}*/}
                  {/*show={this.state.showDeleteModal}*/}
                {/*/>*/}
                {/*<EditRestaurant*/}
                  {/*rest={this.props.appData.data.rests[this.state.selectedRes]}*/}
                  {/*handleClick={this.handleEditClick}*/}
                  {/*exit={this.exitPopup}*/}
                  {/*show={this.state.showEditModal}*/}
                {/*/>*/}
              </div>
            </div>
          )
          }
        </div>
      );
    }
  }
}
RestaurantsManager.propTypes = {
  appData: PropTypes.object,
  getRests: PropTypes.func,
  getDishes: PropTypes.func,
  getMenus: PropTypes.func,
  getSubMenus: PropTypes.func,
  getTables: PropTypes.func,
  addRest: PropTypes.func,
  addDish: PropTypes.func,
  addSubMenu: PropTypes.func,
  addTable: PropTypes.func,
  editRest: PropTypes.func,
  editDish: PropTypes.func,
  editRestMenu: PropTypes.func,
  editSubMenu: PropTypes.func,
  updateSubMenuDishes: PropTypes.func,
  editTable: PropTypes.func,
  deleteRest: PropTypes.func,
  deleteDish: PropTypes.func,
  deleteRestMenu: PropTypes.func,
  deleteSubMenu: PropTypes.func,
  deleteTable: PropTypes.func,
  params: PropTypes.object,
  publicDns: PropTypes.string
};
export default RestaurantsManager;
