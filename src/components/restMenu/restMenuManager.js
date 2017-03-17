/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfRestMenus from './ListOfRestMenus';
import AddRestMenu from './AddRestMenu'
import DeleteRestMenu from './DeleteRestMenu'
import Popup from '../Popup/popup';
import './restMenu.styl';
import {Button} from 'react-bootstrap';

class restMenuManager extends React.Component {
  constructor(props) {
    // console.log('restMenuManager | constructor', props);
    super(props);
    this.exitPopup = this.exitPopup.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);
    this.deleteRestMenu = this.deleteRestMenu.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      selectedMenu: 0
    }
  }

  exitPopup() {
    this.setState({
      showAddModal: false,
      showDeleteModal: false
    });
  };

  addRestMenu() {
    // console.log('restMenuManager | addRestMenu');
    this.setState({
      showAddModal: true
    });
  };

  deleteRestMenu(data) {
    // console.log('restMenuManager | deleteRestMenu | data', data);
    this.setState({
      showDeleteModal: true,
      selectedMenu: data
    });

  };

  openRestMenu(data) {
    // console.log('restMenuManager | openRestMenu, data', data);
    this.setState({
      mode: 'restaurant',
      selectedMenu: data
    });
  }
  handleAddClick(...data) {
    // console.log('restMenuManager | handleAddClick this.props', this.props);
    this.props.addRestMenu(...data);
    this.setState({
      showAddModal: false,
    });
  }

  handleDeleteClick(...data) {
    // console.log('restMenuManager | handleDeleteClick this.props', data);
    this.props.deleteRestMenu(...data);
    this.setState({
      selectedMenu: 0,
      showDeleteModal: false
    });
  }

  render() {
    // console.log('restMenuManager | props', this.props);
    // console.log('restMenuManager | this.state', this.state);
    let styleDiv = {
      fontSize: 30
    };
    return (
      <div id="restMenu" className="panel panel-default">
        <div className="panel-heading" style={styleDiv}>Restaurants Manager</div>
        <div className="panel-body">
          <ListOfRestMenus menus={this.props.menus}
                           rest={this.props.rest}
                           deleteRestMenu={this.deleteRestMenu}
          />
          <AddRestMenu handleClick={this.handleAddClick.bind(this)}
                       rest={this.props.rest}
                       exit={this.exitPopup.bind(this)}
                       show={this.state.showAddModal}/>
          <Button onClick={this.addRestMenu}>Add Menu</Button>
          <DeleteRestMenu chosenMenu={this.props.menus[this.state.selectedMenu]}
                          handleClick={this.handleDeleteClick.bind(this)}
                          exit={this.exitPopup.bind(this)}
                          show={this.state.showDeleteModal}
          />
        </div>
      </div>

    )
  }
}

export default restMenuManager;
