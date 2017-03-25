/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
// import Example from './test'
import SubMenuManager from '../SubMenus/SubMenuManager'

class RestMenu extends React.Component {
  constructor(props) {
    console.log('RestMenu | constructor | this.props', props);
    super(props);
    this.addSubMenu = this.addSubMenu.bind(this);
    this.editSubMenu = this.editSubMenu.bind(this);
    this.deleteSubMenu = this.deleteSubMenu.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    // var rest = this.props.appData.data.rests.findIndex(x => x.name==this.props.params.restName);
    console.log('RestMenu | componentDidMount | this.props.appData', this.props.appData);
    const rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    console.log('RestMenu | componentDidMount | rest', rest);
    const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
    console.log('RestMenu | componentDidMount | menu', menu);
    if (!this.props.appData.data.rests[rest].menus[menu].subMenus) {
      this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
    }
    if (!this.props.appData.data.dishes) {
      this.props.getDishes();
    }
  }

  addSubMenu() {
    console.log('RestMenu | addSubmenu | this.props', this.props);
    // var rest = this.props.appData.data.rests.findIndex(x => x.name==this.props.params.restName);
    console.log('RestMenu | addSubmenu | this.props.appData', this.props.appData);
    const rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    console.log('RestMenu | addSubmenu | rest', rest);
    const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
    console.log('RestMenu | addSubmenu | menu', menu);
    this.props.addSubMenu(this.props.appData.data.rests[rest].menus[menu]._id, 'test');

  }

  editSubMenu() {
    console.log('RestMenu | editSubMenu | this.props', this.props);
    // this.props.editSubMenu('test');
  }

  deleteSubMenu() {
    console.log('RestMenu | deleteSubMenu | this.props', this.props);
    console.log('RestMenu | deleteSubMenu | this.props.appData', this.props.appData);
    const rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    console.log('RestMenu | deleteSubMenu | rest', rest);
    const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
    console.log('RestMenu | deleteSubMenu | menu', menu);
    // this.props.addSubMenu(this.props.appData.data.rests[rest].menus[menu]._id, 'test');
  }

  render() {
    console.log('RestMenu | render | this.props.appData', this.props.appData);
    console.log('RestMenu | render | this.props.params', this.props.params);
    console.log('RestMenu | render | this.props.appData.data.dishes', this.props.appData.data.dishes);
    const rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    console.log('RestMenu | componentDidMount | rest', rest);
    const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
    console.log('RestMenu | render | menu', menu);
    console.log('RestMenu | render | this.props.appData.data.rests[rest].menus[menu].subMenus', this.props.appData.data.rests[rest].menus[menu]);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes) {
      return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <img src={ src } />
          </div>
        </div>
      )
    } else {
      let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
      if (!subMenus) {
        return (
          <div id="restMenu" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>Restaurants:</div>
            <div className="panel-body">
              <img src={ src } />
            </div>
          </div>
        )
      } else {
        return (
          <SubMenuManager subMenus={subMenus}
                          dishes={this.props.appData.data.dishes}
                          rest={this.props.appData.data.rests[rest]}
                          menu={this.props.appData.data.rests[rest].menus[menu]}
                          delSubMenu = {this.props.deleteSubMenu}
                          editSubMenu = {this.props.editSubMenu}
                          addSubMenu = {this.props.addSubMenu}
          />
        );
      }
    }
  }
}

export default RestMenu;
