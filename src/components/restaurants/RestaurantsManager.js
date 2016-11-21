/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import ListOfRestaurants from './ListOfRestaurants';
import * as $ from 'jquery';
import './rests.styl';
// import Popup
// import EditRest
class RestaurantsManager extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rests: props.appData.rests || []
    };
    
    this.editRest = this.editRest.bind(this);
  }
  
  componentDidMount() {
    // TODO: Ajax to load rests
    const uid = '5826fdc1680d800d2064d1da';
  
    if (!this.props.appData.rests) {
      this.getRests(uid);
    }
  }
  
  getRests(uid) {
    // TODO: Ajax to fetch
    const options = {
      url: 'http://35.156.80.173/WebService1.asmx/getRestaurants',
      data: {
        user_Id: uid
      }
    };
    
    $.post(options, (data) => {
      const items = JSON.parse(data).items || [];
      console.log('getRests data', data);
      console.log('data.items', items);
      
      this.setState({
        rests: items
      });
      this.props.updateState({rests: items});
      
    });
  }
  deleteRest() {
    // TODO: Ajax to delete
  }
  
  editRest() {
    // TODO: Ajax to edit
    alert('editRest');
  }
  
  addRest() {
    // TODO: Ajax to add
  }
  
  render() {
    console.log('Restaurants Manager | this.props', this.props);
    
    return (
      <div id="rests">
        <span>
          Restaurants Manager
        </span>
        <ListOfRestaurants rests={this.state.rests} editRest={this.editRest}/>
      </div>
    )
  }
} ;

export default RestaurantsManager;
/*

componentDidMount() {
  var json = {
    userId: '5826fdc1680d800d2064d1da',
  };
  this.postDataToServer('getRestaurants', 'user_Id=' + json.userId)
}

postDataToServer(url, data) {
  var $ = require('jquery');
  $.post({
    url: 'http://35.156.80.173/WebService1.asmx/getRestaurants' + url,
    dataType: 'json',
    cache: false,
    data: data,
    success: function (data) {
      this.setState({resList: data});
      this.setState({loading: false});
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(url, status, err.toString());
      alert('there is some problems loading data, please check the logs')
    }.bind(this)
  });
}
*/
