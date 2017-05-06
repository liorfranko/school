/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
import update from 'react/lib/update';
import * as $ from 'jquery';
import {Button} from 'react-bootstrap';

class uRestMenu extends React.Component {
  constructor(props) {
    console.log('uRestMenu | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.addDishToCart = this.addDishToCart.bind(this);
    this.removeDishToCart = this.removeDishToCart.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.state = {
      available_dishes: [],
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

  removeDishToCart(dish) {
    // console.log('uRestMenu | removeDishToCart | dish', dish);
    this.state.order.dishArray.map((selected_dish, i) => {
      // console.log('uRestMenu | removeDishToCart | selected_dish', selected_dish);
      if (selected_dish === dish) {
        // console.log('uRestMenu | removeDishToCart | dish exists in state.order.dishArray', selected_dish);
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
    console.log('uRestMenu | updateOrder | this.state', this.state);

  }

  render() {
    // console.log('uRestMenu | render | this.props', this.props);
    // console.log('uRestMenu | render | this.state', this.state);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes || !this.state.available_dishes || !this.state.subMenus) {
      return (
        <div id="restMenu" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Restaurants:</div>
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
          <div> No subMenus</div>
        )
      } else {
        // let total_price = 0;
        return (
          <div>
            {/*<div id="restMenu" className="panel panel-default">*/}
            {/*<div className="panel-heading" style={styleDiv}>Order Summary:</div>*/}
            {/*<div className="panel-body">*/}
            {/*<div>*/}
            {/*{this.state.activeOrder.date}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*{this.state.activeOrder.orderSum}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*{this.state.activeOrder.sumPaid}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*{this.state.activeOrder.tableId}*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div id="restMenu" className="panel panel-default">
              {this.state.subMenus.map((subMenu, i) => {
                let counts = {};
                {/*console.log('uRestMenu | render | this.state.order', this.state.order);*/
                }
                $.each(this.state.order.dishArray, function (key, value) {
                  if (!counts.hasOwnProperty(value)) {
                    counts[value] = 1;
                  } else {
                    counts[value]++;
                  }
                });
                {/*console.log('uRestMenu | render | counts', counts);*/
                }
                return (
                  <div>
                    <div className="panel-heading" style={styleDiv} key={i}>{subMenu.name}</div>
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
                            {/*console.log('uRestMenu | render | total_price', total_price);*/
                            }
                            {/*if (counts[dish_id]) {*/}
                              {/*total_price = total_price + counts[dish_id] * fullDishe.defaultPrice;*/}
                            {/*}*/}
                            {/*console.log('uRestMenu | render | total_price', total_price);*/
                            }
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
                                    <Button onClick={() => this.removeDishToCart(dish_id)}>Remove from
                                      order</Button>
                                  ) : (
                                    <Button onClick={() => this.removeDishToCart(dish_id)} disabled>Remove from
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
                  <Button onClick={this.updateOrder}>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}
export default uRestMenu;
