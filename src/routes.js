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
import RestMenu from './components/restMenu/restMenu'
// import DishesManager
//TODO Fix back button
export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Homepage}/>
          {/*<IndexRoute component={Restaurants}/>*/}
          <Route path="rests" component={Restaurants}/>
          <Route path="rest/:restName" component={Restaurant}/>
          <Route path="rest/:restName/menu/:menuName" component={RestMenu}/>
          <Route path="dishes" component={Dishes}/>
        </Route>
      </ Router>
    );
  }
}
