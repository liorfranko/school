/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';

import ListOfRestaurants from './ListOfRestaurants';
import './rests.styl';
import Popup from '../Popup/popup';
import EditRestaurant from './EditRestaurant.js';
import DeleteRestaurant from './DeleteRestaurant.js';
import AddRestaurant from './AddRestaurant.js';
import Restaurant from './Restaurant'
import { Button } from 'react-bootstrap';

class RestaurantsManager extends React.Component {
  constructor(props) {
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
    this.openRest = this.openRest.bind(this);
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
      showDeleteModal: false
    });
  };



  handleDeleteClick() {
    // console.log('RestaurantsManager | handleDeleteClick', resNum);
    console.log('RestaurantsManager | handleDeleteClick', this.state.selectedRes);
    this.props.deleteRest(this.state.selectedRes);
    this.setState({showDeleteModal: false});
  }

  handleAddClick(data) {
    // console.log('RestaurantsManager | handleAddClick', this.state);
    this.props.addRest(data);
    this.setState({showAddModal: false});
  }

  handleEditClick(data) {
    // console.log('RestaurantsManager | handleEditClick', this.state);
    this.props.editRest(data);
    this.setState({showEditModal: false});
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

  openRest(data) {
    // console.log('RestaurantsManager | openRest, data', data);
    this.setState({
      mode: 'restaurant',
      selectedRes: data
    });
  }
  render() {
    // console.log('Restaurants Manager | this.props', this.props);
    // console.log('Restaurants Manager | this.state', this.state);
    if (!this.props.appData.data.rests) {
      // console.log('RestaurantsManager | loading');
      return (
        <div>Loading</div>
      )
    } else {
      let styleDiv = {
        fontSize: '30'
      };
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants Manager</div>
          <div className="panel-body">
            <ListOfRestaurants rests={this.props.appData.data.rests}
                               editRest={this.editRest}
                               deleteRest={this.deleteRest}
                               openRest={this.openRest}/>
            {/*<a onClick={this.addRest} >Add restaurant</a>*/}
            <AddRestaurant handleClick={this.handleAddClick.bind(this)}
                           exit={this.exitPopup.bind(this)}
                           show={this.state.showAddModal}/>
            <Button onClick={this.addRest}>Add restaurant</Button>
            <DeleteRestaurant resId={this.props.appData.data.rests[this.state.selectedRes]._id}
                              resName={this.props.appData.data.rests[this.state.selectedRes].name}
                              resAddress={this.props.appData.data.rests[this.state.selectedRes].address}
                              handleClick={this.handleDeleteClick.bind(this)}
                              exit={this.exitPopup.bind(this)}
                              show={this.state.showDeleteModal}
            />
            <EditRestaurant resId={this.props.appData.data.rests[this.state.selectedRes]._id}
                            resName={this.props.appData.data.rests[this.state.selectedRes].name}
                            resAddress={this.props.appData.data.rests[this.state.selectedRes].address}
                            handleClick={this.handleEditClick.bind(this)}
                            exit={this.exitPopup.bind(this)}
                            show={this.state.showEditModal}
            />
          </div>
        </div>

      );
    }

  }
}

export default RestaurantsManager;
