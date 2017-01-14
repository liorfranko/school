/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
import Example from './test'
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
    const rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    console.log('RestMenu | componentDidMount | rest', rest);
    const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name == this.props.params.menuName);
    console.log('RestMenu | componentDidMount | menu', menu);
    if (!this.props.appData.data.rests[rest].menus[menu].subMenus || !this.props.appData.data.dishes) {
      // FIXME
      return (
        <div>Loading
          <a onClick={this.addSubMenu} className="innerItem">Add Submenu</a>
          <a onClick={this.editSubMenu} className="innerItem">Edit Submenu</a>
        </div>
      )
    } else {
      return (
        <div id="subMenu">RestMenu
          Name: {this.props.params.menuName}
          <SubMenuManager subMenus={this.props.appData.data.rests[rest].menus[menu].subMenus}
                          dishes={this.props.appData.data.dishes}
                          delSubMenu = {this.props.deleteSubMenu}
                          editSubMenu = {this.props.editSubMenu}
          />
          <a onClick={this.addSubMenu} className="innerItem">Add Submenu</a>
          {/*<ul className="subMenuList list-group">*/}
            {/*<li className="subMenuItem list-group-item">*/}
              {/*{*/}
                {/*this.props.appData.data.rests[rest].menus[menu].subMenus.map((subMenu, i) => {*/}
                  {/*console.log('RestMenu | render | subMenu.dishArray', subMenu.dishArray);*/}
                  {/*if (subMenu.dishArray == null) {*/}
                    {/*console.log('RestMenu | render | dishArray is null');*/}
                    {/*let count;*/}
                    {/*let indents = [];*/}
                    {/*for (count = 0; count < 13; count++) {*/}
                      {/*indents.push(*/}
                        {/*<div key={count} className="innerItem">*/}
                          {/*<div className="innerItem"> Dish name</div>*/}
                          {/*<div className="innerItem"> Dish description</div>*/}
                          {/*<div className="innerItem"> Dish price</div>*/}
                          {/*<div className="innerItem"> Edit</div>*/}
                          {/*<div className="innerItem"> Delete</div>*/}
                        {/*</div>*/}
                      {/*)*/}
                    {/*}*/}
                    {/*return (*/}
                      {/*<div key={i} className="innerItem sub">*/}
                        {/*{subMenu.name}*/}
                        {/*{indents}*/}
                        {/*<a onClick={this.editSubMenu} className="innerItem">Edit Submenu</a>*/}
                        {/*<a onClick={this.deleteSubMenu} className="innerItem">Delete Submenu</a>*/}
                      {/*</div>*/}
                    {/*);*/}
                  {/*} else {*/}
                    {/*console.log('RestMenu | render | dishArray is not null')*/}
                  {/*}*/}
                {/*})*/}
              {/*}*/}
            {/*</li>*/}

          {/*</ul>*/}
        </div>
      )
    }


  }
}

export default RestMenu;
