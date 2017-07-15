/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
import update from 'react/lib/update';
import * as $ from 'jquery';
import {Button} from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';

// TODO set max dishes to 20 and enforce it with alert
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
      orderSum: 0,
    };
    this.addedOrder = false;
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
              // let maxDate = new Date('1970/01/01');
              let activeOrder = {};
              let found = false;
              // console.log('uRestMenu | componentInit | orders', this.props.appData.data.rests[rest].tables[table].orders);
              this.props.appData.data.rests[rest].tables[table].orders.map((order, i) => {
                // console.log('uRestMenu | componentInit | order', order);
                let OrderSum = 0;
                // console.log('uRestMenu | componentInit | order.dishArray', order.dishArray);
                if (order.dishArray) {
                  // console.log('uRestMenu | componentInit | order.dishArray exists');
                  order.dishArray.map((dish) => {
                    let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
                    if (dishIndex >= 0) {
                      // console.log('uRestMenu | componentInit | dishIndex', dishIndex);
                      let fullDishe = this.props.appData.data.dishes[dishIndex];
                      // console.log('uRestMenu | componentInit | fullDishe', fullDishe);
                      OrderSum = OrderSum + fullDishe.defaultPrice;
                    }
                  });
                  if (OrderSum !== order.sumPaid) {
                    // console.log('uRestMenu | componentInit | not equal');
                    activeOrder = order;
                    found = true;
                  } else {
                    // console.log('uRestMenu | componentInit | equal');
                  }
                } else {
                  // console.log('uRestMenu | componentInit | order.dishArray NOT exists');
                  order.dishArray = [];
                  for (let i = 0; i < 20; i++) {
                    if (!order.dishArray[i]) {
                      order.dishArray[i] = "";
                    }
                  }
                  activeOrder = order;
                  found = true;
                }
              });
              // console.log('uRestMenu | componentInit | found', found);
              if (!found) {
                // console.log('uRestMenu | componentInit | addOrder | addedOrder', this.addedOrder);
                if (!this.addedOrder) {
                  this.props.addOrder(tableId);
                  this.addedOrder = true;
                }
                // console.log('uRestMenu | componentInit | addOrder | addedOrder', this.addedOrder);
              } else {
                // console.log('uRestMenu | componentInit | activeOrder', activeOrder);

                this.setState({
                  order: activeOrder,
                });
                let newOrderSum = 0;
                activeOrder.dishArray.map((dish) => {
                  let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
                  if (dishIndex >= 0) {
                    // console.log('uRestMenu | componentInit | dishIndex', dishIndex);
                    let fullDishe = this.props.appData.data.dishes[dishIndex];
                    // console.log('uRestMenu | componentInit | fullDishe', fullDishe);
                    newOrderSum = newOrderSum + fullDishe.defaultPrice;
                  }
                });
                this.setState({
                  orderSum: newOrderSum
                });
              }
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

  addDishToCart(newDish) {
    // console.log('uRestMenu | addDishToCart | newDish', newDish);
    // console.log('uRestMenu | addDishToCart | this.state.order', this.state.order);
    let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === newDish);
    let fullDishe = this.props.appData.data.dishes[dishIndex];
    let total_price = this.state.orderSum + fullDishe.defaultPrice;
    let newDishArray = [];
    let done = false;
    this.state.order.dishArray.map((dish, i) => {
      // console.log('uRestMenu | addDishToCart | In for | dish ', dish);
      if (!done) {
        if (dish === "") {
          // console.log('uRestMenu | addDishToCart | In for | dish is empty');
          newDishArray.push(newDish);
          done = true;
        } else {
          newDishArray.push(dish)
        }
      }
    });
    // console.log('uRestMenu | addDishToCart | newDishArray', newDishArray);
    for (let i = 0; i < 20; i++) {
      if (!newDishArray[i]) {
        newDishArray[i] = "";
      }
    }
    // console.log('uRestMenu | addDishToCart | newDishArray', newDishArray);
    this.setState(update(this.state, {
      order: {
        dishArray: {
          $set: newDishArray
        }
      },
      orderSum: {
        $set: total_price
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
        let total_price = this.state.orderSum - fullDishe.defaultPrice;
        this.setState(update(this.state, {
          order: {
            dishArray: {
              $splice: [
                [i, 1]
              ]
            }
          },
          orderSum: {
            $set: total_price
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
      if (event.target.value > this.state.orderSum) {
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
    console.log('uRestMenu | render | this.state', this.state);
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes || !this.state.order) {
      return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      )
    } else {
      if (!this.state.subMenus) {
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
                {/*console.log('uRestMenu | render | counts', counts);*/}
                {/*console.log('uRestMenu | render | this.state.order.dishArray', this.state.order.dishArray);*/}
                {
                  this.state.order.dishArray.map((dish, i) => {
                    {/*console.log('uRestMenu | render | dish', dish);*/}
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
                Total price: {this.state.orderSum}
                <div>
                  Paid:
                  <input type="number" name="sumPaid" value={this.state.order.sumPaid} onChange={this.handleChange}
                         required/>
                </div>
                <div>
                  Left to pay: {this.state.orderSum - this.state.order.sumPaid}
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
