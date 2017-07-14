/**
 * Created by liorf on 12/4/16.
 */

import React from 'react';
import PropTypes from 'prop-types';
import EditTable from '../../components/EditTable';
import CircularProgress from 'material-ui/CircularProgress';

class Restaurant extends React.Component {
  constructor(props) {
    // console.log('Restaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
    this.onChangeMenu = this.onChangeMenu.bind(this);
    this.onChangeTable = this.onChangeTable.bind(this);
    this.onDeleteMenu = this.onDeleteMenu.bind(this);
    this.onDeleteTable = this.onDeleteTable.bind(this);
  }

  componentDidMount() {
    // console.log('Restaurant | componentDidMount', this.props);
    // let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);

    // console.log('Restaurant | componentDidMount | rest', rest);
    // console.log('Restaurant | componentDidMount | this.props.appData.data.rests[rest].menus', this.props.appData.data.rests[rest]);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      }
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    // console.log('Restaurant | componentWillReceiveProps | nextProps', nextProps);
    // console.log('Restaurant | componentWillReceiveProps | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      }
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      }
    }
    this.forceUpdate();
  }

  recursiveCloneChildren(children) {
    // console.log('Restaurant | recursiveCloneChildren | this.props.appData', this.props.appData);
    return React.Children.map(children, child => {
      let childProps = {};
      if (React.isValidElement(child)) {
        childProps = {
          appData: this.props.appData,
          getDishes: this.props.getDishes,
          getSubMenus: this.props.getSubMenus,
          editSubMenu: this.props.editSubMenu,
          addSubMenu: this.props.addSubMenu,
          deleteSubMenu: this.props.deleteSubMenu,
          getRests: this.props.getRests,
          getMenus: this.props.getMenus,
        };
      }
      childProps.children = this.recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    })
  }

  onChangeMenu(row) {
    // console.log('RestaurantsManager | onChange | row is:', row);
    for (let i = 0; i < row.columns.length; i++) {
      // console.log('DishesManager | onChange | row is: ', row.columns[i]);
      if (row.columns[i].id === 0) {
        // console.log('DishesManager | onChange | row is: name');
        if (row.columns[i].value === "") {
          // console.log('DishesManager | onChange | row is empty');
          alert('Name can\'t empty.');
          return false
        }
      }
    }
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    let rest_id = this.props.appData.data.rests[rest]._id;
    if (row.columns[1]) {
      let data = {
        _id: row.columns[0].value,
        restaurantId: rest_id,
      };
      this.props.deleteRestMenu(data);
      this.props.addRestMenu({resMenuName: row.columns[0].value}, rest_id);
    } else {
      this.props.addRestMenu({resMenuName: row.columns[0].value}, rest_id);
    }

    return true
  }

  onDeleteMenu(e) {
    // console.log('Restaurant | onDelete', this.props);
    // console.log('Restaurant | onDelete | e', e);

    // let Menu = this.props.appData.data.rests[e.rowId];
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    let rest_id = this.props.appData.data.rests[rest]._id;
    // console.log('Restaurant | onDelete | rest', rest);
    let menu = this.props.appData.data.rests[rest].menus[e.rowId];
    // console.log('Restaurant | onDelete | Menu', Menu);

    // let Menu = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    // let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    if (menu) {
      let data = {
        _id: menu._id,
        restaurantId: rest_id,
      };
      this.props.deleteRestMenu(data);
    }
  }

  onChangeTable(row) {
    // console.log('Restaurant | onChangeTable | row is:', row);
    for (let i = 0; i < row.columns.length; i++) {
      // console.log('DishesManager | onChange | row is: ', row.columns[i]);
      if (row.columns[i].id === 0) {
        // console.log('DishesManager | onChange | row is: name');
        if (row.columns[i].value === "") {
          // console.log('DishesManager | onChange | row is empty');
          alert('Table number can\'t empty.');
          return false
        } else {
          if (isNaN(row.columns[i].value)) {
            alert('Table number is invalid \'' + row.columns[i].value + '\'.');
            return false
          }
        }
      }
    }
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    let rest_id = this.props.appData.data.rests[rest]._id;
    //addTable
    if (row.columns[1]) {
      let data = {
        restaurantId: rest_id,
        _id: row.columns[0].value,
      };
      this.props.deleteTable(data);
      this.props.addTable({tableNum: row.columns[0].value, _id: rest_id });
    } else {
      this.props.addTable({tableNum: row.columns[0].value, _id: rest_id});
    }
    return true

  }

  onDeleteTable(e) {
    // console.log('Restaurant | onDeleteTable | e', e);
    let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    let rest_id = this.props.appData.data.rests[rest]._id;
    // console.log('Restaurant | onDeleteTable | tables', this.props.appData.data.rests[rest].tables);
    let table = this.props.appData.data.rests[rest].tables[e.rowId];
    // console.log('Restaurant | onDeleteTable | table', table);
    if (table) {
      let data = {
        restaurantId: rest_id,
        _id: table._id,
      };
      this.props.deleteTable(data);
    }
  }

  render() {
    // console.log('Restaurant | render | this.props', this.props);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.rests) {
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      );
    } else if(this.props.params.tableNum) {
      return <div>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child, {
          appData: this.props.appData,
          getDishes: this.props.getDishes,
          getSubMenus: this.props.getSubMenus,
          editSubMenu: this.props.editSubMenu,
          addSubMenu: this.props.addSubMenu,
          deleteSubMenu: this.props.deleteSubMenu,
          getRests: this.props.getRests,
          getMenus: this.props.getMenus,
          publicDns: this.props.publicDns
        }))}
      </div>
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus || !this.props.appData.data.rests[rest].tables) {
        return (
          <div id="rests" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>Restaurants:</div>
            <div className="panel-body">
              <CircularProgress />
            </div>
          </div>
        );
      } else {
        const menus_headers = [
          {value: 'Name', type: 'TextField'},
        ];
        const tables_headers = [
          {value: 'Number', type: 'TextField'},
        ];
        let rest_name = this.props.appData.data.rests[rest].name;
        let menus_rows = [];
        let tables_rows = [];
        this.props.appData.data.rests[rest].menus.map((row, index) => {
          menus_rows.push(
            {
              columns: [
                {value: row.name, field: 'name', required: true},
                {value: row._id, field: 'id', hidden: true},
                {value: `/Admin/Restaurants/${rest_name}/Menus/${row.name}`, field: 'Link', link: true, hidden: true}
              ]
            }
          )
        });
        this.props.appData.data.rests[rest].tables.map((row, index) => {
          tables_rows.push(
            {
              columns: [
                {value: row.tableNum, field: 'name', required: true},
                {value: row._id, field: 'id', hidden: true},
                {value: `/Admin/Restaurants/${rest_name}/Table/${row.tableNum}`, field: 'Link', link: true, hidden: true}
              ]
            }
          )
        });
        return (
          <div>
            {this.props.params.menuName ? this.recursiveCloneChildren(this.props.children) : (
              <div id="rests" className="panel panel-default">
                <div className="panel-heading" style={styleDiv}>Menus</div>
                <div className="panel-body">
                  <EditTable
                    onChange={this.onChangeMenu}
                    onDelete={this.onDeleteMenu}
                    rows={menus_rows}
                    headerColumns={menus_headers}
                    enableDelete={true}
                  />
                </div>
                <div className="panel-heading" style={styleDiv}>Tables</div>
                <div className="panel-body">
                  <EditTable
                    onChange={this.onChangeTable}
                    onDelete={this.onDeleteTable}
                    rows={tables_rows}
                    headerColumns={tables_headers}
                    enableDelete={true}
                  />
                </div>
              </div>
            )}
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
