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

//{"subMenu_Id":"583cb590422ce433e4abec81","items":[{"Id":"ABCD"},{"Id":"EFGH"},{"Id":"IJKL"}]}

class RestSubMenu extends Component {
  constructor(props) {
    console.log('RestSubMenu | constructor | props', props);
    super(props);
    let available_dishes = [];
    let selected_dishes = [];
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    // console.log('RestSubMenu | constructor | rest', rest);
    let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    // console.log('RestSubMenu | constructor | menu', menu);
    let menuId = this.props.appData.data.rests[rest].menus[menu]._id;
    // console.log('RestSubMenu | constructor | menuId', menuId);
    let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name === this.props.params.subMenuName);
    // console.log('RestSubMenu | constructor | subMenu', submenu);
    let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
    // console.log('RestSubMenu | constructor | subMenu_Id', subMenu_Id);
    let dishArray = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['dishArray'];
    // console.log('RestSubMenu | constructor | dishArray', dishArray);
    this.props.appData.data.dishes.map((dish, i) => {
      // console.log('RestSubMenu | constructor | dish', dish);
      // console.log('check if dish exists', $.inArray(dish._id, dishArray));
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
          selected_dishes.push({id: i, dish: fullDish})
        }
      });
    }
    // console.log('RestSubMenu | available_dishes ', available_dishes);

    this.state = {
      available_dishes: available_dishes,
      selected_dishes: selected_dishes
    };
    this.submitRestSubMenu = this.submitRestSubMenu.bind(this);
    this.cancelRestSubMenu = this.cancelRestSubMenu.bind(this);
    this.addToAvailable = this.addToAvailable.bind(this);
    this.addToSelected = this.addToSelected.bind(this);
    this.removeFromAvailable = this.removeFromAvailable.bind(this);
    this.removeFromSelected = this.removeFromSelected.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.contains = this.contains.bind(this);
  }


  contains(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    let findNaN = needle !== needle;
    let indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function (needle) {
        let i = -1, index = -1;

        for (i = 0; i < this.length; i++) {
          let item = this[i];

          if ((findNaN && item !== item) || item === needle) {
            index = i;
            break;
          }
        }

        return index;
      };
    }

    return indexOf.call(this, needle) > -1;
  };
  // componentDidMount() {
  //   console.log('RestSubMenu | submitRestSubMenu | this.props', this.props);
  //   console.log('RestSubMenu | submitRestSubMenu | this.state', this.state);
  //   let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
  //   console.log('RestSubMenu | submitRestSubMenu | rest', rest);
  //   let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
  //   console.log('RestSubMenu | submitRestSubMenu | menu', menu);
  //   let menuId = this.props.appData.data.rests[rest].menus[menu]._id;
  //   console.log('RestSubMenu | submitRestSubMenu | menuId', menuId);
  //   let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name == this.props.params.subMenuName);
  //   console.log('RestSubMenu | submitRestSubMenu | subMenu', submenu);
  //   let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
  //   console.log('RestSubMenu | submitRestSubMenu | subMenu_Id', subMenu_Id);
  // }
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
    console.log('RestSubMenu | submitRestSubMenu | this.props', this.props);
    console.log('RestSubMenu | submitRestSubMenu | this.state', this.state);
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    console.log('RestSubMenu | submitRestSubMenu | rest', rest);
    let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    console.log('RestSubMenu | submitRestSubMenu | menu', menu);
    let menuId = this.props.appData.data.rests[rest].menus[menu]._id;
    console.log('RestSubMenu | submitRestSubMenu | menuId', menuId);
    let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name === this.props.params.subMenuName);
    console.log('RestSubMenu | submitRestSubMenu | subMenu', submenu);
    let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
    console.log('RestSubMenu | submitRestSubMenu | subMenu_Id', subMenu_Id);
    //"5838c967680d800f0c5d83eb"
    // let subMenu_Id = {"subMenu_Id": subMenu_Id_, "items": [{"Id": "5838c967680d800f0c5d83eb"}]};
    // let postData = {};
    // this.state.selected_dishes.map((dish, i) => {
    //
    //   available_dishes.push({id: i, text: dish.name, price: dish.defaultPrice})
    // });
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
    browserHistory.push(`/${this.props.appData.data.rests[rest].name}/${this.props.appData.data.rests[rest].menus[menu].name}`)
  };

  cancelRestSubMenu() {
    // console.log('RestSubMenu | cancelRestSubMenu');
    // console.log('RestSubMenu | submitRestSubMenu | this.props', this.props);
    let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    // console.log('RestSubMenu | submitRestSubMenu | rest', rest);
    let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
    // console.log('RestSubMenu | submitRestSubMenu | menu', menu);
    // let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name==this.props.params.subMenuName);
    // console.log('RestSubMenu | submitRestSubMenu | subMenu', submenu);
    // let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
    // console.log('RestSubMenu | submitRestSubMenu | subMenu_Id', subMenu_Id);
    //{`/${props.rest.name}/${props.menu.name}/${props.item.name}`}
    browserHistory.push(`/${this.props.appData.data.rests[rest].name}/${this.props.appData.data.rests[rest].menus[menu].name}`)
  }

  render() {
    // const style = {
    //   display: "flex",
    //   justifyContent: "space-around",
    //   paddingTop: "20px"
    // };
    // let listOne = [];
    // this.state.available_dishes.map((dish, i) => {
    //   // console.log('dish ', dish);
    //   listOne.push({id: i, text: dish.name, price: dish.defaultPrice})
    // });
    // let listTwo = [];
    // this.state.selected_dishes.map((dish, i) => {
    //   listTwo.push({id: i, text: dish.name, price: dish.defaultPrice})
    // });
    let styleDiv = {
      fontSize: 30
    };
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

export default DragDropContext(HTML5Backend)(RestSubMenu);
