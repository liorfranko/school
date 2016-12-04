/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import ListOfDishes from '../Dishes/ListOfDishes';
import ListOfRestMenus from './ListOfRestMenus'

class restMenuManager extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addRestMenu = this.addRestMenu.bind(this);
  }

  componentDidMount() {
    console.log('restMenuManager | componentDidMount', this.props);
    if (!this.props.restManagerData.appData.data.dishes) {
      this.props.restManagerData.getDishes();
    }
  }

  addRestMenu() {
    console.log('restMenuManager | addRestMenu');
  }

  render() {
    console.log('restMenuManager | props', this.props.restManagerData.appData);
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
    if (!this.props.restManagerData.appData.data.dishes) {
      console.log('loading');
      return (
        <div>loading</div>
      )
    } else {
      return (
        <div>
          {this.props.exit}
          Edit Menu:

        </div>
      )
    }

  }
}

export default restMenuManager;
