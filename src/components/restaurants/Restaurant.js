/**
 * Created by liorf on 12/4/16.
 */


import React from 'react';
import RestMenuManager from '../restMenu/restMenuManager'
import ListOfDishes from '../Dishes/ListOfDishes';
import api from '../../api/API'

class Restaurant extends React.Component {

  constructor(props) {
    console.log('Restaurant | constructor | this.props', props);
    super(props);
    this.state = {
      data: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getMenus = this.getMenus.bind(this);
    this.updateMenus = this.updateMenus.bind(this);
    this.editRestMenu = this.editRestMenu.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);
  }

  componentDidMount() {
    // console.log('Restaurant | componentDidMount', this.props);
    if (!this.props.appData.data.dishes) {
      this.props.getDishes();
    }
    if (!this.state.data.menus) {
      this.getMenus();
    }
  }

  getMenus() {
    // console.log("Restaurant | getMenus, this.props.data.rests", this.props.data.rests);
    var data = {
      restaurant_Id: this.props.appData.data.rests[this.props.params.restNum]._id
    };
    // console.log("Restaurant | getMenus, data", data);
    api.postRequest('getMenus', data, this.updateMenus);
  }

  updateMenus(data) {
    // console.log('Restaurant | updateMenus data', data);
    const items = JSON.parse(data).items || [];
    // console.log('Restaurant | updateMenus items', items);
    this.setState({
      data: Object.assign({}, this.state.data, {menus: items})
    });
  }

  editRestMenu(data) {
    // console.log('App | editRestMenu, data.restaurantId', data.restaurantId);
    var postData = '&menu_Id=' + data.restMenuId + '&name=' + data.restMenuName;
    this.restaurantId = data.restaurantId;
    api.postRequest('editMenu', postData, this.getMenus);
  }

  addRestMenu(data) {
    console.log('Restaurant | addRestMenu', data);
    console.log('Restaurant | this.props', this.props);
    var postData = '&name=' + data.resMenuName + '&restaurant_Id=' + this.props.appData.data.rests[this.props.params.restNum]._id;
    api.postRequest('addMenu', postData, this.getMenus);
  }

  render() {
    console.log('Restaurant | render |this.props', this.props);
    console.log('Restaurant | render |this.state', this.state);
    if (!this.props.appData.data.dishes || !this.state.data.menus) {
      return (
        <div>Loading</div>
      )
    } else {
      var rest = this.props.appData.data.rests[this.props.params.restNum];
      return (
        <div> Restaurant name:  {rest.name}
          <RestMenuManager rest={rest} menus={this.state.data.menus} addRestMenu={this.addRestMenu}/>
          <ListOfDishes  dishes={this.props.appData.data.dishes} type="inMenu"/>
        </div>
      )
    }
  }
}

export default Restaurant;
