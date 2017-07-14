/**
 * Created by liorf on 12/10/16.
 */
import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import update from 'react/lib/update';
import * as $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';


class RestSubMenu extends Component {
  constructor(props) {
    console.log('RestSubMenu | constructor | props', props);
    super(props);
    this.submitRestSubMenu = this.submitRestSubMenu.bind(this);
    this.cancelRestSubMenu = this.cancelRestSubMenu.bind(this);
    this.addToAvailable = this.addToAvailable.bind(this);
    this.addToSelected = this.addToSelected.bind(this);
    this.removeFromAvailable = this.removeFromAvailable.bind(this);
    this.removeFromSelected = this.removeFromSelected.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }


  componentDidMount() {
    // console.log('RestSubMenu | componentDidMount | this.props', this.props);
    // console.log('RestSubMenu | componentDidMount | this.state', this.state);
    if (!this.props.appData.data.rests) {
      // console.log('RestSubMenu | componentWillReceiveProps | getRests()');
      this.props.getRests();
    } else {
      let available_dishes = [];
      let selected_dishes = [];
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('RestSubMenu | componentDidMount | rest', rest);
      let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
      // console.log('RestSubMenu | componentDidMount | menu', menu);
      // let menuId = this.props.appData.data.rests[rest].menus[menu]._id;
      // console.log('RestSubMenu | componentDidMount | menuId', menuId);
      let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name === this.props.params.subMenuName);
      // console.log('RestSubMenu | componentDidMount | subMenu', submenu);
      // let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
      // console.log('RestSubMenu | componentDidMount | subMenu_Id', subMenu_Id);
      let dishArray = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['dishArray'];
      // console.log('RestSubMenu | componentDidMount | dishArray', dishArray);
      this.props.appData.data.dishes.map((dish, i) => {
        // console.log('RestSubMenu | componentDidMount | dish', dish);
        // console.log('RestSubMenu | componentDidMount |check if dish exists', $.inArray(dish._id, dishArray));
        if ($.inArray(dish._id, dishArray) === -1) {
          // console.log('Dish exists');
          available_dishes.push({id: i, dish: dish})
        }
      });
      if (dishArray) {
        dishArray.map((dish, i) => {
          // console.log('dishArray | dish', dish);
          if (dish !== "") {
            // console.log('dishArray | dish', dish);
            let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
            // console.log('dishArray | dishIndex', dishIndex);
            let fullDish = this.props.appData.data.dishes[dishIndex];
            // console.log('dishArray | dishIndex', fullDish);
            selected_dishes.push({id: i+100, dish: fullDish})
          }
        });
      }
      this.setState({
        available_dishes: available_dishes,
        selected_dishes: selected_dishes
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('RestSubMenu | componentWillReceiveProps | nextProps', nextProps);
    // console.log('RestSubMenu | componentWillReceiveProps | this.props', this.props);
    let available_dishes = [];
    let selected_dishes = [];
    if (!this.props.appData.data.rests) {
      // console.log('RestSubMenu | componentWillReceiveProps | getRests()');
      this.props.getRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('RestSubMenu | componentWillReceiveProps | rest', rest);
      if (!this.props.appData.data.rests[rest].menus) {
        // console.log('RestSubMenu | componentWillReceiveProps | getMenus()');
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else if (!this.props.appData.data.dishes) {
        // console.log('RestSubMenu | componentWillReceiveProps | getDishes()');
        this.props.getDishes();
      } else {
        let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
        // console.log('RestSubMenu | componentWillReceiveProps | menu', menu);
        if (!this.props.appData.data.rests[rest].menus[menu].subMenus) {
          // console.log('RestSubMenu | componentWillReceiveProps | getSubMenus()');
          this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
        } else {
          // let menuId = this.props.appData.data.rests[rest].menus[menu]._id;
          // console.log('RestSubMenu | constructor | menuId', menuId);
          let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name === this.props.params.subMenuName);
          // console.log('RestSubMenu | componentWillReceiveProps | subMenu', submenu);
          // let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
          // console.log('RestSubMenu | componentWillReceiveProps | subMenu_Id', subMenu_Id);
          let dishArray = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['dishArray'];
          // console.log('RestSubMenu | componentWillReceiveProps | dishArray', dishArray);
          this.props.appData.data.dishes.map((dish, i) => {
            // console.log('RestSubMenu | componentWillReceiveProps | dish', dish);
            // console.log('RestSubMenu | componentWillReceiveProps |check if dish exists', $.inArray(dish._id, dishArray));
            if ($.inArray(dish._id, dishArray) === -1) {
              // console.log('Dish exists');
              available_dishes.push({id: i, dish: dish})
            }
          });
          if (dishArray) {
            dishArray.map((dish, i) => {
              // console.log('dishArray | dish', dish);
              if (dish !== "") {
                // console.log('dishArray | dish', dish);
                let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
                // console.log('dishArray | dishIndex', dishIndex);
                let fullDish = this.props.appData.data.dishes[dishIndex];
                // console.log('dishArray | dishIndex', fullDish);
                selected_dishes.push({id: i+100, dish: fullDish})
              }
            });
          }
          // console.log('RestSubMenu | componentWillReceiveProps | available_dishes', available_dishes);
          // console.log('RestSubMenu | componentWillReceiveProps | selected_dishes', selected_dishes);
          this.setState({
            available_dishes: available_dishes,
            selected_dishes: selected_dishes
          });
        }
      }
    }
  }

  addToAvailable(card) {
    // console.log('RestSubMenu | addToAvailable | card', card);
    // console.log('RestSubMenu | addToAvailable | this.state', this.state);
    this.setState(update(this.state, {
      available_dishes: {
        $push: [card]
      }
    }));
    // console.log('RestSubMenu | addToAvailable | this.state', this.state);
  }

  removeFromAvailable(index) {
    // console.log('RestSubMenu | removeFromAvailable | card', index);
    // console.log('RestSubMenu | removeFromAvailable | this.state', this.state);
    this.setState(update(this.state, {
      available_dishes: {
        $splice: [
          [index, 1]
        ]
      }
    }));
    // console.log('RestSubMenu | removeFromAvailable | this.state', this.state);
  }

  addToSelected(card) {
    // console.log('RestSubMenu | addToSelected | card', card);
    // console.log('RestSubMenu | addToSelected | this.state', this.state);
    this.setState(update(this.state, {
      selected_dishes: {
        $push: [card]
      }
    }));
    // console.log('RestSubMenu | addToSelected | this.state', this.state);
  }

  removeFromSelected(index) {
    // console.log('RestSubMenu | removeFromSelected | card', index);
    // console.log('RestSubMenu | removeFromSelected | this.state', this.state);
    this.setState(update(this.state, {
      selected_dishes: {
        $splice: [
          [index, 1]
        ]
      }
    }));
    // console.log('RestSubMenu | removeFromSelected | this.state', this.state);
  }

  submitRestSubMenu() {
    // console.log('RestSubMenu | submitRestSubMenu | this.props', this.props);
    // console.log('RestSubMenu | submitRestSubMenu | this.state', this.state);
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    // console.log('RestSubMenu | submitRestSubMenu | rest', rest);
    let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    // console.log('RestSubMenu | submitRestSubMenu | menu', menu);
    let menuId = this.props.appData.data.rests[rest].menus[menu]._id;
    // console.log('RestSubMenu | submitRestSubMenu | menuId', menuId);
    let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name === this.props.params.subMenuName);
    // console.log('RestSubMenu | submitRestSubMenu | subMenu', submenu);
    let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
    // console.log('RestSubMenu | submitRestSubMenu | subMenu_Id', subMenu_Id);
    let postData = {};
    let count;
    for (count = 1; count <= 20; count++) {
      postData['d' + count] = ""
    }
    // console.log('postData', postData);
    this.state.selected_dishes.map((dish, i) => {
      // console.log('selected_dishes | i', i);
      // console.log('selected_dishes | dish', dish);
      let index = i + 1;
      postData['d' + index] = dish.dish._id;
    });
    // console.log('postData', postData);
    postData['subMenu_Id'] = subMenu_Id;
    this.props.editSubMenu(postData, menuId);
    browserHistory.push(`/Admin/Restaurants/${this.props.appData.data.rests[rest].name}/Menus/${this.props.appData.data.rests[rest].menus[menu].name}`)
  };

  cancelRestSubMenu() {
    // console.log('RestSubMenu | cancelRestSubMenu');
    // console.log('RestSubMenu | submitRestSubMenu | this.props', this.props);
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    // console.log('RestSubMenu | submitRestSubMenu | rest', rest);
    let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    // console.log('RestSubMenu | submitRestSubMenu | menu', menu);
    // let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name==this.props.params.subMenuName);
    // console.log('RestSubMenu | submitRestSubMenu | subMenu', submenu);
    // let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
    // console.log('RestSubMenu | submitRestSubMenu | subMenu_Id', subMenu_Id);
    //{`/${props.rest.name}/${props.menu.name}/${props.item.name}`}
    browserHistory.push(`/Admin/Restaurants/${this.props.appData.data.rests[rest].name}/Menus/${this.props.appData.data.rests[rest].menus[menu].name}`)
  }

  render() {
    console.log('RestSubMenu | render | this.props', this.props);
    const src = require("../../Images/5.gif");
    let styleDiv = {
      fontSize: 30
    };
    if (!this.state || !this.state['available_dishes'] || !this.state['selected_dishes']) {
      return (
        <div id="subMenusubMenuManager" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div id="subMenusubMenuManager" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>{this.props.params.subMenuName}</div>
            <div className="panel-body">
              <Container id={1} list={this.state.available_dishes} text="Available Items"
                         addToAvailable={this.addToAvailable.bind(this)}
                         removeFromAvailable={this.removeFromAvailable.bind(this)}/>
            </div>
            <div className="panel-body">
            </div>
          </div>
          <div id="subMenusubMenuManager" className="panel panel-default">
            <div className="panel-body">
              <Container id={2} list={this.state.selected_dishes} text="Selected Items"
                         addToSelected={this.addToSelected.bind(this)}
                         removeFromSelected={this.removeFromSelected.bind(this)}/>
            </div>
            <div className="panel-body">
              <Button onClick={this.submitRestSubMenu}>Submit</Button>
              <Button onClick={this.cancelRestSubMenu}>Cancel</Button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DragDropContext(HTML5Backend)(RestSubMenu);
