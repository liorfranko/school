/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfRestMenus from './ListOfRestMenus';
import AddRestMenu from './AddRestMenu'
import EditRestMenu from './EditRestMenu'
import Popup from '../Popup/popup';
import './restMenu.styl';

class restMenuManager extends React.Component {
  constructor(props) {
    // console.log('restMenuManager | constructor', props);
    super(props);
    this.exitPopup = this.exitPopup.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);
    this.editRestMenu = this.editRestMenu.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.state = {
      mode: 'main',
      rest: {}
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
      mode: 'add'
    });
  };
  editRestMenu(data) {
    // console.log('restMenuManager | editRestMenu | data', data);
    this.setState({mode: 'edit', rest: data.item});

  };
  handleAddClick(...data) {
    // console.log('restMenuManager | handleAddClick this.props', this.props);
    this.props.addRestMenu(...data);
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
      case 'edit':
        return (
          <Popup exitPopup={this.exitPopup.bind(this)}>
            <EditRestMenu handleClick={this.handleAddClick.bind(this)}  rest={this.state.rest}/>
          </Popup>
        );
      default:
        return (
          <div id="restMenu">
            Menus:
            <ListOfRestMenus menus={this.props.menus} editRestMenu={this.editRestMenu} rest={this.props.rest}/>
            <a onClick={this.addRestMenu}>Add Menu</a>
          </div>
        )
    }
  }
}

export default restMenuManager;
