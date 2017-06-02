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

// import Login from './components/Login/Login'

// import DishesManager
//TODO Fix back button
export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Homepage}/>
          <Route path="/Admin" component={App}/>
          <Route path="/Admin/Dishes" component={Dishes}/>
          <Route path="/Admin/Restaurants" component={Restaurants}/>
          <Route path="/Admin/Restaurants/:restName" component={Restaurant}/>
          <Route path="/Admin/Restaurants/:restName/Menus/:menuName" component={RestMenu}/>
          <Route path="/Admin/Restaurants/:restName/Menus/:menuName/Submenus/:subMenuName" component={RestSubMenu}/>

          <Route path="/uRestaurants" component={uRestaurants}/>
          <Route path="/uRestaurants/:restName" component={uRestaurant}/>
          <Route path="/uRestaurants/:restName/Menus/:menuName/Table/:tableNum" component={uRestMenu}/>
          <Route path="/uRestaurants/:restName/Tables/:tableName" component={uTable}/>
        </Route>
      </ Router>
    );
  }
}
