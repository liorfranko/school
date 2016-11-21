/**
 * Created by Alex on 21/11/2016.
 */
"use strict";

import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './components/App';
import Homepage from './components/homepage/Homepage';
import Restaurants from './components/restaurants/RestaurantsManager';
// import Dishes

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Homepage}/>
          <Route path="rests" component={Restaurants} />
        </Route>
      </ Router>
    );
  }
}

// /collections/new/products/product-287
