/**
 * Created by liorf on 12/4/16.
 */


import React from 'react';
import RestMenuManager from '../restMenu/restMenuManager'
import ListOfDishes from '../Dishes/ListOfDishes';
import api from '../../api/API'

class Restaurant extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getMenus = this.getMenus.bind(this);
    this.updateMenus = this.updateMenus.bind(this);
    this.editRestMenu = this.editRestMenu.bind(this);
  }

  componentDidMount() {
    console.log('Restaurant | componentDidMount', this.props);
    if (!this.props.data.dishes) {
      this.props.getDishes();
    }
    if (!this.state.data.menus) {
      this.getMenus(this.props.data.rests[this.props.selectedRest]._id);
    }
  }

  getMenus(restaurant_Id) {
    console.log("Restaurant | getMenus, restaurant_Id", restaurant_Id);
    var data = {
      restaurant_Id: restaurant_Id
    };
    console.log("Restaurant | getMenus, data", data);
    api.postRequest('getMenus', data, this.updateMenus);
  }

  updateMenus(data) {
    console.log('Restaurant | updateMenus data', data);
    const items = JSON.parse(data).items || [];
    console.log('Restaurant | updateMenus items', items);
    this.setState({
      data: Object.assign({}, this.state.data, {menus: items})
    });
  }

  editRestMenu(data) {
    console.log('App | editRestMenu, data.restaurantId', data.restaurantId);
    var postData = '&menu_Id=' + data.restMenuId + '&name=' + data.restMenuName;
    this.restaurantId = data.restaurantId;
    api.postRequest('editMenu', postData, this.getMenus);
  }

  render() {
    console.log('Restaurant | render |this.props', this.props);
    console.log('Restaurant | render |this.state', this.state);
    if (!this.props.data.dishes || !this.state.data.menus) {
      return (
        <div>Loading</div>
      )
    } else {
      var rest = this.props.data.rests[this.props.selectedRest];
      return (
        <div> Restaurant:
          <div>
            {rest.name}
          </div>
          <RestMenuManager rest={rest} menus={this.state.data.menus}/>
          <ListOfDishes  dishes={this.props.data.dishes} type="inMenu"/>
        </div>
      )
    }
  }
}

export default Restaurant;
