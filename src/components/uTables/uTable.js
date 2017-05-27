/**
 * Created by liorf on 4/17/17.
 */
import React from 'react';
// import OrderManager from '../uOrders/uOrderManager'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RestMenuManager from '../uRestMenus/uRestMenuManager'
// import Container from './Container';
//FIXME Need to add: check if there is open order if so go to this order, if not create new order for that table.

class uTable extends React.Component {
  constructor(props) {
    // console.log('uTable | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

  }

  componentDidMount() {
    // console.log('uTable | componentDidMount', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('uTable | componentDidMount | rest', rest);
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      } else {
        // console.log('uTable | componentDidMount | this.props.params.tableName', this.props.params.tableName);
        let table = this.props.appData.data.rests[rest].tables.findIndex(x => x.tableNum == this.props.params.tableName);
        // console.log('uTable | componentDidMount | table', table);
        let tableId = this.props.appData.data.rests[rest].tables[table]._id;
        // console.log('uTable | componentDidMount | tableId', tableId);
        if (!this.props.appData.data.rests[rest].tables[table].orders) {
          // console.log('uTable | componentDidMount | getOrdersByTableId');
          this.props.getOrdersByTableId(tableId);
        } else {
          let maxDate = new Date('1970/01/01');
          let activeOrder = {};
          this.props.appData.data.rests[rest].tables[table].orders.map((order, i) => {
            // console.log('uTable | componentDidMount | order', order);
            let date = Date.parse(order['date']);
            // console.log('uTable | componentDidMount | maxDate', maxDate);
            // console.log('uTable | componentDidMount | date', date);
            if (!maxDate) {
              maxDate = date
            } else {
              if (date > maxDate) {
                maxDate = new Date(date);
                activeOrder = order
              }
            }
          });
          // console.log('uTable | componentDidMount | Last date is:', maxDate);
          // console.log('uTable | componentDidMount | activeOrder', activeOrder);
          this.setState({
            activeOrder: activeOrder,
          });
        }
      }
      if (!this.props.appData.data.dishes) {
        // console.log('uTable | componentDidMount | getDishesUid()');
        this.props.getDishesUid(this.props.appData.data.rests[rest].userId);
      } else {
        let available_dishes = [];
        // console.log('uTable | componentDidMount | dishes', this.props.appData.data.dishes);
        this.props.appData.data.dishes.map((dish, i) => {
          // console.log('uTable | componentDidMount | dish', dish);
          available_dishes.push({id: i, dish: dish});
        });
        // console.log('uTable | componentDidMount | available_dishes', available_dishes);
        this.setState({
          available_dishes: available_dishes,
        });
      }


      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        this.setState({
          menus: this.props.appData.data.rests[rest].menus,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('uTable | componentWillReceiveProps | nextProps', nextProps);
    // console.log('uTable | componentWillReceiveProps | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('uTable | componentWillReceiveProps | rest', rest);
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      } else {
        // console.log('uTable | componentWillReceiveProps | this.props.params.tableName', this.props.params.tableName);
        let table = this.props.appData.data.rests[rest].tables.findIndex(x => x.tableNum == this.props.params.tableName);
        // console.log('uTable | componentWillReceiveProps | table', table);
        let tableId = this.props.appData.data.rests[rest].tables[table]._id;
        // console.log('uTable | componentWillReceiveProps | tableId', tableId);
        if (!this.props.appData.data.rests[rest].tables[table].orders) {
          // console.log('uTable | componentWillReceiveProps | getOrdersByTableId');
          // this.props.getOrdersByTableId(tableId);
        } else {
          let maxDate = new Date('1970/01/01');
          let activeOrder = {};
          this.props.appData.data.rests[rest].tables[table].orders.map((order, i) => {
            // console.log('uTable | componentWillReceiveProps | order', order);
            let date = Date.parse(order['date']);
            // console.log('uTable | componentWillReceiveProps | maxDate', maxDate);
            // console.log('uTable | componentWillReceiveProps | date', date);
            if (!maxDate) {
              maxDate = date
            } else {
              if (date > maxDate) {
                maxDate = new Date(date);
                activeOrder = order
              }
            }
          });
          // console.log('uTable | componentWillReceiveProps | Last date is:', maxDate);
          // console.log('uTable | componentWillReceiveProps | activeOrder', activeOrder);
          this.setState({
            activeOrder: activeOrder,
          });
        }
      }
      if (!this.props.appData.data.dishes) {
        // console.log('uTable | componentWillReceiveProps | getDishesUid()');
        this.props.getDishesUid(this.props.appData.data.rests[rest].userId);
      } else {
        // console.log('uTable | componentWillReceiveProps | dishes', this.props.appData.data.dishes);

        let available_dishes = [];
        this.props.appData.data.dishes.map((dish, i) => {
          // console.log('uTable | componentWillReceiveProps | dish', dish);
          available_dishes.push({id: i, dish: dish});
          // console.log('RestSubMenu | componentDidMount |check if dish exists', $.inArray(dish._id, dishArray));
          // if ($.inArray(dish._id, dishArray) === -1) {
          //   // console.log('Dish exists');
          //   available_dishes.push({id: i, dish: dish})
          // }
        });
        // console.log('uTable | componentWillReceiveProps | available_dishes', available_dishes);
        this.setState({
          available_dishes: available_dishes,
        });
      }
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        this.setState({
          menus: this.props.appData.data.rests[rest].menus,
        });
      }
    }
  }

  render() {
    // console.log('uTable | render | this.props', this.props);
    // console.log('uTable | render | this.state', this.state);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.state || !this.state.activeOrder || !this.state.menus) {
      return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <img src={ src }/>
          </div>
        </div>
      )
    } else {

      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      let table = this.props.appData.data.rests[rest].tables.findIndex(x => x.tableNum == this.props.params.tableName);
      // console.log('uTable | render | this.props.appData.data.rests[rest].tables[table].orders', this.props.appData.data.rests[rest].tables[table].orders);
      return (
      <RestMenuManager
        rest={this.props.appData.data.rests[rest]}
        menus ={this.state.menus}
        // order={this.state.activeOrder}
        table={this.props.appData.data.rests[rest].tables[table].tableNum}
      />
      );
    }
  }
}
export default DragDropContext(HTML5Backend)(uTable);
