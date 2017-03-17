/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import Menu from './menu/Menu';
import api from '../api/API'
import 'react-super-select/lib/react-super-select.css';
import update from 'immutability-helper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '5826fdc1680d800d2064d1da',
      data: {},
      loading: true
    };

    this.updateRest = this.updateRest.bind(this);
    this.updateDishes = this.updateDishes.bind(this);
    this.updateMenus = this.updateMenus.bind(this);
    this.updateSubMenus = this.updateSubMenus.bind(this);

    this.getRests = this.getRests.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.getMenus = this.getMenus.bind(this);
    this.getMenusLocal = this.getMenusLocal.bind(this);
    this.getSubMenus = this.getSubMenus.bind(this);
    this.getSubMenusLocal = this.getSubMenusLocal.bind(this);

    this.deleteRest = this.deleteRest.bind(this);
    this.deleteDish = this.deleteDish.bind(this);
    this.deleteRestMenu = this.deleteRestMenu.bind(this);
    this.deleteSubMenu = this.deleteSubMenu.bind(this);

    this.addRest = this.addRest.bind(this);
    this.addDish = this.addDish.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);
    this.addSubMenu = this.addSubMenu.bind(this);

    this.editDish = this.editDish.bind(this);
    this.editRest = this.editRest.bind(this);
    this.editRestMenu = this.editRestMenu.bind(this);
    this.editSubMenu = this.editSubMenu.bind(this);
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
    // Problem:
    // When loading menus and menus list is empty, How can I get the restaurant ID.
    // console.log('App | updateMenus data', data);
    // console.log('App | updateMenus this.state.data', this.state.data);
    const items = JSON.parse(data).items || [];
    // console.log('App | updateMenus items.length()', items.length);
    var arrayVar = this.state.data.rests.slice();
    // var index;
    if (items.length > 0) {
      arrayVar.map((rest, i) => {
        if (rest._id === items[0].restaurantId) {
          // index = i;
          var curRestArray = this.state.data.rests[i];
          curRestArray.menus = items;
          let newRestArray = update(this.state.data.rests, {
            [i]: {$set: curRestArray}
          });
          this.setState({
            data: Object.assign({}, this.state.data, {rests: newRestArray})
          });
        }
      });
    } else {
      var restId = JSON.parse(data).reason;
      // console.log('App | updateMenus restId', restId);
      // console.log('App | updateMenus this.state.data.rests', this.state.data.rests);
      // var curRestArray = this.state.data.rests.indexOf(restId);
      var index = this.state.data.rests.findIndex(x => x._id == restId);
      // console.log('App | updateMenus index', index);
      var curRestArray = this.state.data.rests[index];
      curRestArray.menus = items;
      let newRestArray = update(this.state.data.rests, {
        [index]: {$set: curRestArray}
      });
      this.setState({
        data: Object.assign({}, this.state.data, {rests: newRestArray})
      });
    }
  }

  updateSubMenus(data) {
    const items = JSON.parse(data).items || [];
    // console.log('App | updateSubMenus items', items);
    // console.log('App | updateSubMenus items.length()', items.length);
    // console.log('App | updateSubMenus this.state.data', this.state.data);


    var arrayVar = this.state.data.rests.slice();
    if (items.length > 0) {
      arrayVar.map((rest, restIndex) => {
        // console.log('App | updateSubMenus rest', rest);
        if (rest.menus) {
          rest.menus.map((menu, menuIndex) => {
            // console.log('App | updateSubMenus menu', menu);
            let curMenusArray = this.state.data.rests[restIndex].menus[menuIndex];
            // console.log('App | updateSubMenus curMenusArray', curMenusArray);
            curMenusArray.subMenus = items;
            // console.log('App | updateSubMenus curMenusArray', curMenusArray);
            let newMenusArray = update(this.state.data.rests[restIndex], {
              [menuIndex]: {$set: curMenusArray}
            });
            // console.log('App | updateSubMenus newMenusArray', newMenusArray);
            var curRestArray = this.state.data.rests[restIndex];
            let newRestArray = update(this.state.data.rests, {
              [restIndex]: {$set: curRestArray}
            });
            // console.log('App | updateSubMenus newRestArray', newRestArray);
            this.setState({
              data: Object.assign({}, this.state.data, {rests: newRestArray})
            });
          })
        }
      });
    }

    // var index;
    // if (items.length > 0) {
    //   arrayVar.map((rest, i) => {
    //     if (rest._id === items[0].restaurantId) {
    //       // index = i;
    //       var curRestArray = this.state.data.rests[i];
    //       curRestArray.menus = items;
    //       let newRestArray = update(this.state.data.rests, {
    //         [i]: {$set: curRestArray}
    //       });
    //       this.setState({
    //         data: Object.assign({}, this.state.data, {rests: newRestArray})
    //       });
    //     }
    //   });
    // } else {
    //   var restId = JSON.parse(data).reason;
    //   // console.log('App | updateMenus restId', restId);
    //   // console.log('App | updateMenus this.state.data.rests', this.state.data.rests);
    //   // var curRestArray = this.state.data.rests.indexOf(restId);
    //   var index = this.state.data.rests.findIndex(x => x._id==restId);
    //   // console.log('App | updateMenus index', index);
    //   var curRestArray = this.state.data.rests[index];
    //   curRestArray.menus = items;
    //   let newRestArray = update(this.state.data.rests, {
    //     [index]: {$set: curRestArray}
    //   });
    //   this.setState({
    //     data: Object.assign({}, this.state.data, {rests: newRestArray})
    //   });
    // }
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

  getMenusLocal(restaurant_Id) {
    console.log("App | getMenus, restaurant_Id", restaurant_Id);
    // console.log("App | getMenus, this.restaurantId", this.restaurantId);
    //1.
    //  const that = this;
    //2. bind the function

    // 3. call function
    // 4. apply function


    return function () {
      var data = {
        restaurant_Id: restaurant_Id
      };
      console.log("App | getMenus, data", data);
      api.postRequest('getMenus', data, this.updateMenus);
    }.bind(this)
  }

  getMenus(restaurant_Id) {
    // console.log("App | getMenus, restaurant_Id", restaurant_Id);
    var data = {
      restaurant_Id: restaurant_Id
    };
    // console.log("App | getMenus, data", data);
    api.postRequest('getMenus', data, this.updateMenus);
  }

  getSubMenusLocal(menuId) {
    console.log("App | getSubMenusLocal, menuId", menuId);
    // console.log("App | getMenus, this.restaurantId", this.restaurantId);
    //1.
    //  const that = this;
    //2. bind the function

    // 3. call function
    // 4. apply function


    return function () {
      var data = {
        menu_id: menuId
      };
      console.log("App | getSubMenusLocal, data", data);
      api.postRequest('getSubMenus', data, this.updateSubMenus);
    }.bind(this)
  }

  getSubMenus(menuId) {
    console.log('App | getSubMenus | menuId', menuId);
    console.log('App | getSubMenus | this.state', this.state);
    const data = {
      menu_id: menuId
    };
    api.postRequest('getSubMenus', data, this.updateSubMenus);
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

  deleteRestMenu(data) {
    console.log('App | deleteRestMenu', data);
    var postData = '&restaurant_Id=' + data.restaurantId + '&menu_id=' + data._id;
    api.postRequest('removeMenu', postData, this.getMenusLocal(data.restaurantId));
  }

  deleteSubMenu(data) {
    console.log('App | deleteSubMenu', data);
    let postData = '&subMenu_Id=' + data.subMenuId + '&menu_Id=' + data.menuId;
    api.postRequest('removeSubMenu', postData, this.getSubMenusLocal(data.menuId));
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
    // this.postDataToServer('addDish', '&user_Id=5826fdc1680d800d2064d1da&name=' + this.state['dishName'] + '&description='+this.state['dishDescription'] + '&default_price='+this.state['defaultPrice'])
    var postData = '&name=' + data.dishName + '&description=' + data.dishDescription + '&user_Id=' + this.state.uid + '&default_Price=' + data.defaultPrice;
    api.postRequest('addDish', postData, this.getDishes);
  }

  addRestMenu(data, restId) {
    console.log('App | addRestMenu', data, restId);
    var postData = '&name=' + data.resMenuName + '&restaurant_Id=' + restId;
    api.postRequest('addMenu', postData, this.getMenusLocal(restId));
  }

  addSubMenu(menuId, menuName) {
    console.log('App | menuId', menuId);
    console.log('App | menuName', menuName);
    var postData = '&menu_Id=' + menuId + '&name=' + menuName;
    api.postRequest('addSubMenu', postData, this.getSubMenusLocal(menuId));
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

  editSubMenu(data) {
    console.log('App | editSubMenu, data', data);

  }

  render() {
    // console.log('App.js | this.state', this.state);
    // console.log('App.js | this.props.params', this.props.params);
    // console.log('App.js | this.props.children', this.props.children);
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <Menu menu={[
              {name: 'homepage', path: '/'}, {name: 'rests', path: 'rests'}, {name: 'dishes', path: 'dishes'}
            ]}/>
          </div>
        </nav>
        <div className="jumbotron">
          <div className="container">
            <h1>Header - Logo + Menu</h1>
            {React.Children.map(this.props.children, (child) => React.cloneElement(child, {
              appData: this.state,
              getRests: this.getRests,
              getDishes: this.getDishes,
              getMenus: this.getMenus,
              getSubMenus: this.getSubMenus,
              addRest: this.addRest,
              addDish: this.addDish,
              addSubMenu: this.addSubMenu,
              addRestMenu: this.addRestMenu,
              editRest: this.editRest,
              editDish: this.editDish,
              editRestMenu: this.editRestMenu,
              editSubMenu: this.editSubMenu,
              deleteRest: this.deleteRest,
              deleteDish: this.deleteDish,
              deleteRestMenu: this.deleteRestMenu,
              deleteSubMenu: this.deleteSubMenu,
            }))}
            <footer>Footer - links, & other shit</footer>
          </div>
        </div>
      </div>
    )
  }

}

export
default
App;
