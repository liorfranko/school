/**
 * Created by liorf on 4/17/17.
 */

import React from 'react';
import ListOfRestaurants from './ListOfuRestaurants';
import './rests.styl';

class uRestaurantsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRes: 0,
    };
  }

  componentDidMount() {
    // console.log('RestaurantsManager | componentDidMount', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    }
  }

  render() {
    console.log('uRestaurants Manager | this.props', this.props);
    console.log('uRestaurants Manager | this.state', this.state);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.rests) {
      console.log('uRestaurantsManager | loading');
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <img src={ src }/>
          </div>
        </div>
      )
    } else {
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <ListOfRestaurants rests={this.props.appData.data.rests}
            />
          </div>
        </div>

      );
    }

  }
}

export default uRestaurantsManager;
