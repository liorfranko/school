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
import RestSubMenu from './components/SubMenus/RestSubMenu'
// import Login from './components/Login/Login'

// import DishesManager
//TODO Fix back button
export default class Routes extends Component {
  render() {
    // return (
    //   <Router history={browserHistory}>
    //     <Route path="/" name="Examples" component={App}>
    //       <Route name="rests" path="rests" component={Restaurants}>
    //         <Route name="restName" path=":restName" component={Restaurant}>
    //           <Route name="menuName" path=":menuName" component={RestMenu}>
    //             <Route name="subMenuName" path=":subMenuName" component={RestSubMenu}/>
    //           </Route>
    //         </Route>
    //       </Route>
    //       <Route name='dishes' path='dishes' component={Dishes}/>
    //     </Route>
    //   </Router>
    // );
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Homepage}/>
          <Route path="rests" component={Restaurants}/>
          <Route path="dishes" component={Dishes}/>
          {/*<Route path="login" component={Login}/>*/}
          <Route path=":restName" component={Restaurant}/>
          <Route path=":restName/:menuName" component={RestMenu}/>
          <Route path=":restName/:menuName/:subMenuName" component={RestSubMenu}/>
        </Route>
      </ Router>
    );
  }
}
