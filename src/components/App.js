/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import Menu from './menu/Menu';
import api from '../api/API'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '5826fdc1680d800d2064d1da',
      data: {},
      loading: true
    };

    // this.updateState = this.updateState.bind(this);
    this.updateRest = this.updateRest.bind(this);
    this.getRests = this.getRests.bind(this);
    this.deleteRest = this.deleteRest.bind(this);
    this.addRest = this.addRest.bind(this);
    this.editRest = this.editRest.bind(this);
  }

  updateRest(data) {
    // console.log('App | updateRest data', data);
    const items = JSON.parse(data).items || [];
    // console.log('App | updateRest', items);
    this.setState({
      data: {rests: items},
      loading: false
    });

  }


  getRests() {
    // console.log("App | getRests");
    this.setState({loading: true});
    var data = {
      user_Id: this.state.uid
    };
    api.postRequest('getRestaurants', data, this.updateRest);
  }

  editRest(data) {
    // console.log('App | editRest', data);
    this.setState({loading: true});
    var postData = '&restaurant_Id=' + data.resId + '&name=' + data.resName + '&address=' + data.resAddress;
    api.postRequest('editRestaurant', postData, this.getRests);
  }

  addRest(data) {
    // console.log('App | addRest', data);
    this.setState({loading: true});
    var postData = '&name=' + data.resName + '&address=' + data.resAddress + '&user_Id=' + this.state.uid;
    api.postRequest('addRestaurant', postData, this.getRests);
  }

  deleteRest(restNum) {
    console.log('App | deleteRest', restNum);
    this.setState({loading: true});
    var postData = '&restaurant_Id=' + this.state.data.rests[restNum]._id + '&user_Id=' + this.state.uid;
    api.postRequest('removeRestaurant', postData, this.getRests);
  }

  render() {
    // console.log('App.js | this.state', this.state);
    return (
      <div className="container">
        <div>Header - Logo + Menu</div>
        <Menu menu={[
          {name: 'homepage', path: '/'}, {name: 'rests', path: 'rests'}, {name: 'dishes', path: 'dishes'}
        ]}/>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child, {
          appData: this.state,
          getRests: this.getRests,
          deleteRest: this.deleteRest,
          addRest: this.addRest,
          editRest: this.editRest,
        }))}
        <div>Footer - links, & other shit</div>
      </div>
    )
  }

}

export
default
App;
