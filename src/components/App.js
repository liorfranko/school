/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import Menu from './menu/Menu';
import api from '../api/API'
import 'react-super-select/lib/react-super-select.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '5826fdc1680d800d2064d1da',
      data: {},
      loading: true
    };
     var restaurantId = null;

    this.updateRest = this.updateRest.bind(this);
    this.updateDishes = this.updateDishes.bind(this);
    this.updateMenus = this.updateMenus.bind(this);

    this.getRests = this.getRests.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.getMenus = this.getMenus.bind(this);

    this.deleteRest = this.deleteRest.bind(this);
    this.deleteDish = this.deleteDish.bind(this);

    this.addRest = this.addRest.bind(this);
    this.addDish = this.addDish.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);

    this.editDish = this.editDish.bind(this);
    this.editRest = this.editRest.bind(this);
    this.editRestMenu = this.editRestMenu.bind(this);
  }

  updateRest(data) {
    // console.log('App | updateRest data', data);
    const items = JSON.parse(data).items || [];
    // console.log('App | updateRest', items);
    this.setState({
      data: Object.assign({}, this.state.data, {rests: items}),
      loading: false
    });
  }

  updateDishes(data) {
    // console.log('App | updateDishes data', data);
    const items = JSON.parse(data).items || [];
    // console.log('App | updateDishes', items);
    this.setState({
      data: Object.assign({}, this.state.data, {dishes: items})
    });
  }

  updateMenus(data) {
    // console.log('App | updateMenus data', data);
    const items = JSON.parse(data).items || [];
    console.log('App | updateMenus items', items);
    console.log('App | updateMenus this.state.data.rests', this.state.data.rests);
    var restaurantId = {};
    items.map((menu, i) => {
      this.state.data.rests.map ((rest, i) => {
        if (rest._id === menu.restaurantId) {
          restaurantId = menu.restaurantId;
        }
      });
    });
    console.log('App | updateMenus restaurantId', restaurantId);
    var newArray = this.state.data.rests.slice();
    newArray.map((rest, i) => {
      console.log('App | updateMenus rest', rest);
      if (restaurantId === rest._id) {
        console.log('App | updateMenus ===');
        rest['menus'] = [];
        items.map((menu, i) => {
          rest['menus'].push(menu);
        });
        // this.setState({
        //   data: Object.assign({}, this.state.data, {rests: newArray})
        // });
      }
    });
      // this.setState({
      //   data: Object.assign({}, this.state.data, {rests: newArray})
      // });
    // items.map((menu, i) => {
    //   var newArray = this.state.data.rests.slice();
    //   newArray.map((rest, i) => {
    //     if (!rest['menus']) {
    //       rest['menus'] = []
    //     }
    //     if (rest._id === menu.restaurantId) {
    //       rest['menus'].push(menu);
    //     }
    //   });
    //   this.setState({
    //     data: Object.assign({}, this.state.data, {rests: newArray})
    //   });
    // });
  }

  getRests() {
    // console.log("App | getRests", this.state);
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

  getMenus(restaurant_Id) {
    // console.log("App | getMenus, restaurant_Id", restaurant_Id);
    // console.log("App | getMenus, this.restaurantId", this.restaurantId);
    // this.setState({loading: true});
    // this.restaurantId = restaurant_Id;
    var data = {};
    if (typeof this.restaurantId != 'undefined') {
      data = {
        restaurant_Id: this.restaurantId
      };
    } else {
      data = {
        restaurant_Id: restaurant_Id
      };
    }
    // console.log("App | getMenus, data", data);
    api.postRequest('getMenus', data, this.updateMenus);
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

  addRestMenu(data) {
    console.log('App | addRestMenu', data);
    // var postData = '&name=' + data.dishName + '&menu_id=' + data.dishDescription;
    // api.postRequest('addSubMenu', postData, this.getDishes);
  }

  editRest(data) {
    // console.log('App | editRest', data);
    this.setState({loading: true});
    var postData = '&restaurant_Id=' + data.resId + '&name=' + data.resName + '&address=' + data.resAddress;
    api.postRequest('editRestaurant', postData, this.getRests);
  }

  editDish(data) {
    // console.log('App | editDish', data);
    this.setState({loading: true});
    var postData = '&dish_Id=' + data.dishId + '&name=' + data.dishName + '&description=' + data.dishDescription + '&default_Price=' + data.defaultPrice;
    api.postRequest('editDish', postData, this.getDishes);

  }

  editRestMenu(data) {
    console.log('App | editRestMenu, data.restaurantId', data.restaurantId);
    var postData = '&menu_Id=' + data.restMenuId + '&name=' + data.restMenuName;
    this.restaurantId = data.restaurantId;
    api.postRequest('editMenu', postData, this.getMenus);
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
          getMenus: this.getMenus,
          addRest: this.addRest,
          addDish: this.addDish,
          addRestMenu: this.addRestMenu,
          editRest: this.editRest,
          editDish: this.editDish,
          editRestMenu: this.editRestMenu,
          deleteRest: this.deleteRest,
          deleteDish: this.deleteDish,
        }))}
        <div>Footer - links, & other shit</div>
      </div>
    )
  }

}

export
default
App;
