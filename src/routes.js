/**
 * Created by Alex on 21/11/2016.
 */
"use strict";

import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './components/App';
import Homepage from './components/homepage/Homepage';
import Restaurants from './components/restaurants/RestaurantsManager';
import Restaurant from './components/restaurants/Restaurant';
import Dishes from './components/Dishes/DishesManager';
import RestMenu from './components/restMenu/restMenu';
import RestSubMenu from './components/SubMenus/RestSubMenu';
import Orders from './components/Orders/OrderManager';
import uRestaurants from './components/uRestaurants/uRestaurantsManager';
import uRestaurant from './components/uRestaurants/uRestaurant';
import uTable from './components/uTables/uTable';
import QrCode from './components/Tables/QrCodeModal'

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route name="Home" path="/" component={App}>
          <IndexRoute component={Homepage}/>
          <Route name="Restaurants" path="/Admin/Restaurants" component={Restaurants}>
            <Route path=":restName" component={Restaurant}>
              <Route name="Menus/:menuName" path="Menus/:menuName" component={RestMenu}>
                <Route name="Submenus/:subMenuName" path="Submenus/:subMenuName" component={RestSubMenu}/>
              </Route>
              <Route name="Table/:tableNum" path="Table/:tableNum" component={QrCode}/>
            </Route>
          </Route>
          <Route name="Dishes" path="/Admin/Dishes" component={Dishes}/>
          <Route name="Orders" path="/Admin/Orders" component={Orders}/>
          <Route name="Restaurants" path="/uRestaurants" component={uRestaurants}>
            <Route path=":restName" component={uRestaurant}>
              <Route path="/uRestaurants/:restName/uTables/:tableName" component={uTable}/>
            </Route>
          </Route>
        </Route>
      </ Router>
    );
  }
}
