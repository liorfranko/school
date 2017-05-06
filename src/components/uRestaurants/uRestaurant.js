/**
 * Created by liorf on 12/4/16.
 */


import React from 'react';
import TableManager from '../uTables/utableManager';

class uRestaurant extends React.Component {
  constructor(props) {
    // console.log('uRestaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentDidMount() {
    // console.log('uRestaurant | componentDidMount', this.props);
    // let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    // console.log('Restaurant | componentDidMount | rest', rest);
    // console.log('Restaurant | componentDidMount | this.props.appData.data.rests[rest].menus', this.props.appData.data.rests[rest]);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name===this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      }
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      }
    }

  }
  componentWillReceiveProps (nextProps) {
    // console.log('uRestaurant | componentWillReceiveProps | nextProps', nextProps);
    // console.log('uRestaurant | componentWillReceiveProps | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name===this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      }
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      }
    }
  }
  render() {
    // console.log('uRestaurant | render |this.props', this.props);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.rests) {
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <img src={ src }/>
          </div>
        </div>
      )
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus || !this.props.appData.data.rests[rest].tables) {
        return (
          <div id="rests" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>Restaurants:</div>
            <div className="panel-body">
              <img src={ src }/>
            </div>
          </div>
        )
      } else {
        // console.log('uRestaurant | render | Loading page', this.props);
        return (
          <div>
            <TableManager
              rest={this.props.appData.data.rests[rest]}
              tables={this.props.appData.data.rests[rest].tables}
              addOrder={this.props.addOrder}
              // deleteTable={this.props.deleteTable}
              // editTable={this.props.editTable}
            />
          </div>
        )
      }
    }
  }
}

export default uRestaurant;
