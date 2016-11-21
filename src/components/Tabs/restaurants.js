import React from 'react';
import ShowRestaurants from './showRestaurants';
import EditRestaurant from './editRestaurant';
import AddRestaurant from './addRestaurant';
import DeleteRestaurant from './deleteRestaurant';
import Popup from './../Popup/popup';

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'showList',
      selectedRes: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.getResIndexByResId = this.getResIndexByResId.bind(this);
  }

  handleClick(data) {
    //console.log(data);
    var newState = {
      mode: data.type,
      resId: data.resId
    };
    this.setState(newState);
  }

  exitPopup() {
    // console.log('close');
    var newState = {
      mode: 'showList'
    };
    this.setState(newState);
  };

  handleAddClick () {
    console.log('handleAddClick');
    this.setState({mode: 'showList'});
    this.props.updateState();
  }

  handleDeleteClick() {
    console.log('handleDeleteClick');
    this.setState({mode: 'showList'});
    this.props.updateState();
  }

  handleEditClick() {
    console.log('handleEditClick');
    this.setState({mode: 'showList'});
    this.props.updateState();
  }

  getResIndexByResId(id) {
    var index = null;
    this.props.parentData.resList.items.map((resData, i) => {
      if (resData['_id'] == id) {
        index = i;
      }
    });
    return index;
  }

  render() {
    if (this.props['parentData'].loading) {
      return (
        <div>Loading</div>
      );
    } else {
      console.log(this.props);
      var index;
      var restaurant;
      index = this.getResIndexByResId(this.state.resId);
      restaurant = this.props.parentData.resList.items[index];
      switch (this.state['mode']) {
        case 'showList':
          return (<ShowRestaurants restaurants={this.props.parentData.resList.items} handleClick={this.handleClick.bind(this)}/>);
        case 'add':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <AddRestaurant handleClick={this.handleAddClick.bind(this)}/>
            </Popup>
          );
        case 'edit':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <EditRestaurant resId={restaurant['_id']}
                              resName={restaurant['name']}
                              resAddress={restaurant['address']}
                              handleClick={this.handleEditClick.bind(this)}
              />
            </Popup>
          );
        case 'delete':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <DeleteRestaurant resId={restaurant['_id']}
                                resName={restaurant['name']}
                                resAddress={restaurant['address']}
                                handleClick={this.handleDeleteClick.bind(this)}
              />
            </Popup>
          );
      }
    }

  }
}
export default Restaurants;

