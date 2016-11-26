/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import Menu from './menu/Menu';
import api from '../api/API'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '5826fdc1680d800d2064d1da',
      data: {},
      loading: true
    };

    // this.updateState = this.updateState.bind(this);
    this.updateRest = this.updateRest.bind(this);
    this.updateDishes = this.updateDishes.bind(this);
    this.getRests = this.getRests.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.deleteRest = this.deleteRest.bind(this);
    this.addRest = this.addRest.bind(this);
    this.editRest = this.editRest.bind(this);
    this.addDish = this.addDish.bind(this);
    this.deleteDish = this.deleteDish.bind(this);
    this.editDish = this.editDish.bind(this);
  }

  updateRest(data) {
    // console.log('App | updateRest data', data);
    const items = JSON.parse(data).items || [];
    // console.log('App | updateRest', items);
    this.setState({
      data: {rests: items},
      loading: false
    });

  }
  updateDishes(data) {
    // console.log('App | updateDishes data', data);
    const items = JSON.parse(data).items || [];
    // console.log('App | updateDishes', items);
    this.setState({
      data: {dishes: items},
      loading: false
    });

  }


  getRests() {
    // console.log("App | getRests");
    this.setState({loading: true});
    var data = {
      user_Id: this.state.uid
    };
    api.postRequest('getRestaurants', data, this.updateRest);
  }

  getDishes() {
    // console.log("App | getDishes");
    this.setState({loading: true});
    var data = {
      user_Id: this.state.uid
    };
    api.postRequest('getDishes', data, this.updateDishes);
  }

  editRest(data) {
    // console.log('App | editRest', data);
    this.setState({loading: true});
    var postData = '&restaurant_Id=' + data.resId + '&name=' + data.resName + '&address=' + data.resAddress;
    api.postRequest('editRestaurant', postData, this.getRests);
  }

  addRest(data) {
    // console.log('App | addRest', data);
    this.setState({loading: true});
    var postData = '&name=' + data.resName + '&address=' + data.resAddress + '&user_Id=' + this.state.uid;
    api.postRequest('addRestaurant', postData, this.getRests);
  }

  addDish(data) {
    // console.log('App | addDish', data);
    this.setState({loading: true});
    // this.postDataToServer('addDish', '&user_Id=5826fdc1680d800d2064d1da&name=' + this.state['dishName'] + '&description='+this.state['dishDescription'] + '&defaultPrice='+this.state['defaultPrice'])
    var postData = '&name=' + data.dishName + '&description=' + data.dishDescription + '&user_Id=' + this.state.uid + '&defaultPrice=' + data.defaultPrice;
    api.postRequest('addDish', postData, this.getDishes);
  }

  deleteDish(dishNum) {
    // console.log('App | deleteDish', this.state.data.dishes);
    this.setState({loading: true});
    var postData = '&dish_Id=' + this.state.data.dishes[dishNum]._id + '&user_Id=' + this.state.uid;
    api.postRequest('removeDish', postData, this.getDishes);
    // this.postDataToServer('removeDish', '&dish_Id=' + this.props['dishId'] + '&user_Id=5826fdc1680d800d2064d1da');
  }
  deleteRest(restNum) {
    // console.log('App | deleteRest', restNum);
    this.setState({loading: true});
    var postData = '&restaurant_Id=' + this.state.data.rests[restNum]._id + '&user_Id=' + this.state.uid;
    api.postRequest('removeRestaurant', postData, this.getRests);
  }

  editDish(data) {
    // console.log('App | editDish', data);
    this.setState({loading: true});
    var postData = '&dish_Id=' + data.dishId + '&name=' + data.dishName + '&description=' + data.dishDescription + '&default_Price=' + data.defaultPrice;
    api.postRequest('editDish', postData, this.getDishes);
    // this.postDataToServer('editDish', '&dish_Id=' + this.state['dishId'] + '&name=' + this.state['dishName'] + '&description='+this.state['dishDescription'] + '&default_Price='+this.state['defaultPrice'])

  }

  render() {
    // console.log('App.js | this.state', this.state);
    return (
      <div className="container">
        <div>Header - Logo + Menu</div>
        <Menu menu={[
          {name: 'homepage', path: '/'}, {name: 'rests', path: 'rests'}, {name: 'dishes', path: 'dishes'}
        ]}/>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child, {
          appData: this.state,
          getRests: this.getRests,
          getDishes: this.getDishes,
          deleteRest: this.deleteRest,
          addRest: this.addRest,
          editRest: this.editRest,
          addDish: this.addDish,
          deleteDish: this.deleteDish,
          editDish: this.editDish,
        }))}
        <div>Footer - links, & other shit</div>
      </div>
    )
  }

}

export
default
App;
