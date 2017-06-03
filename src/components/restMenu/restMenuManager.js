/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfRestMenus from './ListOfRestMenus';
import AddRestMenu from './AddRestMenu';
import DeleteRestMenu from './DeleteRestMenu';
import './restMenu.styl';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

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
    };
  }

  exitPopup() {
    this.setState({
      showAddModal: false,
      showDeleteModal: false,
      selectedMenu: 0
    });
  }

  addRestMenu() {
    // console.log('restMenuManager | addRestMenu');
    this.setState({
      showAddModal: true
    });
  }

  deleteRestMenu(data) {
    // console.log('restMenuManager | deleteRestMenu | data', data);
    this.setState({
      showDeleteModal: true,
      selectedMenu: data
    });
  }

  handleAddClick(...data) {
    // console.log('restMenuManager | handleAddClick this.props', this.props);
    this.props.addRestMenu(...data);
    this.setState({
      showAddModal: false
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
        <div className="panel-heading" style={styleDiv}>{this.props.rest.name}</div>
        <div className="panel-body">
          Menus:
          <ListOfRestMenus menus={this.props.menus}
                           rest={this.props.rest}
                           deleteRestMenu={this.deleteRestMenu}
          />
          <AddRestMenu handleClick={this.handleAddClick}
                       rest={this.props.rest}
                       exit={this.exitPopup}
                       show={this.state.showAddModal}
          />
          <Button onClick={this.addRestMenu}>Add Menu</Button>
          <DeleteRestMenu chosenMenu={this.props.menus[this.state.selectedMenu]}
                          handleClick={this.handleDeleteClick}
                          exit={this.exitPopup}
                          show={this.state.showDeleteModal}
          />
        </div>
      </div>
    );
  }
}
restMenuManager.propTypes = {
  addRestMenu: PropTypes.func,
  deleteRestMenu: PropTypes.func,
  rest: PropTypes.object,
  menus: PropTypes.array
};
export default restMenuManager;
