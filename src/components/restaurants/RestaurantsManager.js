/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import ListOfRestaurants from './ListOfRestaurants';
import * as $ from 'jquery';
import './rests.styl';
import Popup from '../Popup/popup'
import EditRestaurant from './EditRestaurant.js'
import DeleteRestaurant from './DeleteRestaurant.js'
import AddRestaurant from './AddRestaurant.js'

class RestaurantsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rests: props.appData.rests || [],
      mode: 'main',
      selectedRes: null
    };
    this.editRest = this.editRest.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.getRests = this.getRests.bind(this);
    this.deleteRest = this.deleteRest.bind(this);
    this.addRest = this.addRest.bind(this);
  }

  componentDidMount() {
    console.log('RestaurantsManager | componentDidMount', this.props);
    // TODO: Ajax to load rests
    if (!this.props.appData.rests) {
      this.getRests(this.props.uid);
    }
  }

  exitPopup() {
    this.setState({
      mode: 'main'
    });
  };

  getRests() {
    // console.log("RestaurantsManager | getRests");
    // TODO: Ajax to fetch
    const options = {
      url: 'http://35.156.80.173/WebService1.asmx/getRestaurants',
      data: {
        user_Id: this.props.uid
      }
    };

    $.post(options, (data) => {
      const items = JSON.parse(data).items || [];
      // console.log('EditRestaurant | getRests data', data);
      // console.log('EditRestaurant | getRests items ', items);
      this.setState({
        rests: items
      });
      this.props.updateState({rests: items});

    });
  }

  deleteRest(data) {
    // TODO: Ajax to delete
    console.log('RestaurantsManager | deleteRest', data);
    this.setState({
      mode: 'delete',
      selectedRes: data
    });
  }

  handleClick() {
    // console.log('EditRestaurant | handleClick');
    this.setState({mode: 'main'});
    this.getRests();
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
    console.log('RestaurantsManager | addRest');
    this.setState({
      mode: 'add'
    });
  }

  render() {
    // console.log('Restaurants Manager | this.props', this.props);
    // console.log('Restaurants Manager | this.state', this.state);
    switch (this.state.mode) {
      case 'edit':
        return (
          <Popup exitPopup={this.exitPopup.bind(this)}>
            <EditRestaurant resId={this.state.rests[this.state.selectedRes]._id}
                            resName={this.state.rests[this.state.selectedRes].name}
                            resAddress={this.state.rests[this.state.selectedRes].address}
                            handleClick={this.handleClick.bind(this)}
            />
          </Popup>
        );
      case 'delete':
        return (
          <Popup exitPopup={this.exitPopup.bind(this)}>
            <DeleteRestaurant resId={this.state.rests[this.state.selectedRes]._id}
                              resName={this.state.rests[this.state.selectedRes].name}
                              resAddress={this.state.rests[this.state.selectedRes].address}
                              handleClick={this.handleClick.bind(this)}
            />
          </Popup>
        );
      case 'add':
        return (
          <Popup exitPopup={this.exitPopup.bind(this)}>
            <AddRestaurant handleClick={this.handleClick.bind(this)}/>
          </Popup>
        );
      default:
        return (
          <div id="rests">
            <span>
              Restaurants Manager
            </span>
            <ListOfRestaurants rests={this.state.rests} editRest={this.editRest} deleteRest={this.deleteRest}/>
            <div onClick={this.addRest}>Add restaurant </div>
          </div>
        );
    }
  }
}

export default RestaurantsManager;
