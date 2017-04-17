/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import Menu from './menu/Menu';
import {Button} from 'react-bootstrap';
import api from '../api/API'
import 'react-super-select/lib/react-super-select.css';
import update from 'immutability-helper';
import {browserHistory} from 'react-router';
import LoginHOC from 'react-facebook-login-hoc';
// import Login from './Login/Login'
// import {setPId} from 'react-pstate'

const configureLoginProps = {
  appId: '756445047848860',
  scope: 'public_profile, email',
  xfbml: true,
  cookie: false,
  version: 2.8,
  language: 'en_US'
};
const userUid = '999999';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.status = this.props.fb.status;
    this.login = this.props.fb.login;
    this.logout = this.props.fb.logout;
    this.state = {
      uid: null,
      status: 'unknown',
      facebook_id: null,
      token: null,
      data: {},
    };

    this.goBack = this.goBack.bind(this);
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
      data: Object.assign({}, this.state.data, {rests: items}),
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
    //FIXME
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
              // FIXME need to check why newMenusArray is not is use!!!!
              // let newMenusArray = update(this.state.data.rests[restIndex], {
              //   [menuIndex]: {$set: curMenusArray}
              // });
              // console.log('App | updateSubMenus newMenusArray', newMenusArray);
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
          })
        }
      });
    }
    // console.log('App | updateSubMenus this.state.data', this.state.data);
  }

  updateTables (data) {
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
      console.log('App | updateLogin Success');
      this.setState({
        uid: data.items._id
      });
    } else {
      console.log('App | updateLogin Failed');
      this.addUser()
    }

  }

  updateAllRests(data) {
    console.log('App | updateAllRests data', data.items);
    const items = data.items || [];
    console.log('App | updateAllRests', items);
    this.setState({
      data: Object.assign({}, this.state.data, {rests: items}),
    });
  }

  updateOrders (data) {
    // Problem:
    // When loading menus and menus list is empty, How can I get the restaurant ID.
    console.log('App | updateOrders data', data);
    console.log('App | updateOrders this.state.data', this.state.data);
    const items = data.items || [];
    console.log('App | updateOrders items.length()', items.length);
    let arrayVar = this.state.data.rests.slice();
    if (items.length > 0) {
      arrayVar.map((rest, restIndex) => {
        console.log('App |  updateOrders | rest', rest);
        if (rest.tables) {
          let arrayTables = rest.tables.slice();
          arrayTables.map((table, tableIndex) => {
            console.log('App |  updateOrders | table', table);
            if (table._id == items[0].tableId) {
              console.log('App | updateOrders | table._id', table._id);
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
      console.log('App | updateOrders | tableId', tableId);
      arrayVar.map((rest, restIndex) => {
        console.log('App | updateOrders | rest', rest);
        if (rest.tables) {
          let arrayTables = rest.tables.slice();
          arrayTables.map((table, tableIndex) => {
            console.log('App |  updateOrders | table', table);
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
    //   arrayVar.map((rest, i) => {
    //     if (rest._id === items[0].restaurantId) {
    //       // index = i;
    //       let curRestArray = this.state.data.rests[i];
    //       curRestArray.tables = items;
    //       let newRestArray = update(this.state.data.rests, {
    //         [i]: {$set: curRestArray}
    //       });
    //       this.setState({
    //         data: Object.assign({}, this.state.data, {rests: newRestArray})
    //       });
    //     }
    //   });
    // } else {
    //   let restId = data.reason;
    //   // console.log('App | updateMenus restId', restId);
    //   // console.log('App | updateMenus this.state.data.rests', this.state.data.rests);
    //   let index = this.state.data.rests.findIndex(x => x._id == restId);
    //   // console.log('App | updateMenus index', index);
    //   let curRestArray = this.state.data.rests[index];
    //   curRestArray.tables = items;
    //   let newRestArray = update(this.state.data.rests, {
    //     [index]: {$set: curRestArray}
    //   });
    //   this.setState({
    //     data: Object.assign({}, this.state.data, {rests: newRestArray})
    //   });
    // }
  }

  getRests() {
    console.log("App | getRests", this.state);
    // this.setState({loading: true});
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
    console.log("App | getDishesUid");
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
    }.bind(this)
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
    console.log("App | getAllRests");
    api.postRequest('getAllRestaurants', {}, this.updateAllRests);
  }

  getOrdersByTableId(table_Id) {
    console.log("App | getOrdersByTableId | table_Id", table_Id);
    let data = {
      table_Id: table_Id
    };
    api.postRequest('getOrdersByTableId', data, this.updateOrders);
  }

  getOrdersByTableIdLocal(table_Id) {
    console.log("App | getOrdersByTableIdLocal | table_Id", table_Id);
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
    // console.log('App | data', data[0]);
    // console.log('App | table_Num', data[1].tableNum);
    let postData = '&restaurant_Id=' + data[0] + '&table_Num=' + data[1].tableNum;
    api.postRequest('addTable', postData, this.getTablesLocal(data[0]));
  }

  addOrder(table_Id) {
    console.log('App | addOrder | ', table_Id);
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
    this.restaurantId = data.restaurantId;
    api.postRequest('editMenu', postData, this.getMenus);
  }

  editSubMenu(data, menuId) {
    console.log('App | editSubMenu, data', data);
    console.log('App | editSubMenu, menuId', menuId);
    api.postRequest('updateSubMenuDishes', data, this.getSubMenusLocal(menuId));
  }

  editTable(data) {
    console.log('App | editTable, data', data);
    // let postData = '&table_Id=' + data.restMenuId + '&table_Num=' + data.restMenuName + '&table_Available=' + data.restMenuName;
    // this.restaurantId = data.restaurantId;
    // api.postRequest('editMenu', postData, this.getMenus);
  }

  addUser() {
    let data = {
      facebook_Id: this.state.facebook_id,
      name: '',
      password: '',
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
      this.responseApi.call(this, response)
    } else {
      console.log('App | getStatus | response', response);
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
    });
  }

  checkLoginState() {
    this.status(this.getStatus.bind(this))
  };

  loginFacebook() {
    this.login(this.getStatus.bind(this))
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
    });
  }

  userLogin() {
    this.setState({
      status: 'connected',
      facebook_id: null,
      token: null,
      uid: userUid,
    });

  }

  render() {
    // console.log('App | render | this.state', this.state);
    // const header = require("../Images/food.jpg");
    if (this.state.uid !== null) {
      // console.log('App | render | connected');
      // console.log('App | render | this.state.uid ', this.state.uid);
      if (this.state.uid === userUid) {
        return (
          <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container">
                <Menu
                  menu={[{name: 'Restaurants', path: 'uRestaurants'}]}
                  uid={this.state.uid}
                  logout={this.logoutFacebook}

                />
              </div>
            </nav>
            <div className="jumbotron">
              <div className="container">
                <h1>Header - Logo + Menu</h1>
                {React.Children.map(this.props.children, (child) => React.cloneElement(child, {
                  appData: this.state,
                  getRests: this.getRests,
                  getDishesUid: this.getDishesUid,
                  getMenus: this.getMenus,
                  getSubMenus: this.getSubMenus,
                  getTables: this.getTables,
                  getAllRests: this.getAllRests,
                  getOrdersByTableId: this.getOrdersByTableId,
                  addOrder: this.addOrder,

                }))}
                <Button onClick={this.goBack}>Back</Button>
                <Button onClick={this.goForward}>Forward</Button>
                <footer>Footer - links, & other shit</footer>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container">
                <Menu
                  menu={[
                    {name: 'Restaurants', path: 'Restaurants'},
                    {name: 'Dishes', path: 'Dishes'},
                  ]}
                  uid={this.state.uid}
                  logout={this.logoutFacebook}
                />
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
                  getTables: this.getTables,
                  addRest: this.addRest,
                  addDish: this.addDish,
                  addSubMenu: this.addSubMenu,
                  addRestMenu: this.addRestMenu,
                  addTable: this.addTable,
                  editRest: this.editRest,
                  editDish: this.editDish,
                  editRestMenu: this.editRestMenu,
                  editSubMenu: this.editSubMenu,
                  editTable: this.editTable,
                  deleteRest: this.deleteRest,
                  deleteDish: this.deleteDish,
                  deleteRestMenu: this.deleteRestMenu,
                  deleteSubMenu: this.deleteSubMenu,
                  deleteTable: this.deleteTable,
                }))}
                <Button onClick={this.goBack}>Back</Button>
                <Button onClick={this.goForward}>Forward</Button>
                <footer>Footer - links, & other shit</footer>
              </div>
            </div>
          </div>
        )
      }

    } else {
      // console.log('App | render | uid == null');
      const styleDiv = {
        fontSize: 30
      };
      const src = require("../Images/5.gif");
      if (this.state.facebook_id === null) {
        // console.log('App | render | facebook_id == null');
        return (
          <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container">
                {/*<Menu menu={[*/}
                  {/*{name: 'Rests', path: 'Restaurants'},*/}
                  {/*{name: 'Dishes', path: 'Dishes'},*/}
                {/*]}/>*/}
              </div>
            </nav>
            <div className="jumbotron">
              <div className="container">
                <h1>Header - Logo + Menu</h1>
                <div id="rests" className="panel panel-default">
                  <div className="panel-heading" style={styleDiv}>Welcome:</div>
                  <div className="panel-body">
                    <div>To manage your restaurants, please login using facebook.</div>
                    <button onClick={ this.loginFacebook.bind(this) }>Facebook Login</button>
                    <div>
                      <button onClick={this.userLogin.bind(this) }>User access click here</button>
                    </div>
                  </div>
                </div>
                <footer>Footer - links, & other shit</footer>
              </div>
            </div>
          </div>
        )
      } else {
        console.log('App | render | facebook_id != null');
        this.checkFacebookID();
        return (
          <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container">
                {/*<Menu menu={[*/}
                  {/*{name: 'Homepage', path: ''},*/}
                  {/*{name: 'Rests', path: 'Rests'},*/}
                  {/*{name: 'Dishes', path: 'Dishes'},*/}
                {/*]}/>*/}
              </div>
            </nav>
            <div className="jumbotron">
              <div className="container">
                <h1>Header - Logo + Menu</h1>
                <div id="rests" className="panel panel-default">
                  <div className="panel-heading" style={styleDiv}>Login:</div>
                  <div className="panel-body">
                    <img src={ src }/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }

}

// export default App;
export default LoginHOC(configureLoginProps)(App);
