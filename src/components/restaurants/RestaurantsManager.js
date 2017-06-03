/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListOfRestaurants from './ListOfRestaurants';
import './rests.styl';
import EditRestaurant from './EditRestaurant.js';
import DeleteRestaurant from './DeleteRestaurant.js';
import AddRestaurant from './AddRestaurant.js';
import {Button} from 'react-bootstrap';

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
  }

  componentDidMount() {
    // console.log('RestaurantsManager | componentDidMount', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
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
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.rests) {
      // console.log('RestaurantsManager | loading');
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <img src={src}/>
          </div>
        </div>
      );
    } else {
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <ListOfRestaurants rests={this.props.appData.data.rests}
                               editRest={this.editRest}
                               deleteRest={this.deleteRest}
            />
            {/*<a onClick={this.addRest} >Add restaurant</a>*/}
            <AddRestaurant handleClick={this.handleAddClick}
                           exit={this.exitPopup}
                           show={this.state.showAddModal}/>
            <Button onClick={this.addRest}>Add restaurant</Button>
            <DeleteRestaurant
              rest={this.props.appData.data.rests[this.state.selectedRes]}
              handleClick={this.handleDeleteClick}
              exit={this.exitPopup}
              show={this.state.showDeleteModal}
            />
            <EditRestaurant
              rest={this.props.appData.data.rests[this.state.selectedRes]}
              handleClick={this.handleEditClick}
              exit={this.exitPopup}
              show={this.state.showEditModal}
            />
          </div>
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
