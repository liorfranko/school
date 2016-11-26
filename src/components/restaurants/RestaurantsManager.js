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
import MorningMenu from '../restMenu/morningMenu';


class RestaurantsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'main',
      selectedRes: null
    };
    this.editRest = this.editRest.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleMorningClick = this.handleMorningClick.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.deleteRest = this.deleteRest.bind(this);
    this.addRest = this.addRest.bind(this);
    this.editMorningMenu = this.editMorningMenu.bind(this);
  }

  componentDidMount() {
    // console.log('RestaurantsManager | componentDidMount', this.props);
    // TODO: Ajax to load rests
    if (!this.props.appData.rests) {
      this.props.getRests();
      // this.getRests(this.props.uid);
    }
  }

  exitPopup() {
    this.setState({
      mode: 'main'
    });
  };

  deleteRest(data) {
    // TODO: Ajax to delete
    // console.log('RestaurantsManager | deleteRest', data);
    this.setState({
      mode: 'delete',
      selectedRes: data
    });
  }

  handleDeleteClick() {
    // console.log('RestaurantsManager | handleDeleteClick', resNum);
    console.log('RestaurantsManager | handleDeleteClick', this.state.selectedRes);
    this.props.deleteRest(this.state.selectedRes);
    this.setState({mode: 'main'});
  }

  handleAddClick(data) {
    // console.log('RestaurantsManager | handleAddClick', this.state);
    this.props.addRest(data);
    this.setState({mode: 'main'});
  }

  handleEditClick(data) {
    // console.log('RestaurantsManager | handleEditClick', this.state);
    this.props.editRest(data);
    this.setState({mode: 'main'});
  }

  handleMorningClick(data) {
    console.log('RestaurantsManager | handleMorningClick', this.state);
    // this.props.editRest(data);
    // this.setState({mode: 'main'});
  }

  editRest(data) {
    // TODO: Ajax to edit
    // console.log('RestaurantsManager | editRest', data);
    this.setState({
      mode: 'edit',
      selectedRes: data
    });
  }

  addRest() {
    // console.log('RestaurantsManager | addRest');
    this.setState({
      mode: 'add'
    });
  }

  editMorningMenu() {
    console.log('RestaurantsManager | editMorningMenu');
    this.setState({
      mode: 'editMorningMenu'
    });
  }

  render() {
    console.log('Restaurants Manager | this.props', this.props);
    // console.log('Restaurants Manager | this.state', this.state);

    if (!this.props.appData.data.rests) {
      console.log('RestaurantsManager | loading');
      return (
        <div>Loading</div>
      )
    } else {
      switch (this.state.mode) {
        case 'edit':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <EditRestaurant resId={this.props.appData.data.rests[this.state.selectedRes]._id}
                              resName={this.props.appData.data.rests[this.state.selectedRes].name}
                              resAddress={this.props.appData.data.rests[this.state.selectedRes].address}
                              handleClick={this.handleEditClick.bind(this)}
              />
            </Popup>
          );
        case 'delete':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <DeleteRestaurant resId={this.props.appData.data.rests[this.state.selectedRes]._id}
                                resName={this.props.appData.data.rests[this.state.selectedRes].name}
                                resAddress={this.props.appData.data.rests[this.state.selectedRes].address}
                                handleClick={this.handleDeleteClick.bind(this)}
              />
            </Popup>
          );
        case 'add':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <AddRestaurant handleClick={this.handleAddClick.bind(this)}/>
            </Popup>
          );
        case 'editMorningMenu':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <MorningMenu handleClick={this.handleMorningClick.bind(this)} restManagerData={this.props}/>
            </Popup>
          );
        default:
          return (
            <div id="rests">
            <span>
              Restaurants Manager
            </span>
              <ListOfRestaurants rests={this.props.appData.data.rests} editRest={this.editRest}
                                 deleteRest={this.deleteRest} editMorningMenu={this.editMorningMenu}/>
              <div onClick={this.addRest}>Add restaurant</div>
            </div>
          );
      }
    }

  }
}

export default RestaurantsManager;
