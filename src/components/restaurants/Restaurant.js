/**
 * Created by liorf on 12/4/16.
 */


import React from 'react';
import RestMenuManager from '../restMenu/restMenuManager';
import TableManager from '../Tables/tableManager';
import PropTypes from 'prop-types';

class Restaurant extends React.Component {
  constructor(props) {
    console.log('Restaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
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
      this.forceUpdate();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name===this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
        this.forceUpdate();
      }
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
        this.forceUpdate();
      }
    }
  }

  recursiveCloneChildren(children) {
    return React.Children.map(children, child => {
      let childProps = {};
      if (React.isValidElement(child)) {
        childProps = {
          appData: this.props.appData,
          getDishes: this.props.getDishes,
          getSubMenus: this.props.getSubMenus,
          editSubMenu: this.props.editSubMenu,
          getRests: this.props.getRests,
          getMenus: this.props.getMenus,
        };
      }
      childProps.children = this.recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    })
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
            <img src={src}/>
          </div>
        </div>
      );
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus || !this.props.appData.data.rests[rest].tables) {
        return (
          <div id="rests" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>Restaurants:</div>
            <div className="panel-body">
              <img src={src}/>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            {this.props.params.menuName ? this.recursiveCloneChildren(this.props.children) : (
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
                  publicDns={this.props.publicDns}
                />
              </div>
              )
            }
          </div>
        );
      }
    }
  }
}

Restaurant.propTypes = {
  appData: PropTypes.object,
  getRests: PropTypes.func,
  getDishes: PropTypes.func,
  getMenus: PropTypes.func,
  getSubMenus: PropTypes.func,
  getTables: PropTypes.func,
  addRest: PropTypes.func,
  addDish: PropTypes.func,
  addSubMenu: PropTypes.func,
  addTable: PropTypes.func,
  editRest: PropTypes.func,
  editDish: PropTypes.func,
  editRestMenu: PropTypes.func,
  editSubMenu: PropTypes.func,
  editTable: PropTypes.func,
  deleteRest: PropTypes.func,
  deleteDish: PropTypes.func,
  deleteRestMenu: PropTypes.func,
  deleteSubMenu: PropTypes.func,
  deleteTable: PropTypes.func,
  params: PropTypes.object,
  publicDns: PropTypes.string
};

export default Restaurant;
