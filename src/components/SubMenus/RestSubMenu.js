/**
 * Created by liorf on 12/10/16.
 */
import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
//{"subMenu_Id":"583cb590422ce433e4abec81","items":[{"Id":"ABCD"},{"Id":"EFGH"},{"Id":"IJKL"}]}

class RestSubMenu extends Component {
  constructor(props) {
    super(props);
    let available_dishes = [];
    let selected_dishes = [];
    this.props.appData.data.dishes.map((dish) => {
      available_dishes.push(dish.name)
    });
    // console.log('RestSubMenu | available_dishes ', available_dishes);

    this.state = {
      available_dishes: available_dishes,
      selected_dishes: selected_dishes
    };
    this.submitRestSubMenu = this.submitRestSubMenu.bind(this);
    this.cancelRestSubMenu = this.cancelRestSubMenu.bind(this);
  }

  submitRestSubMenu() {
    // console.log('RestSubMenu | submitRestSubMenu | this.props', this.props);
    let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    // console.log('RestSubMenu | submitRestSubMenu | rest', rest);
    let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
    // console.log('RestSubMenu | submitRestSubMenu | menu', menu);
    let submenu = this.props.appData.data.rests[rest].menus[menu].subMenus.findIndex(x => x.name == this.props.params.subMenuName);
    // console.log('RestSubMenu | submitRestSubMenu | subMenu', submenu);
    let subMenu_Id = this.props.appData.data.rests[rest].menus[menu].subMenus[submenu]['_id'];
    // console.log('RestSubMenu | submitRestSubMenu | subMenu_Id', subMenu_Id);
    //"5838c967680d800f0c5d83eb"
    // let subMenu_Id = {"subMenu_Id": subMenu_Id_, "items": [{"Id": "5838c967680d800f0c5d83eb"}]};
    this.props.editSubMenu({subMenu_Id: subMenu_Id})
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
    let listOne = [];
    this.state.available_dishes.map((dish, i) => {
      listOne.push({id: i, text: dish})
    });
    let listTwo = [];
    this.state.selected_dishes.map((dish, i) => {
      listTwo.push({id: i, text: dish})
    });
    let styleDiv = {
      fontSize: 30
    };
    return (
      <div>
        <div id="subMenusubMenuManager" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>{this.props.params.subMenuName}</div>
          <div className="panel-body">
            <Container id={1} list={listOne} text="Available Items"/>
          </div>
          <div className="panel-body">
          </div>
        </div>
        <div id="subMenusubMenuManager" className="panel panel-default">
          <div className="panel-body">
            <Container id={2} list={listTwo} text="Selected Items"/>
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
