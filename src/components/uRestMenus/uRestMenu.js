/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
// import SubMenuManager from '../SubMenus/SubMenuManager';
import update from 'react/lib/update';
import * as $ from 'jquery';
import {Button} from 'react-bootstrap';

//FIXME - Fix loading of dishes per submenu.

class uRestMenu extends React.Component {
  constructor(props) {
    console.log('uRestMenu | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.addDishToCart = this.addDishToCart.bind(this);
    this.removeDishToCart = this.removeDishToCart.bind(this);
    this.state = {
      available_dishes: [],
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
            let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
            // console.log('uRestMenu | componentInit | this.props.appData.data.rests[rest].menus[menu].subMenus', subMenus);
            if (!subMenus) {
              let subMenus = [];
            }
            // console.log('uRestMenu | componentInit | this.state', this.state.available_dishes);
            let available_dishes = [];
            let updated_dishes = [];
            // console.log('uRestMenu | componentInit | available_dishes', available_dishes);
            // console.log('uRestMenu | componentInit | available_dishes.length', available_dishes.length);
            subMenus.map((submenu, i) => {
              // console.log('uRestMenu | componentInit | subMenu', submenu);
              if (submenu['dishArray']) {
                submenu['dishArray'].map((dish_id, i) => {
                  // console.log('uRestMenu | componentInit | dishArray | dish_id', dish_id);
                  if (dish_id !== "") {
                    // console.log('uRestMenu | componentInit | Dish not empty', dish_id);
                    let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish_id);
                    // console.log('uRestMenu | componentInit | dishArray | dishIndex', dishIndex);
                    let fullDish = this.props.appData.data.dishes[dishIndex];
                    // console.log('uRestMenu | componentInit | fullDish', fullDish);
                    // console.log('uRestMenu | componentInit | i', i);
                    let updated = false;
                    available_dishes.map((available_dish, i) => {
                      // console.log('uRestMenu | componentInit | available_dish', available_dish);
                      if (available_dish.dish === fullDish) {
                        // console.log('uRestMenu | componentInit | dish already exists in available_dish', available_dish);
                        updated = true;
                      } else {
                        // console.log('uRestMenu | componentInit | dish not exists in available_dish', available_dish);
                        updated_dishes.push({available_dish});
                        updated = true;
                      }
                    });
                    if (!updated) {
                      updated_dishes.push({dish: fullDish, count: 0});
                    }
                  }
                });

              }
            });
            // console.log('uRestMenu | componentInit | updated_dishes', updated_dishes);
            this.setState({
              available_dishes: updated_dishes
            });
          }
        }
      }
    }
  }

  componentDidMount() {
    console.log('uRestMenu | componentDidMount | this.props', this.props);
    this.componentInit();
    // if (!this.props.appData.data.rests) {
    //   console.log('RestMenu | componentDidMount | getRests()');
    //   this.props.getRests();
    // } else {
    //   let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    //   console.log('uRestMenu | componentDidMount | rest', rest);
    //   if (!this.props.appData.data.rests[rest].menus) {
    //     this.props.getMenus(this.props.appData.data.rests[rest]._id);
    //   } else {
    //     let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    //     console.log('uRestMenu | componentDidMount | menu', menu);
    //     if (!this.props.appData.data.dishes) {
    //       console.log('RestMenu | componentDidMount | getDishes()');
    //       this.props.getDishes();
    //     } else {
    //       if (!this.props.appData.data.rests[rest].menus[menu].subMenus) {
    //         console.log('uRestMenu | componentDidMount | getSubMenus()');
    //         this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
    //       } else {
    //         let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
    //         console.log('uRestMenu | componentDidMount | this.props.appData.data.rests[rest].menus[menu].subMenus', subMenus);
    //         if (!subMenus) {
    //           let subMenus = [];
    //         }
    //         console.log('uRestMenu | componentDidMount | this.state', this.state.available_dishes);
    //         let available_dishes = this.state.available_dishes.slice();
    //         subMenus.map((submenu, i) => {
    //           // console.log('uRestMenu | componentDidMount | subMenu', submenu);
    //           if (submenu['dishArray']) {
    //             submenu['dishArray'].map((dish, i) => {
    //               // console.log('uRestMenu | componentDidMount | dishArray | dish', dish);
    //               if (dish !== "") {
    //                 // console.log('uRestMenu | componentDidMount | Dish not empty', dish);
    //                 let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
    //                 // console.log('uRestMenu | componentDidMount | dishArray | dishIndex', dishIndex);
    //                 let fullDish = this.props.appData.data.dishes[dishIndex];
    //                 // console.log('uRestMenu | componentDidMount | dishArray | dishIndex', fullDish);
    //                 if ($.inArray(dish._id, this.props.appData.data.dishes) === -1) {
    //                   console.log('uRestMenu | componentDidMount | Dish not exists, Checking if exists in available_dishes');
    //                   // console.log('uRestMenu | componentDidMount | this.test', this.test);
    //                   console.log('uRestMenu | componentDidMount | available_dishes', available_dishes);
    //                   if ($.inArray(dish._id, available_dishes) === -1) {
    //                     available_dishes.push({id: i, dish: fullDish})
    //                     // temp.push({id: i, dish: fullDish});
    //                     // this.setState(update(this.state, {
    //                     //   available_dishes: {
    //                     //     $push: [{id: i, dish: fullDish}]
    //                     //   }
    //                     // }));
    //                   }
    //                 }
    //               }
    //             });
    //
    //           }
    //         });
    //         // console.log('uRestMenu | componentDidMount | setState | available_dishes', available_dishes);
    //         // console.log('uRestMenu | componentDidMount | this.state.available_dishes', this.state);
    //         this.setState(update(this.state, {
    //           available_dishes: {
    //             $push: available_dishes
    //           }
    //         }));
    //       }
    //
    //     }
    //   }
    // }
  }

  componentWillReceiveProps(nextProps) {
    console.log('uRestMenu | componentWillReceiveProps | nextProps', nextProps);
    console.log('uRestMenu | componentWillReceiveProps | this.props', this.props);
    this.componentInit();
    // if (!this.props.appData.data.rests) {
    //   console.log('RestMenu | componentWillReceiveProps | getRests()');
    //   this.props.getRests();
    // } else {
    //   let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
    //   console.log('uRestMenu | componentWillReceiveProps | rest', rest);
    //   if (!this.props.appData.data.rests[rest].menus) {
    //     this.props.getMenus(this.props.appData.data.rests[rest]._id);
    //   } else {
    //     const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
    //     // console.log('RestMenu | componentDidMount | menu', menu);
    //     if (!this.props.appData.data.rests[rest].menus[menu].subMenus) {
    //       // console.log('RestMenu | componentDidMount | getSubMenus()');
    //       this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
    //     } else {
    //       if (!this.props.appData.data.dishes) {
    //         console.log('uRestMenu | componentWillReceiveProps | getDishes()');
    //         this.props.getDishes();
    //       } else {
    //         console.log('uRestMenu | componentWillReceiveProps | this.props.appData.data.rests[rest].menus[menu].subMenus', subMenus);
    //         let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
    //         if (!subMenus) {
    //           let subMenus = [];
    //         }
    //         this.props.appData.data.rests[rest].menus[menu].subMenus.map((submenu, i) => {
    //           // console.log('uRestMenu | componentWillReceiveProps | subMenu', submenu);
    //           console.log('uRestMenu | componentWillReceiveProps | this.state', this.state);
    //
    //           // let available_dishes = this.state.available_dishes.slice();
    //           let available_dishes = this.state.available_dishes.slice();
    //
    //           if (submenu['dishArray']) {
    //             submenu['dishArray'].map((dish, i) => {
    //               // console.log('uRestMenu | componentWillReceiveProps | dishArray | dish', dish);
    //               if (dish !== "") {
    //                 // console.log('uRestMenu | componentWillReceiveProps | dishArray | dish', dish);
    //                 let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
    //                 // console.log('uRestMenu | componentWillReceiveProps | dishArray | dishIndex', dishIndex);
    //                 let fullDish = this.props.appData.data.dishes[dishIndex];
    //                 // console.log('uRestMenu | componentWillReceiveProps | dishArray | dishIndex', fullDish);
    //                 if ($.inArray(dish._id, this.props.appData.data.dishes) === -1) {
    //                   console.log('uRestMenu | componentWillReceiveProps | Dish not exists, Checking if exists in available_dishes');
    //                   // console.log('uRestMenu | componentDidMount | this.test', this.test);
    //                   console.log('uRestMenu | componentDidMount | available_dishes', available_dishes);
    //                   if ($.inArray(dish._id, available_dishes) === -1) {
    //                     available_dishes.push({id: i, dish: fullDish});
    //                     // this.setState(update(this.state, {
    //                     //   available_dishes: {
    //                     //     $push: [{id: i, dish: fullDish}]
    //                     //   }
    //                     // }));
    //                   }
    //                 }
    //               }
    //             });
    //           }
    //           this.setState(update(this.state, {
    //             available_dishes: {
    //               $push: available_dishes
    //             }
    //           }));
    //         });
    //       }
    //     }
    //
    //   }
    // }
    // this.forceUpdate()
  }

  addDishToCart(dish) {
    // console.log('uRestMenu | addDishToCart | dish', dish);
    // console.log('uRestMenu | addDishToCart | this.state.available_dishes', this.state.available_dishes);
    let updated = false;
    this.state.available_dishes.map((available_dish, i) => {
      // console.log('uRestMenu | addDishToCart | available_dish', available_dish);
      if (available_dish.dish === dish) {
        // console.log('uRestMenu | addDishToCart | dish exists in available_dish', available_dish);
        let temp_available_dishes = this.state.available_dishes.slice();
        temp_available_dishes[i].count++;
        this.setState({
          available_dishes: temp_available_dishes
        });
        updated = true;
      }
    });
    if (!updated) {
      this.setState(update(this.state, {
        available_dishes: {
          $push: [{dish: dish, count: 0}]
        }
      }));
    }
  }

  removeDishToCart(dish) {
    // console.log('uRestMenu | removeDishToCart | dish', dish);
    this.state.available_dishes.map((available_dish, i) => {
      // console.log('uRestMenu | removeDishToCart | available_dish', available_dish);
      if (available_dish.dish === dish) {
        // console.log('uRestMenu | removeDishToCart | dish exists in available_dish', available_dish);
        let temp_available_dishes = this.state.available_dishes.slice();
        temp_available_dishes[i].count--;
        this.setState({
          available_dishes: temp_available_dishes
        });
      }
    });
  }

  render() {
    // console.log('uRestMenu | render | this.props', this.props);
    // console.log('uRestMenu | render | this.state', this.state);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes || !this.state || !this.state.available_dishes) {
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
      const rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('RestMenu | componentDidMount | rest', rest);
      const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
      // console.log('RestMenu | render | menu', menu);
      // console.log('RestMenu | render | this.props.appData.data.rests[rest].menus[menu].subMenus', this.props.appData.data.rests[rest].menus[menu]);
      let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
      if (!subMenus) {
        // let subMenus = [];
        return (
          <div> No subMenus</div>
        )
      } else {
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
                  {
                    this.state.available_dishes.map((available_dish, i) => {
                      {/*console.log('RestMenu | render | available_dish.count', available_dish.count);*/}
                      return (
                        <li className="menuItem list-group-item" key={i}>
                          <div className="innerItem name">
                            {available_dish.dish.name}
                          </div>
                          <div className="innerItem name">
                            {available_dish.dish.defaultPrice}
                          </div>
                          <div className="innerItem name">
                            {available_dish.count}
                          </div>
                          <Button onClick={() => this.addDishToCart(available_dish.dish)}>Add to order</Button>
                          {available_dish.count > 0 ?
                            (
                              <Button onClick={() => this.removeDishToCart(available_dish.dish)}>Remove from order</Button>
                            ) : (
                              <Button onClick={() => this.removeDishToCart(available_dish.dish)} disabled>Remove from order</Button>
                            )
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}
export default uRestMenu;
