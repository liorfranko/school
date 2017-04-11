/**
 * Created by liorf on 12/17/16.
 */
import React from 'react';
import ListOfSubMenus from './ListOfSubMenus'
import {Button} from 'react-bootstrap';
import AddRestSubMenu from './AddRestSubMenu'
import DeleteRestSubMenu from './DeleteRestSubMenu'
import './subMenu.styl';

class subMenuManager extends React.Component {
  constructor(props) {
    // console.log('subMenuManager | constructor', props);
    super(props);
    this.exitPopup = this.exitPopup.bind(this);
    this.addRestSubMenu = this.addRestSubMenu.bind(this);
    this.deleteRestSubMenu = this.deleteRestSubMenu.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      selectedSubMenu: 0
    }
  }

  exitPopup() {
    this.setState({
      showAddModal: false,
      showDeleteModal: false,
      selectedSubMenu: 0
    });
  };

  addRestSubMenu() {
    // console.log('subMenuManager | addRestSubMenu');
    this.setState({
      showAddModal: true
    });
  };

  deleteRestSubMenu(data) {
    // console.log('subMenuManager | deleteRestSubMenu | data', data);
    this.setState({
      showDeleteModal: true,
      selectedSubMenu: data
    });
  };

  handleAddClick(...data) {
    // console.log('subMenuManager | handleAddClick this.props', this.props);
    this.props.addSubMenu(...data);
    this.setState({
      showAddModal: false
    });
  }

  handleDeleteClick(...data) {
    // console.log('subMenuManager | handleDeleteClick this.props', data);
    this.props.delSubMenu(...data);
    this.setState({
      selectedSubMenu: 0,
      showDeleteModal: false
    });
  }

  render() {
    // console.log('subMenuManager | render | this.props', this.props);
    // console.log('subMenuManager | render | this.state', this.state);
    const styleDiv = {
      fontSize: 30
    };
    return (
      <div id="subMenu" className="panel panel-default">
        <div className="panel-heading" style={styleDiv}>{this.props.menu['name']}</div>
        <div className="panel-body">
          Sub Menus:
          <ListOfSubMenus
            subMenus={this.props.subMenus}
            dishes={this.props.dishes}
            delSubMenu={this.deleteRestSubMenu}
            rest={this.props.rest}
            menu={this.props.menu}
          />
          <AddRestSubMenu
            handleClick={this.handleAddClick.bind(this)}
            exit={this.exitPopup.bind(this)}
            show={this.state.showAddModal}
            menu={this.props.menu}
          />
          <Button onClick={this.addRestSubMenu}>Add Sub Menu</Button>
          <DeleteRestSubMenu
            chosenSubMenu={this.props.subMenus[this.state.selectedSubMenu]}
            handleClick={this.handleDeleteClick.bind(this)}
            exit={this.exitPopup.bind(this)}
            show={this.state.showDeleteModal}
          />
        </div>
      </div>
    )

  }
}

export default subMenuManager;
