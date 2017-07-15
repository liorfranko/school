/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
import SubMenuManager from '../SubMenus/SubMenuManager';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

// FIXME fix loading submenus when moving between menus.

class RestMenu extends React.Component {
  constructor(props) {
    // console.log('RestMenu | constructor | this.props', props);
    super(props);
    this.addSubMenu = this.addSubMenu.bind(this);
    this.editSubMenu = this.editSubMenu.bind(this);
    this.deleteSubMenu = this.deleteSubMenu.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
  }

  componentDidMount() {
    // console.log('RestMenu | componentDidMount | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      const rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('RestMenu | componentDidMount | rest', rest);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
        // console.log('RestMenu | componentDidMount | menu', menu);
        if (menu > -1 && !this.props.appData.data.rests[rest].menus[menu].subMenus) {
          // console.log('RestMenu | componentDidMount | getSubMenus()');
          this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
        }
        if (!this.props.appData.data.dishes) {
          // console.log('RestMenu | componentDidMount | getDishes()');
          this.props.getDishes();
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('RestMenu | componentWillReceiveProps | nextProps', nextProps);
    // console.log('RestMenu | componentWillReceiveProps | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      const rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('RestMenu | componentDidMount | rest', rest);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
        // console.log('RestMenu | componentDidMount | menu', menu);
        if (menu > -1 && !this.props.appData.data.rests[rest].menus[menu].subMenus) {
          // console.log('RestMenu | componentDidMount | getSubMenus()');
          this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
        }
        if (!this.props.appData.data.dishes) {
          // console.log('RestMenu | componentDidMount | getDishes()');
          this.props.getDishes();
        }
      }
    }
    this.forceUpdate();
  }

  recursiveCloneChildren(children) {
    return React.Children.map(children, child => {
      let childProps = {};
      if (React.isValidElement(child)) {
        childProps = {
          appData: this.props.appData,
          editSubMenu: this.props.editSubMenu,
          updateSubMenuDishes: this.props.updateSubMenuDishes,
          getRests: this.props.getRests,
          getMenus: this.props.getMenus,
          getDishes: this.props.getDishes,
          getSubMenus: this.props.getSubMenus,
        };
      }
      childProps.children = this.recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    })
  }

  addSubMenu() {
    // console.log('RestMenu | addSubmenu | this.props', this.props);
    // let rest = this.props.appData.data.rests.findIndex(x => x.name==this.props.params.restName);
    // console.log('RestMenu | addSubmenu | this.props.appData', this.props.appData);
    const rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    // console.log('RestMenu | addSubmenu | rest', rest);
    const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    // console.log('RestMenu | addSubmenu | menu', menu);
    this.props.addSubMenu(this.props.appData.data.rests[rest].menus[menu]._id, 'test');

  }

  editSubMenu() {
    console.log('RestMenu | editSubMenu | this.props', this.props);
    // this.props.editSubMenu('test');
  }

  deleteSubMenu() {
    // console.log('RestMenu | deleteSubMenu | this.props', this.props);
    // console.log('RestMenu | deleteSubMenu | this.props.appData', this.props.appData);
    // const rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    // console.log('RestMenu | deleteSubMenu | rest', rest);
    // const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    // console.log('RestMenu | deleteSubMenu | menu', menu);
    // this.props.addSubMenu(this.props.appData.data.rests[rest].menus[menu]._id, 'test');
  }

  render() {
    // console.log('RestMenu | render | this.props', this.props);
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes) {
      return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      if (this.props.params.subMenuName) {
        return ( <div>
          {this.recursiveCloneChildren(this.props.children)}
        </div>);
      } else {
        // console.log('RestMenu | render | this.props.appData', this.props.appData);
        // console.log('RestMenu | render | this.props.params', this.props.params);
        // console.log('RestMenu | render | this.props.appData.data.dishes', this.props.appData.data.dishes);
        const rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
        // console.log('RestMenu | componentDidMount | rest', rest);
        const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
        // console.log('RestMenu | render | menu', menu);
        // console.log('RestMenu | render | this.props.appData.data.rests[rest].menus[menu].subMenus', this.props.appData.data.rests[rest].menus[menu]);
        let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
        if (!subMenus) {
          let subMenus = [];
          return (
            <SubMenuManager
              subMenus={subMenus}
              dishes={this.props.appData.data.dishes}
              rest={this.props.appData.data.rests[rest]}
              menu={this.props.appData.data.rests[rest].menus[menu]}
              delSubMenu={this.props.deleteSubMenu}
              updateSubMenuDishes={this.props.updateSubMenuDishes}
              addSubMenu={this.props.addSubMenu}
            />
          );
        } else {
          return (
            <SubMenuManager
              subMenus={subMenus}
              dishes={this.props.appData.data.dishes}
              rest={this.props.appData.data.rests[rest]}
              menu={this.props.appData.data.rests[rest].menus[menu]}
              delSubMenu={this.props.deleteSubMenu}
              updateSubMenuDishes={this.props.updateSubMenuDishes}
              addSubMenu={this.props.addSubMenu}
            />
          );
        }
      }
    }
  }
}

RestMenu.propTypes = {
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
  updateSubMenuDishes: PropTypes.func,
  editTable: PropTypes.func,
  deleteRest: PropTypes.func,
  deleteDish: PropTypes.func,
  deleteRestMenu: PropTypes.func,
  deleteSubMenu: PropTypes.func,
  deleteTable: PropTypes.func,
  params: PropTypes.object,
  publicDns: PropTypes.string
};

export default RestMenu;
