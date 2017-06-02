/**
 * Created by liorf on 12/4/16.
 */

// TODO fix the HTML of this page
import React from 'react';

class uTable extends React.Component {
  constructor(props) {
    // console.log('uRestaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
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
            this.props.getOrdersByTableId(tableId);
            this.apiCalls.getOrdersByTableId = true;
          }
        } else {
          if (!this.props.appData.data.dishes) {
            // console.log('uTable | componentInit | getDishesUid()');
            if (!this.apiCalls.getDishesUid) {
              this.props.getDishesUid(this.props.appData.data.rests[rest].userId);
              this.apiCalls.getDishesUid = true;
            }
          } else {
            let activeOrder = {};
            let found = false;
            // console.log('uRestMenu | componentInit | orders', this.props.appData.data.rests[rest].tables[table].orders);
            this.props.appData.data.rests[rest].tables[table].orders.map((order, i) => {
              // console.log('uRestMenu | componentInit | order', order);
              // FIXME update the why of getting the activeOrder, Change it to be when the order has been paid. - Done need to check it works
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

  componentDidMount() {
    // console.log('uRestaurant | componentDidMount', this.props);
    this.componentInit();
    // let rest = this.props.appData.data.rests.findIndex(x => x.name == this.props.params.restName);
    // console.log('Restaurant | componentDidMount | rest', rest);
    // console.log('Restaurant | componentDidMount | this.props.appData.data.rests[rest].menus', this.props.appData.data.rests[rest]);


  }

  componentWillReceiveProps(nextProps) {
    // console.log('uRestaurant | componentWillReceiveProps | nextProps', nextProps);
    // console.log('uRestaurant | componentWillReceiveProps | this.props', this.props);
    this.componentInit();
  }

  render() {
    // console.log('uTable | render |this.props', this.props);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    const styleDiv_2 = {
      fontSize: 25
    };
    // const styleDiv_3 = {
    //   fontSize: 10
    // };
    if (!this.props.appData.data.rests || !this.props.appData.data.dishes) {
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
          <div id="rests" className="panel panel-default">
            <div className="panel-heading" style={styleDiv}>{this.props.appData.data.rests[rest].name}</div>
            <div className="panel-body">
              {this.props.appData.data.rests[rest].menus.map((menu, t) => {
                {/*console.log('uRestaurant | render | menu', menu);*/
                }
                return (
                  <ul className="restList list-group" key={t}>
                    <div style={styleDiv_2}>{menu.name}</div>
                    {menu.subMenus ?
                      <div>{menu.subMenus.map((submenu, i) => {
                        {/*console.log('uRestaurant | render | submenu', submenu);*/
                        }
                        return (
                          <div key={i}>
                            <div>{submenu.name}</div>
                            {submenu.dishArray ?
                              <div>{submenu.dishArray.map((dish, j) => {
                                {/*console.log('uRestaurant | render | dish', dish);*/
                                }
                                let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
                                if (dishIndex > -1) {
                                  {/*console.log('uRestaurant | render | dishIndex', dishIndex);*/
                                  }
                                  let fullDish = this.props.appData.data.dishes[dishIndex];
                                  {/*console.log('uRestaurant | render | fullDish', fullDish);*/
                                  }
                                  return (
                                    <li className="restItem list-group-item" key={j}>
                                      <div className="innerItem name">
                                        {fullDish.name}
                                      </div>
                                      <div className="innerItem price">
                                        {fullDish.defaultPrice}
                                      </div>
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
