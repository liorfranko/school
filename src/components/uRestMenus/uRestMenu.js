/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
import update from 'react/lib/update';
import * as $ from 'jquery';
import {Button} from 'react-bootstrap';

class uRestMenu extends React.Component {
  constructor(props) {
    // console.log('uRestMenu | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.addDishToCart = this.addDishToCart.bind(this);
    this.removeDishFromCart = this.removeDishFromCart.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      subMenus: null,
      order: null,
    };
  }

  componentInit() {
    // console.log('uRestMenu | componentInit | this.props', this.props);
    if (!this.props.appData.data.rests) {
      // console.log('RestMenu | componentInit | getRests()');
      this.props.getRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('uRestMenu | componentInit | rest', rest);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
        // console.log('uRestMenu | componentInit | menu', menu);
        if (!this.props.appData.data.dishes) {
          // console.log('RestMenu | componentInit | getDishes()');
          this.props.getDishes();
        } else {
          if (!this.props.appData.data.rests[rest].menus[menu].subMenus) {
            // console.log('uRestMenu | componentInit | getSubMenus()');
            this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
          } else {
            this.setState({
              subMenus: this.props.appData.data.rests[rest].menus[menu].subMenus
            });
          }
          if (!this.props.appData.data.rests[rest].tables) {
            this.props.getTables(this.props.appData.data.rests[rest]._id);
          } else {
            // console.log('uRestMenu | componentInit | this.props.appData.data.rests[rest].tables', this.props.appData.data.rests[rest].tables);
            let table = this.props.appData.data.rests[rest].tables.findIndex(x => x.tableNum == this.props.params.tableNum);
            // console.log('uRestMenu | componentInit | table', table);
            let tableId = this.props.appData.data.rests[rest].tables[table]._id;
            if (!this.props.appData.data.rests[rest].tables[table].orders) {
              // console.log('uRestMenu | componentInit | getOrdersByTableId');
              this.props.getOrdersByTableId(tableId);
            } else {
              this.props.appData.data.rests[rest].tables[table].orders.map((order, i) => {
                if (order._id === this.props.params.orderId) {
                  if (!order.dishArray) {
                    order.dishArray = [];
                  }
                  this.setState({
                    order: order
                  });
                }
              });
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    // console.log('uRestMenu | componentDidMount | this.props', this.props);
    this.componentInit();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('uRestMenu | componentWillReceiveProps | nextProps', nextProps);
    // console.log('uRestMenu | componentWillReceiveProps | this.props', this.props);
    this.componentInit();
  }

  addDishToCart(dish) {
    // console.log('uRestMenu | addDishToCart | dish', dish);
    // console.log('uRestMenu | addDishToCart | this.state.order', this.state.order);
    let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
    let fullDishe = this.props.appData.data.dishes[dishIndex];
    let total_price = this.state.order.orderSum + fullDishe.defaultPrice;
    this.setState(update(this.state, {
      order: {
        dishArray: {
          $push: [dish]
        },
        orderSum: {
          $set: total_price
        }
      }
    }));
  }

  removeDishFromCart(dish) {
    // console.log('uRestMenu | removeDishFromCart | dish', dish);
    this.state.order.dishArray.map((selected_dish, i) => {
      // console.log('uRestMenu | removeDishFromCart | selected_dish', selected_dish);
      if (selected_dish === dish) {
        // console.log('uRestMenu | removeDishFromCart | dish exists in state.order.dishArray', selected_dish);
        let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
        let fullDishe = this.props.appData.data.dishes[dishIndex];
        let total_price = this.state.order.orderSum - fullDishe.defaultPrice;
        this.setState(update(this.state, {
          order: {
            dishArray: {
              $splice: [
                [i, 1]
              ]
            },
            orderSum: {
              $set: total_price
            }
          }
        }));
      }
    });
  }

  updateOrder() {
    // console.log('uRestMenu | updateOrder | this.state.order.dishArray', this.state.order);
    this.props.editOrderDishes(this.state.order);
    this.props.editOrderSumPaid(this.state.order);
  }

  handleChange(event) {
    // console.log('uRestMenu | handleChange', event.target.value);
    if (event.target.name === 'sumPaid') {
      // console.log('uRestMenu | handleChange | this.state.order.orderSum)', this.state.order.orderSum);
      if (event.target.value > this.state.order.orderSum) {
        alert('You cannot pay more the the total price')
      } else {
        this.setState(update(this.state, {
          order: {
            sumPaid: {
              $set: event.target.value
            }
          }
        }));
      }
    }
  }

  render() {
    // console.log('uRestMenu | render | this.props', this.props);
    // console.log('uRestMenu | render | this.state', this.state);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes) {
      return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-body">
            <img src={ src }/>
          </div>
        </div>
      )
    } else {
      // console.log('RestMenu | render | this.props.appData', this.props.appData);
      // console.log('RestMenu | render | this.props.params', this.props.params);
      // console.log('RestMenu | render | this.props.appData.data.dishes', this.props.appData.data.dishes);
      // const rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('RestMenu | componentDidMount | rest', rest);
      // const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
      // console.log('RestMenu | render | menu', menu);
      // console.log('RestMenu | render | this.props.appData.data.rests[rest].menus[menu].subMenus', this.props.appData.data.rests[rest].menus[menu]);
      // let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
      if (!this.state.subMenus) {
        // let subMenus = [];
        return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-body">
            <div> No subMenus</div>
          </div>
        </div>
        )
      } else {
        // let total_price = 0;
        return (
          <div>
            <div id="restMenu" className="panel panel-default">
              {this.state.subMenus.map((subMenu, i) => {
                let counts = {};
                {/*console.log('uRestMenu | render | this.state.order', this.state.order);*/
                }
                {
                  this.state.order.dishArray.map((dish, i) => {
                    if (!counts.hasOwnProperty(dish)) {
                      counts[dish] = 1;
                    } else {
                      counts[dish]++;
                    }
                  });
                }
                return (
                  <div key={i}>
                    <div className="panel-heading" style={styleDiv}>{subMenu.name}</div>
                    <div className="panel-body">
                      <ul className="restMenuList list-group">
                        <li className="menuItem list-group-item">
                          <div className="innerItem name">
                            Dish Name
                          </div>
                          <div className="innerItem name">
                            Dish Price
                          </div>
                          <div className="innerItem name">
                            Orders
                          </div>
                          <div className="innerItem name">
                          </div>
                          <div className="innerItem name">
                          </div>
                        </li>
                        {subMenu.dishArray.map((dish_id, t) => {
                          let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish_id);
                          if (dishIndex > -1) {
                            let fullDishe = this.props.appData.data.dishes[dishIndex];
                            return (
                              <li className="menuItem list-group-item" key={t}>
                                <div className="innerItem name">
                                  {fullDishe.name}
                                </div>
                                <div className="innerItem name">
                                  {fullDishe.defaultPrice}
                                </div>
                                <div className="innerItem name">
                                  {
                                    counts[dish_id] ? (
                                      <div>{counts[dish_id]}</div>
                                    ) : (
                                      <div>0</div>
                                    )
                                  }
                                </div>
                                <Button onClick={() => this.addDishToCart(dish_id)}>Add to order</Button>
                                {counts[dish_id] > 0 ?
                                  (
                                    <Button onClick={() => this.removeDishFromCart(dish_id)}>Remove from
                                      order</Button>
                                  ) : (
                                    <Button onClick={() => this.removeDishFromCart(dish_id)} disabled>Remove from
                                      order</Button>
                                  )
                                }
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                )
              })}
              <div className="panel-body" style={styleDiv}>
                Total price: {this.state.order.orderSum}
                <div>
                  Paid:
                  <input type="number" name="sumPaid" value={this.state.order.sumPaid} onChange={this.handleChange}
                         required/>
                </div>
                <div>
                  Left to pay: {this.state.order.orderSum - this.state.order.sumPaid}
                </div>
                <Button onClick={this.updateOrder}>Submit</Button>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}
export default uRestMenu;
