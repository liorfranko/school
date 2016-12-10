/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfRestMenus from './ListOfRestMenus';
import AddRestMenu from './AddRestMenu'
import EditRestMenu from './EditRestMenu'
import Popup from '../Popup/popup';

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
    console.log('restMenuManager | editRestMenu | data', data);
    var copy = Object.assign({}, data.item);
    this.setState({mode: 'edit', rest: data.item});

  };
  handleAddClick(data) {
    console.log('restMenuManager | handleAddClick');
    this.props.addRestMenu(data);

    // console.log('')
    this.setState({mode: 'main'});
  }

  render() {
    // console.log('restMenuManager | props', this.props);
    console.log('restMenuManager | this.state', this.state);
    var style = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
    };
    var leftStyle = {
      background: 'green',
      width: '70%',
    };
    var rightStyle = {
      background: 'blue',
      width: '30%'
    };
    switch (this.state.mode) {
      case 'add':
        return (
          <Popup exitPopup={this.exitPopup.bind(this)}>
            <AddRestMenu handleClick={this.handleAddClick.bind(this)}/>
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
          <div>
            Menus:
            <ListOfRestMenus menus={this.props.menus} editRestMenu={this.editRestMenu}/>
            <a onClick={this.addRestMenu}>Add Menu</a>
          </div>
        )
    }
  }
}

export default restMenuManager;
