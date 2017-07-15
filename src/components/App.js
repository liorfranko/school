/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import Image from 'react'
// import StyleSheet from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import api from '../api/API';
import 'react-super-select/lib/react-super-select.css';
import update from 'immutability-helper';
import {browserHistory} from 'react-router';
import LoginHOC from 'react-facebook-login-hoc';
import Breadcrumbs  from 'react-breadcrumbs';
import PropTypes from 'prop-types';
import { Drawer, AppBar, MenuItem, IconMenu, IconButton, FlatButton} from 'material-ui'
import Header from './header'

const configureLoginProps = {
  appId: '756445047848860',
  scope: 'public_profile, email',
  xfbml: true,
  cookie: false,
  version: 2.8,
  language: 'en_US'
};
const userUid = '999999';
const publicDns = 'ec2-35-156-35-110.eu-central-1.compute.amazonaws.com';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.status = this.props.fb.status;
    this.login = this.props.fb.login;
    this.logout = this.props.fb.logout;
    this.state = {
      priv: 'user',
      uid: null,
      status: 'unknown',
      facebook_id: null,
      token: null,
      data: {},
      topen: false,
      logged: false,
    };


    this.goBack = this.goBack.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goForward = this.goForward.bind(this);

    this.updateRest = this.updateRest.bind(this);
    this.updateDishes = this.updateDishes.bind(this);
    this.updateMenus = this.updateMenus.bind(this);
    this.updateSubMenus = this.updateSubMenus.bind(this);
    this.updateTables = this.updateTables.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.updateAllRests = this.updateAllRests.bind(this);
    this.updateOrders = this.updateOrders.bind(this);

    this.getRests = this.getRests.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.getDishesUid = this.getDishesUid.bind(this);
    this.getMenus = this.getMenus.bind(this);
    this.getMenusLocal = this.getMenusLocal.bind(this);
    this.getSubMenus = this.getSubMenus.bind(this);
    this.getSubMenusLocal = this.getSubMenusLocal.bind(this);
    this.getTables = this.getTables.bind(this);
    this.getTablesLocal = this.getTablesLocal.bind(this);
    this.getAllRests = this.getAllRests.bind(this);
    this.getOrdersByTableId = this.getOrdersByTableId.bind(this);


    this.deleteRest = this.deleteRest.bind(this);
    this.deleteDish = this.deleteDish.bind(this);
    this.deleteRestMenu = this.deleteRestMenu.bind(this);
    this.deleteSubMenu = this.deleteSubMenu.bind(this);
    this.deleteTable = this.deleteTable.bind(this);

    this.addRest = this.addRest.bind(this);
    this.addDish = this.addDish.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);
    this.addSubMenu = this.addSubMenu.bind(this);
    this.addTable = this.addTable.bind(this);
    this.addOrder = this.addOrder.bind(this);

    this.editDish = this.editDish.bind(this);
    this.editRest = this.editRest.bind(this);
    this.editRestMenu = this.editRestMenu.bind(this);
    this.editSubMenu = this.editSubMenu.bind(this);
    this.updateSubMenuDishes = this.updateSubMenuDishes.bind(this);
    this.editOrderDishes = this.editOrderDishes.bind(this);
    this.editOrderSumPaid = this.editOrderSumPaid.bind(this);
    this.editTable = this.editTable.bind(this);

    this.checkFacebookID = this.checkFacebookID.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.responseApi = this.responseApi.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.logoutFacebook = this.logoutFacebook.bind(this);
    this.userLogin = this.userLogin.bind(this);

  }

  handleToggle() {
    this.setState({open: !this.state.open});
    // console.log("open")
  }
  handleClose(path) {
    browserHistory.push(path);
    this.setState({open: false});
  }


  goBack() {
    browserHistory.goBack();
  }

  goForward() {
    browserHistory.goForward();
  }

  updateRest(data) {
    // console.log('App | updateRest data', data.items);
    const items = data.items || [];
    // console.log('App | updateRest', items);
    this.setState({
      data: Object.assign({}, this.state.data, {rests: items})
      // loading: false
    });
  }

  updateDishes(data) {
    // console.log('App | updateDishes data', data);
    const items = data.items || [];
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
    const items = data.items || [];
    // console.log('App | updateMenus items.length()', items.length);
    let arrayVar = this.state.data.rests.slice();
    if (items.length > 0) {
      arrayVar.map((rest, i) => {
        if (rest._id === items[0].restaurantId) {
          // index = i;
          let curRestArray = this.state.data.rests[i];
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
      let restId = data.reason;
      // console.log('App | updateMenus restId', restId);
      // console.log('App | updateMenus this.state.data.rests', this.state.data.rests);
      let index = this.state.data.rests.findIndex(x => x._id == restId);
      // console.log('App | updateMenus index', index);
      let curRestArray = this.state.data.rests[index];
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
    const items = data.items || [];
    // console.log('App | updateSubMenus items', items);
    // console.log('App | updateSubMenus items.length()', items.length);
    // console.log('App | updateSubMenus this.state.data', this.state.data);


    let arrayVar = this.state.data.rests.slice();
    if (items.length > 0) {
      let menuId = items[0].menuId;
      // console.log('App | menuId', menuId);
      arrayVar.map((rest, restIndex) => {
        // console.log('App | updateSubMenus rest', rest);
        if (rest.menus) {
          rest.menus.map((menu, menuIndex) => {
            // console.log('App | updateSubMenus menu', menu);
            if (menu._id === menuId) {
              let curMenusArray = this.state.data.rests[restIndex].menus[menuIndex];
              // console.log('App | updateSubMenus curMenusArray', curMenusArray);
              curMenusArray.subMenus = items;
              // console.log('App | updateSubMenus curMenusArray', curMenusArray);
              let curRestArray = this.state.data.rests[restIndex];
              let newRestArray = update(this.state.data.rests, {
                [restIndex]: {$set: curRestArray}
              });
              // console.log('App | updateSubMenus newMenusArray', newMenusArray);
              // console.log('App | updateSubMenus newRestArray', newRestArray);
              this.setState({
                data: Object.assign({}, this.state.data, {rests: newRestArray})
              });
            }
          });
        }
      });
    }
    // console.log('App | updateSubMenus this.state.data', this.state.data);
  }

  updateTables(data) {
    // Problem:
    // When loading menus and menus list is empty, How can I get the restaurant ID.
    // console.log('App | updateTables data', data);
    // console.log('App | updateTables this.state.data', this.state.data);
    const items = data.items || [];
    // console.log('App | updateTables items.length()', items.length);
    let arrayVar = this.state.data.rests.slice();
    if (items.length > 0) {
      arrayVar.map((rest, i) => {
        if (rest._id === items[0].restaurantId) {
          // index = i;
          let curRestArray = this.state.data.rests[i];
          curRestArray.tables = items;
          let newRestArray = update(this.state.data.rests, {
            [i]: {$set: curRestArray}
          });
          this.setState({
            data: Object.assign({}, this.state.data, {rests: newRestArray})
          });
        }
      });
    } else {
      let restId = data.reason;
      // console.log('App | updateMenus restId', restId);
      // console.log('App | updateMenus this.state.data.rests', this.state.data.rests);
      let index = this.state.data.rests.findIndex(x => x._id == restId);
      // console.log('App | updateMenus index', index);
      let curRestArray = this.state.data.rests[index];
      curRestArray.tables = items;
      let newRestArray = update(this.state.data.rests, {
        [index]: {$set: curRestArray}
      });
      this.setState({
        data: Object.assign({}, this.state.data, {rests: newRestArray})
      });
    }
  }

  updateLogin(data) {
    // console.log('App | updateLogin data', data);
    // const items = data.items || [];
    if (data.status == 'Success') {
      // console.log('App | updateLogin Success');
      this.setState({
        uid: data.items._id
      });
    } else {
      // console.log('App | updateLogin Failed');
      this.addUser();
    }

  }

  updateAllRests(data) {
    // console.log('App | updateAllRests data', data.items);
    const items = data.items || [];
    // console.log('App | updateAllRests', items);
    this.setState({
      data: Object.assign({}, this.state.data, {rests: items})
    });
  }

  updateOrders(data) {
    // Problem:
    // When loading menus and menus list is empty, How can I get the restaurant ID.
    // console.log('App | updateOrders data', data);
    // console.log('App | updateOrders this.state.data', this.state.data);
    const items = data.items || [];
    // console.log('App | updateOrders items.length()', items.length);
    let arrayVar = this.state.data.rests.slice();
    if (items.length > 0) {
      arrayVar.map((rest, restIndex) => {
        // console.log('App |  updateOrders | rest', rest);
        if (rest.tables) {
          let arrayTables = rest.tables.slice();
          arrayTables.map((table, tableIndex) => {
            // console.log('App |  updateOrders | table', table);
            if (table._id == items[0].tableId) {
              // console.log('App | updateOrders | table._id', table._id);
              let curTablesArray = this.state.data.rests[restIndex].tables[tableIndex];
              curTablesArray.orders = items;
              let curRestArray = this.state.data.rests[restIndex];
              let newRestArray = update(this.state.data.rests, {
                [restIndex]: {$set: curRestArray}
              });
              this.setState({
                data: Object.assign({}, this.state.data, {rests: newRestArray})
              });
            }
          });
        }
      });
    } else {
      let tableId = data.reason;
      // console.log('App | updateOrders | tableId', tableId);
      arrayVar.map((rest, restIndex) => {
        // console.log('App | updateOrders | rest', rest);
        if (rest.tables) {
          let arrayTables = rest.tables.slice();
          arrayTables.map((table, tableIndex) => {
            // console.log('App |  updateOrders | table', table);
            if (tableId === table._id) {
              let curTablesArray = this.state.data.rests[restIndex].tables[tableIndex];
              curTablesArray.orders = items;
              let curRestArray = this.state.data.rests[restIndex];
              let newRestArray = update(this.state.data.rests, {
                [restIndex]: {$set: curRestArray}
              });
              this.setState({
                data: Object.assign({}, this.state.data, {rests: newRestArray})
              });
            }
          });
        }
      });
    }
  }

  getRests() {
    // console.log("App | getRests", this.state);
    // this.setState({loading: true});
    // alert(3);
    let data = {
      user_Id: this.state.uid
    };
    api.postRequest('getRestaurants', data, this.updateRest);
  }

  getDishes() {
    // console.log("App | getDishes");
    // this.setState({loading: true});
    let data = {
      user_Id: this.state.uid
    };
    api.postRequest('getDishes', data, this.updateDishes);
  }

  getDishesUid(user_Id) {
    // console.log("App | getDishesUid");
    // this.setState({loading: true});
    let data = {
      user_Id: user_Id
    };
    api.postRequest('getDishes', data, this.updateDishes);
  }

  getMenusLocal(restaurant_Id) {
    // console.log("App | getMenus, restaurant_Id", restaurant_Id);
    // console.log("App | getMenus, this.restaurantId", this.restaurantId);
    //1.
    //  const that = this;
    //2. bind the function

    // 3. call function
    // 4. apply function


    return function () {
      let data = {
        restaurant_Id: restaurant_Id
      };
      // console.log("App | getMenus, data", data);
      api.postRequest('getMenus', data, this.updateMenus);
    }.bind(this);
  }

  getMenus(restaurant_Id) {
    // console.log("App | getMenus, restaurant_Id", restaurant_Id);
    let data = {
      restaurant_Id: restaurant_Id
    };
    // console.log("App | getMenus, data", data);
    api.postRequest('getMenus', data, this.updateMenus);
  }

  getSubMenusLocal(menuId) {
    // console.log("App | getSubMenusLocal, menuId", menuId);
    // console.log("App | getMenus, this.restaurantId", this.restaurantId);
    //1.
    //  const that = this;
    //2. bind the function

    // 3. call function
    // 4. apply function


    return function () {
      let data = {
        menu_id: menuId
      };
      // console.log("App | getSubMenusLocal, data", data);
      api.postRequest('getSubMenus', data, this.updateSubMenus);
    }.bind(this);
  }

  getSubMenus(menuId) {
    // console.log('App | getSubMenus | menuId', menuId);
    // console.log('App | getSubMenus | this.state', this.state);
    const data = {
      menu_id: menuId
    };
    api.postRequest('getSubMenus', data, this.updateSubMenus);
  }

  getTables(restaurant_Id) {
    // console.log("App | getTables, restaurant_Id", restaurant_Id);
    let data = {
      restaurant_Id: restaurant_Id
    };
    // console.log("App | getMenus, data", data);
    api.postRequest('getTables', data, this.updateTables);
  }

  getTablesLocal(restaurant_Id) {
    // console.log("App | getTablesLocal, restaurant_Id", restaurant_Id);
    // console.log("App | getMenus, this.restaurantId", this.restaurantId);
    //1.
    //  const that = this;
    //2. bind the function

    // 3. call function
    // 4. apply function


    return function () {
      let data = {
        restaurant_Id: restaurant_Id
      };
      // console.log("App | getTablesLocal, data", data);
      api.postRequest('getTables', data, this.updateTables);
    }.bind(this);
  }

  getAllRests() {
    // console.log("App | getAllRests");
    api.postRequest('getAllRestaurants', {}, this.updateAllRests);
  }

  getOrdersByTableId(table_Id) {
    // console.log("App | getOrdersByTableId | table_Id", table_Id);
    let data = {
      table_Id: table_Id
    };
    api.postRequest('getOrdersByTableId', data, this.updateOrders);
  }

  getOrdersByTableIdLocal(table_Id) {
    // console.log("App | getOrdersByTableIdLocal | table_Id", table_Id);
    return function () {
      let data = {
        table_Id: table_Id
      };
      // console.log("App | getTablesLocal, data", data);
      api.postRequest('getOrdersByTableId', data, this.updateOrders);
    }.bind(this);
  }

  deleteDish(dishNum) {
    // console.log('App | deleteDish', this.state.data.dishes);
    // this.setState({loading: true});
    let postData = '&dish_Id=' + this.state.data.dishes[dishNum]._id + '&user_Id=' + this.state.uid;
    api.postRequest('removeDish', postData, this.getDishes);
    // this.postDataToServer('removeDish', '&dish_Id=' + this.props['dishId'] + '&user_Id=5826fdc1680d800d2064d1da');
  }

  deleteRest(restNum) {
    // console.log('App | deleteRest', restNum);
    // this.setState({loading: true});
    let postData = '&restaurant_Id=' + this.state.data.rests[restNum]._id + '&user_Id=' + this.state.uid;
    api.postRequest('removeRestaurant', postData, this.getRests);
  }

  deleteRestMenu(data) {
    // console.log('App | deleteRestMenu', data);
    let postData = '&restaurant_Id=' + data.restaurantId + '&menu_id=' + data._id;
    api.postRequest('removeMenu', postData, this.getMenusLocal(data.restaurantId));
  }

  deleteSubMenu(data) {
    // console.log('App | deleteSubMenu', data);
    let postData = '&subMenu_Id=' + data._id + '&menu_Id=' + data.menuId;
    api.postRequest('removeSubMenu', postData, this.getSubMenusLocal(data.menuId));
  }

  deleteTable(data) {
    // console.log('App | deleteTable', data);
    let postData = '&restaurant_Id=' + data.restaurantId + '&table_Id=' + data._id;
    api.postRequest('removeTable', postData, this.getTablesLocal(data.restaurantId));
  }

  addRest(data) {
    // console.log('App | addRest', data);
    // this.setState({loading: true});
    let postData = '&name=' + data.resName + '&address=' + data.resAddress + '&user_Id=' + this.state.uid;
    api.postRequest('addRestaurant', postData, this.getRests);
  }

  addDish(data) {
    // console.log('App | addDish', data);
    // this.setState({loading: true});
    // this.postDataToServer('addDish', '&user_Id=5826fdc1680d800d2064d1da&name=' + this.state['dishName'] + '&description='+this.state['dishDescription'] + '&default_price='+this.state['defaultPrice'])
    let postData = '&name=' + data.dishName + '&description=' + data.dishDescription + '&user_Id=' + this.state.uid + '&default_Price=' + data.defaultPrice;
    api.postRequest('addDish', postData, this.getDishes);
  }

  addRestMenu(data, restId) {
    // console.log('App | addRestMenu', data, restId);
    let postData = '&name=' + data.resMenuName + '&restaurant_Id=' + restId;
    api.postRequest('addMenu', postData, this.getMenusLocal(restId));
  }

  addSubMenu(menuId, menuName) {
    // console.log('App | menuId', menuId);
    // console.log('App | menuName', menuName);
    let postData = '&menu_Id=' + menuId + '&name=' + menuName;
    api.postRequest('addSubMenu', postData, this.getSubMenusLocal(menuId));
  }

  addTable(data) {
    // console.log('App | data', data);
    // console.log('App | table_Num', data[1].tableNum);
    let postData = '&restaurant_Id=' + data._id + '&table_Num=' + data.tableNum;
    api.postRequest('addTable', postData, this.getTablesLocal(data._id));
  }

  addOrder(table_Id) {
    // console.log('App | addOrder | ', table_Id);
    let data = {
      table_Id: table_Id
    };
    api.postRequest('addOrder', data, this.getOrdersByTableIdLocal(table_Id));
  }

  editRest(data) {
    // console.log('App | editRest', data);
    // this.setState({loading: true});
    let postData = '&restaurant_Id=' + data.resId + '&name=' + data.resName + '&address=' + data.resAddress;
    api.postRequest('editRestaurant', postData, this.getRests);
  }

  editDish(data) {
    // console.log('App | editDish', data);
    // this.setState({loading: true});
    let postData = '&dish_Id=' + data.dishId + '&name=' + data.dishName + '&description=' + data.dishDescription + '&default_Price=' + data.defaultPrice;
    api.postRequest('editDish', postData, this.getDishes);

  }

  editRestMenu(data) {
    // console.log('App | editRestMenu, data.restaurantId', data.restaurantId);
    let postData = '&menu_Id=' + data.restMenuId + '&name=' + data.restMenuName;
    // this.restaurantId = data.restaurantId;
    api.postRequest('editMenu', postData, this.getMenusLocal(data.restaurantId));
  }

  editSubMenu(data) {
    // console.log('App | editSubMenu, data', data);
    // console.log('App | editSubMenu, menuId', menuId);
    let postData = '&subMenu_Id=' + data.subMenuId + '&name=' + data.subMenuName;
    api.postRequest('editSubMenu', postData, this.getSubMenusLocal(data.menuId));
  }

  updateSubMenuDishes(data, menuId) {
    // console.log('App | updateSubMenuDishes, data', data);
    // console.log('App | updateSubMenuDishes, menuId', menuId);
    api.postRequest('updateSubMenuDishes', data, this.getSubMenusLocal(menuId));
  }

  editOrderDishes(data) {
    // console.log('App | editOrderDishes | data', data);
    let postData = '&order_Id=' + data._id;
    // let dishArray = [19];
    // console.log('App | editOrderDishes | data.dishArray', data.dishArray);
    for (let i = 0; i < 20; i++) {
      // console.log('App | editOrderDishes | i', i);
      // console.log('App | editOrderDishes | data.dishArray[i]', data.dishArray[i]);
      if (data.dishArray[i]) {
        // console.log('App | editOrderDishes | Exist');
        postData = postData + '&d' + (i + 1) + '=' + data.dishArray[i];
      } else {
        postData = postData + '&d' + (i + 1) + '=' + "";
      }
    }
    // console.log('App | editOrderDishes | postData', postData);
    api.postRequest('updateOrderDishes', postData, this.updateOrders);
  }

  editOrderSumPaid(data) {
    // console.log('App | editOrderSumPaid | data', data);
    let postData = '&order_Id=' + data._id + '&sum_Paid=' + data.sumPaid;
    api.postRequest('updateOrderSumPaid', postData, this.updateOrders);
  }

  editTable(data) {
    // console.log('App | editTable, data', data);
    let postData = '&table_Id=' + data.tableId + '&table_Num=' + data.tableNum + '&table_Available=' + data.tableAvailable;
    // this.restaurantId = data.restaurantId;
    api.postRequest('editTable', postData, this.getTablesLocal(data.restaurantId));
  }

  addUser() {
    let data = {
      facebook_Id: this.state.facebook_id,
      name: '',
      password: ''
    };
    api.postRequest('addUser', data, this.checkFacebookID);
  }

  checkFacebookID() {
    // console.log('App | checkFacebookID | facebook_Id', this.state.facebook_id);
    // console.log('App | checkFacebookID | facebook_Id', this.state.status);
    let data = {
      facebook_Id: this.state.facebook_id
    };
    api.postRequest('checkFacebookID', data, this.updateLogin);
  }

  getStatus(response) {
    // console.log('App | getStatus | response', response);
    if (response.authResponse) {
      this.responseApi.call(this, response);
    }
  }

  responseApi(res) {
    // console.log('res:', res);
    // console.log('token:', res.authResponse.accessToken);
    // console.log('status:', res.status);
    // console.log('userID:', res.authResponse.userID);
    this.setState({
      status: res.status,
      facebook_id: res.authResponse.userID,
      token: res.authResponse.accessToken,
      priv: 'admin',
      logged: true
    });
  }

  checkLoginState() {
    this.status(this.getStatus.bind(this));
  }

  loginFacebook() {
    browserHistory.push(`/`);
    this.login(this.getStatus.bind(this));
    this.setState({
      data: {}
    });
  }

  logoutFacebook() {
    browserHistory.push(`/`);
    this.logout();

    this.setState({
      status: 'unknown',
      facebook_id: null,
      token: null,
      uid: null,
      data: {},
      priv: 'user',
      logged: false
    });
  }

  userLogin() {
    this.setState({
      status: 'connected',
      facebook_id: null,
      token: null,
      uid: userUid
    });

  }

  render() {
    // console.log('App | render | this.state', this.state);
    // console.log('App | render | props', this.props);
    // console.log('App | render | route', this.props.route);
    // console.log('App | render | params', this.props.params);
    // console.log('App | render | routeParams', this.props.routeParams);
    //  //                 {name: 'Your Restaurants', path: 'Admin/Restaurants'},
    //                 {name: 'Your Dishes', path: 'Admin/Dishes'},
    //                 {name: 'Your Orders', path: 'Admin/Orders'}
    const styles3 = {
      container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
    };
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };
    // let imgUrl = 'images/berlin.jpg';
    const imgUrl = require("../Images/placeholder-restaurants.jpg");
    let styles2 = {
      root: {
        backgroundImage: 'url(' + imgUrl + ')',
        overflow: 'hidden',
      }
    };
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span>Rest Manager</span>}
            // iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={this.state.logged ? <FlatButton label="Logout" onTouchTap={this.logoutFacebook}/> : <FlatButton label="Login" onTouchTap={this.loginFacebook}/>}
          />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            {this.state.logged ? <div>
              <MenuItem onTouchTap={() => this.handleClose('/Admin/Restaurants')}>Your Restaurants</MenuItem>
              <MenuItem onTouchTap={() => this.handleClose('/Admin/Dishes')}>Your Dishes</MenuItem>
              <MenuItem onTouchTap={() => this.handleClose('/Admin/Orders')}>Your Orders</MenuItem>
            </div>:
              <MenuItem onTouchTap={() => this.handleClose('/uRestaurants')}>Restaurants</MenuItem>
            }
          </Drawer>
          {this.state.priv === 'user' ? null :
              this.state.uid === null ? this.checkFacebookID() : null
          }
          <Breadcrumbs
            routes={this.props.routes}
            params={this.props.params}
          />
          {/*<Header />*/}
          <div className="jumbotron">
            <div className="container">

              {React.Children.map(this.props.children, (child) => React.cloneElement(child, {
                appData: this.state,
                getRests: this.getRests,
                getDishes: this.getDishes,
                getDishesUid: this.getDishesUid,
                getMenus: this.getMenus,
                getSubMenus: this.getSubMenus,
                getTables: this.getTables,
                getAllRests: this.getAllRests,
                getOrdersByTableId: this.getOrdersByTableId,
                addOrder: this.addOrder,
                editOrderDishes: this.editOrderDishes,
                editOrderSumPaid: this.editOrderSumPaid,
                addRest: this.addRest,
                addDish: this.addDish,
                addSubMenu: this.addSubMenu,
                addRestMenu: this.addRestMenu,
                addTable: this.addTable,
                editRest: this.editRest,
                editDish: this.editDish,
                editRestMenu: this.editRestMenu,
                editSubMenu: this.editSubMenu,
                updateSubMenuDishes: this.updateSubMenuDishes,
                editTable: this.editTable,
                deleteRest: this.deleteRest,
                deleteDish: this.deleteDish,
                deleteRestMenu: this.deleteRestMenu,
                deleteSubMenu: this.deleteSubMenu,
                deleteTable: this.deleteTable,
                publicDns: publicDns
              }))}
              <div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  routes: PropTypes.array,
  appId: PropTypes.string,
  children: PropTypes.object,
  routeParams: PropTypes.object,
  route: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  fb: PropTypes.object,
  cookie: PropTypes.bool,
  language: PropTypes.string,
  scope: PropTypes.string,
  version: PropTypes.string,
  xfbml: PropTypes.string
};

// export default App;
export default LoginHOC(configureLoginProps)(App);
