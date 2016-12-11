/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfRestMenus from './ListOfRestMenus';
import AddRestMenu from './AddRestMenu'
import DeleteRestMenu from './DeleteRestMenu'
import Popup from '../Popup/popup';
import './restMenu.styl';

class restMenuManager extends React.Component {
  constructor(props) {
    console.log('restMenuManager | constructor', props);
    super(props);
    this.exitPopup = this.exitPopup.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);
    this.deleteRestMenu = this.deleteRestMenu.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.state = {
      mode: 'main'
    }
  }
  exitPopup() {
    this.setState({
      mode: 'main'
    });
  };

  addRestMenu() {
    // console.log('restMenuManager | addRestMenu');
    this.setState({
      mode: 'add',
      chosenMenu: null
    });
  };

  deleteRestMenu(data) {
    console.log('restMenuManager | deleteRestMenu | data', data);
    this.setState({
      mode: 'delete',
      chosenMenu: data
    });

  };
  handleAddClick(...data) {
    // console.log('restMenuManager | handleAddClick this.props', this.props);
    this.props.addRestMenu(...data);
    this.setState({mode: 'main'});
  }

  handleDeleteClick(...data) {
    console.log('restMenuManager | handleDeleteClick this.props', data);
    this.props.deleteRestMenu(...data);
    this.setState({mode: 'main'});
  }
  render() {
    // console.log('restMenuManager | props', this.props);
    // console.log('restMenuManager | this.state', this.state);
    switch (this.state.mode) {
      case 'add':
        return (
          <Popup exitPopup={this.exitPopup.bind(this)}>
            <AddRestMenu handleClick={this.handleAddClick.bind(this)} rest={this.props.rest}/>
          </Popup>
        );
      case 'delete':
        return (
          <Popup exitPopup={this.exitPopup.bind(this)}>
            <DeleteRestMenu handleClick={this.handleDeleteClick.bind(this)}  rest={this.props.rest} chosenMenu={this.state.chosenMenu}/>
          </Popup>
        );
      default:
        return (
          <div id="restMenu">
            Menus:
            <ListOfRestMenus menus={this.props.menus} deleteRestMenu={this.deleteRestMenu} rest={this.props.rest}/>
            <a onClick={this.addRestMenu}>Add Menu</a>
          </div>
        )
    }
  }
}

export default restMenuManager;
