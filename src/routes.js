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
import uRestMenu from './components/uRestMenus/uRestMenu';
import uTable from './components/uTables/uTable';
import Admin from './components/Admin';
import User from './components/User';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route name="Home" path="/" component={App}>
          <IndexRoute component={Homepage}/>
          <Route name="Restaurants" path="/Admin/Restaurants" component={Restaurants}>
            <Route path=":restName" component={Restaurant}>
              <Route name="Menus/:menuName" path="Menus/:menuName" component={RestMenu}>
                <Route name="Submenus/:subMenuName" path="Submenus/:subMenuName" component={RestSubMenu}/>""
              </Route>
            </Route>
          </Route>
          <Route name="Dishes" path="/Admin/Dishes" component={Dishes}/>
          <Route name="Orders" path="/Admin/Orders" component={Orders}/>
          {/*<Route name="Admin" path="Admin" component={Admin}>*/}
            {/*<Route name="Dishes" path="Dishes" component={Dishes}/>*/}
            {/*<Route name="Restaurants" path="Restaurants" component={Restaurants}>*/}
              {/*<Route path=":restName" component={Restaurant}/>*/}
            {/*</Route>*/}
            {/*<Route name="Orders" path="Orders" component={Orders}/>*/}
          {/*</Route>*/}
          <Route name="Restaurants" path="/uRestaurants" component={uRestaurants}>
            <Route path=":restName" component={uRestaurant}>
              <Route path="/uRestaurants/:restName/uTables/:tableName" component={uTable}/>
              {/*<Route name="RestName" path="Menus/:menuName/Table/:tableNum" component={uRestMenu}/>*/}
            </Route>

          </Route>

          {/*<Route name="User" path="User" component={User}>*/}
            {/*<Route name="Restaurants" path="uRestaurants" component={uRestaurants}/>*/}
            {/*<Route name="Restaurant" path="/uRestaurants" component={uRestaurant}>*/}
              {/*<Route name="Restaurant" path=":restName" component={uRestaurant}/>*/}
            {/*</Route>*/}
          {/*</Route>*/}



          {/*<Route name="test" path="Admin" component={Homepage}>*/}
            {/*<Route name="test2" path="Restaurants" component={Homepage}>*/}
              {/*<Route path=":restName" component={Homepage}/>*/}
            {/*</Route>*/}
          {/*</Route>*/}

          {/*<Route name="Restaurants/:restName/Menus/:menuName" path="/Admin/Restaurants/:restName/Menus/:menuName" component={RestMenu}/>*/}
          {/*<Route name="subMenuName" path="/Admin/Restaurants/:restName/Menus/:menuName/Submenus/:subMenuName" component={RestSubMenu}/>""*/}

          {/*<Route name="Route1" path="/uRestaurants" component={uRestaurants}/>*/}
          {/*<Route name="Route2" path="/uRestaurants/:restName" component={uRestaurant}/>*/}
          {/*<Route name='Route1' path="/uRestaurants" component={uRestaurants} exact>*/}
          {/*<Route name='Route2' path=":restName" component={uRestaurant}>*/}
          {/*</Route>*/}
          {/*</Route>*/}
        </Route>
      </ Router>
    );
  }
}
