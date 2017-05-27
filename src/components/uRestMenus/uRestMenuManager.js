/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfRestMenus from './uListOfRestMenus';
import './restMenu.styl';

class uRestMenuManager extends React.Component {
  constructor(props) {
    // console.log('uRestMenuManager | constructor', props);
    super(props);
    this.exitPopup = this.exitPopup.bind(this);
    this.state = {
      selectedMenu: 0
    }
  }

  exitPopup() {
    this.setState({
      selectedMenu: 0
    });
  };

  render() {
    // console.log('uRestMenuManager | props', this.props);
    // console.log('uRestMenuManager | this.state', this.state);
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
                           // order={this.props.order}
                           table={this.props.table}

          />
        </div>
      </div>
    )
  }
}

export default uRestMenuManager;
