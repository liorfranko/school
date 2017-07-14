/**
 * Created by liorf on 12/4/16.
 */

// TODO fix the HTML of this page
import React from 'react';
import {Button} from 'react-bootstrap';
import update from 'react/lib/update';
import CircularProgress from 'material-ui/CircularProgress';
class uTable extends React.Component {
  constructor(props) {
    console.log('uRestaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.addDishToCart = this.addDishToCart.bind(this);
    this.removeDishFromCart = this.removeDishFromCart.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.apiCalls = {};
    this.state = {
      order: null,
      orderSum: 0,
    };
  }

  componentInit() {
    if (!this.props.appData.data.rests) {
      if (!this.apiCalls.getMenus) {
        this.props.getAllRests();
        this.apiCalls.getAllRests = true;
      }
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        // console.log('uTable | componentInit | apiCalls', this.apiCalls);
        if (!this.apiCalls.getMenus) {
          this.props.getMenus(this.props.appData.data.rests[rest]._id);
          this.apiCalls.getMenus = true;
        }
      } else {
        this.props.appData.data.rests[rest].menus.map((menu) => {
          if (!menu.subMenus) {
            this.props.getSubMenus(menu._id);
          }
        })
      }
      if (!this.props.appData.data.dishes) {
        // console.log('uTable | componentInit | getDishesUid()');
        if (!this.apiCalls.getDishesUid) {
          this.props.getDishesUid(this.props.appData.data.rests[rest].userId);
          this.apiCalls.getDishesUid = true;
        }
      }
      if (!this.props.appData.data.rests[rest].tables) {
        if (!this.apiCalls.getTables) {
          this.props.getTables(this.props.appData.data.rests[rest]._id);
          this.apiCalls.getTables = true;
        }
      } else {
        // console.log('uTable | componentInit | this.props.appData.data.rests[rest].tables', this.props.appData.data.rests[rest].tables);
        let table = this.props.appData.data.rests[rest].tables.findIndex(x => x.tableNum == this.props.params.tableName);
        // console.log('uTable | componentInit | table', table);
        let tableId = this.props.appData.data.rests[rest].tables[table]._id;
        // console.log('uTable | componentInit | tableId', tableId);
        if (!this.props.appData.data.rests[rest].tables[table].orders) {
          if (!this.apiCalls.getOrdersByTableId) {
            // console.log('uTable | componentInit | getOrdersByTableId');
            this.props.getOrdersByTableId(tableId);
            this.apiCalls.getOrdersByTableId = true;
          }
        } else {
          let activeOrder = {};
          let found = false;
          // console.log('uTable | componentInit | orders', this.props.appData.data.rests[rest].tables[table].orders);
          this.props.appData.data.rests[rest].tables[table].orders.map((order, i) => {
            // console.log('uTable | componentInit | order', order);
            // FIXME update the way of getting the activeOrder, Change it to be when the order has been paid. - Done need to check it works
            let OrderSum = 0;
            // console.log('uTable | componentInit | order.dishArray', order.dishArray);
            if (order.dishArray) {
              // console.log('uTable | componentInit | order.dishArray exists');
              order.dishArray.map((dish) => {
                let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
                if (dishIndex >= 0) {
                  // console.log('uTable | componentInit | dishIndex', dishIndex);
                  let fullDishe = this.props.appData.data.dishes[dishIndex];
                  // console.log('uTable | componentInit | fullDishe', fullDishe);
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


  componentDidMount() {
    // console.log('uRestaurant | componentDidMount', this.props);
    this.componentInit();
    // let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    // console.log('Restaurant | componentDidMount | rest', rest);
    // console.log('Restaurant | componentDidMount | this.props.appData.data.rests[rest].menus', this.props.appData.data.rests[rest]);


  }

  componentWillReceiveProps(nextProps) {
    // console.log('uTable | componentWillReceiveProps | nextProps', nextProps);
    // console.log('uTable | componentWillReceiveProps | this.props', this.props);
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
    // console.log('uTable | updateOrder | this.state.order.dishArray', this.state.order);
    this.props.editOrderDishes(this.state.order);
    this.props.editOrderSumPaid(this.state.order);
    // window.setTimeout()
    setTimeout(function(){
      // console.log('uTable | updateOrder | Sleeping');
      window.location.reload();
    }, 2500);

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
    // console.log('uTable | render |this.state', this.state);
    // console.log('uTable | render |this.props', this.props);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    const styleDiv_2 = {
      fontSize: 25
    };
    const styleDiv_3 = {
      fontSize: 20
    };
    if (!this.props.appData.data.rests || !this.props.appData.data.dishes) {
      return (
        <div id="rests" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
          <div className="panel-body">
            <CircularProgress />
          </div>
        </div>
      )
    } else {
      // console.log('uTable | render | In second if');
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus || !this.props.appData.data.rests[rest].tables || !this.state.order) {
        return (
          <div id="rests" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>Restaurants:</div>
            <div className="panel-body">
              <CircularProgress />
            </div>
          </div>
        )
      } else {
        // console.log('uRestaurant | render | Loading page', this.props);
        return (
          <div id="rests" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>{this.props.appData.data.rests[rest].name}</div>
            <div className="panel-body">
              {this.props.appData.data.rests[rest].menus.map((menu, t) => {
                let counts = {};
                this.state.order.dishArray.map((dish, i) => {
                  {/*console.log('uRestMenu | render | dish', dish);*/
                  }
                  if (!counts.hasOwnProperty(dish)) {
                    counts[dish] = 1;
                  } else {
                    counts[dish]++;
                  }
                });
                return (
                  <ul className="restList list-group" key={t}>
                    <div style={styleDiv_2}>{menu.name}</div>
                    {menu.subMenus ?
                      <div>{menu.subMenus.map((submenu, i) => {
                        return (
                          <div key={i}>
                            <div style={styleDiv_3}>{submenu.name}</div>
                            <li className="restItem list-group-item">
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
                            {submenu.dishArray ?
                              <div>{submenu.dishArray.map((dish_id, j) => {
                                let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish_id);
                                if (dishIndex > -1) {
                                  let fullDish = this.props.appData.data.dishes[dishIndex];
                                  return (
                                    <li className="restItem list-group-item" key={j}>
                                      <div className="innerItem name">
                                        {fullDish.name}
                                      </div>
                                      <div className="innerItem price">
                                        {fullDish.defaultPrice}
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
                                  )
                                }
                              })}</div> : null
                            }
                          </div>
                        )
                      })}</div> :
                      null
                    }
                  </ul>

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
        // return (
        //   <div>
        //     <TableManager
        //       rest={this.props.appData.data.rests[rest]}
        //       tables={this.props.appData.data.rests[rest].tables}
        //       addOrder={this.props.addOrder}
        //       getOrdersByTableId={this.props.getOrdersByTableId}
        //       // deleteTable={this.props.deleteTable}
        //       // editTable={this.props.editTable}
        //     />
        //   </div>
        // )
      }
    }
  }
}

export default uTable;
