/**
 * Created by Alex on 21/11/2016.
 */
"use strict";

import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './components/App';
import Homepage from './components/homepage/Homepage';
import Restaurants from './components/restaurants/RestaurantsManager';
import uRestaurants from './components/uRestaurants/uRestaurantsManager';
import Restaurant from './components/restaurants/Restaurant';
import uRestaurant from './components/uRestaurants/uRestaurant';
import Dishes from './components/Dishes/DishesManager';
import RestMenu from './components/restMenu/restMenu';
import uRestMenu from './components/uRestMenus/uRestMenu';
import RestSubMenu from './components/SubMenus/RestSubMenu';
import uTable from './components/uTables/uTable';
import Orders from './components/Orders/OrderManager';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route name="Home" path="/" component={App}>
          <IndexRoute component={Homepage}/>
          <Route name="Admin" path="/Admin" component={App}/>
          <Route name="Dishes" path="/Admin/Dishes" component={Dishes}/>
          <Route name="Restaurants" path="/Admin/Restaurants" component={Restaurants}/>
          <Route name="Orders" path="/Admin/Orders" component={Orders}/>
          <Route name="Restaurants/:restName" path="/Admin/Restaurants/:restName" component={Restaurant}/>
          <Route name="Restaurants/:restName/Menus/:menuName" path="/Admin/Restaurants/:restName/Menus/:menuName" component={RestMenu}/>
          <Route name="subMenuName" path="/Admin/Restaurants/:restName/Menus/:menuName/Submenus/:subMenuName" component={RestSubMenu}/>""

          <Route name="Route1" path="/uRestaurants" component={uRestaurants}/>
          <Route name="Route2" path="/uRestaurants/:restName" component={uRestaurant}/>
          {/*<Route name='Route1' path="/uRestaurants" component={uRestaurants} exact>*/}
            {/*<Route name='Route2' path=":restName" component={uRestaurant}>*/}
            {/*</Route>*/}
          {/*</Route>*/}
          <Route name="RestName" path="/uRestaurants/:restName/Menus/:menuName/Table/:tableNum" component={uRestMenu}/>
          <Route path="/uRestaurants/:restName/uTables/:tableName" component={uTable}/>
        </Route>
      </ Router>
    );
  }
}
