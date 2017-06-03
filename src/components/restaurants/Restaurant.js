/**
 * Created by liorf on 12/4/16.
 */


import React from 'react';
import RestMenuManager from '../restMenu/restMenuManager'
import TableManager from '../Tables/tableManager'

class Restaurant extends React.Component {
  constructor(props) {
    // console.log('Restaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentDidMount() {
    // console.log('Restaurant | componentDidMount', this.props);
    // let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);

    // console.log('Restaurant | componentDidMount | rest', rest);
    // console.log('Restaurant | componentDidMount | this.props.appData.data.rests[rest].menus', this.props.appData.data.rests[rest]);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
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
    // console.log('Restaurant | componentWillReceiveProps | nextProps', nextProps);
    // console.log('Restaurant | componentWillReceiveProps | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
      this.forceUpdate()
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name===this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
        this.forceUpdate()
      }
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
        this.forceUpdate()
      }
    }
  }

  render() {
    // console.log('Restaurant | render |this.props', this.props);
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
        return (
          <div>
            <RestMenuManager rest={this.props.appData.data.rests[rest]}
                             menus={this.props.appData.data.rests[rest].menus}
                             addRestMenu={this.props.addRestMenu}
                             deleteRestMenu={this.props.deleteRestMenu}
            />
            <TableManager
              rest={this.props.appData.data.rests[rest]}
              tables={this.props.appData.data.rests[rest].tables}
              addTable={this.props.addTable}
              deleteTable={this.props.deleteTable}
              editTable={this.props.editTable}
            />
          </div>
        )
      }
    }
  }
}

export default Restaurant;
