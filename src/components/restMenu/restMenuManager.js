/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfRestMenus from './ListOfRestMenus';

class restMenuManager extends React.Component {
  constructor(props) {
    console.log('restMenuManager | constructor', props);
    super(props);
    this.addRestMenu = this.addRestMenu.bind(this);
  }

  addRestMenu() {
    console.log('restMenuManager | addRestMenu');
  }

  render() {
    console.log('restMenuManager | props', this.props);
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
    return (
      <div>
        {this.props.exit}
        Menus:
        <ListOfRestMenus menus={this.props.menus}/>
      </div>
    )

  }
}

export default restMenuManager;
