/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
// import SubMenuManager from '../SubMenus/SubMenuManager';
import update from 'react/lib/update';
import * as $ from 'jquery';

//FIXME - Fix loading of dishes per submenu.

class uRestMenu extends React.Component {
  constructor(props) {
    console.log('uRestMenu | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.arrDiff = this.arrDiff.bind(this);
    // this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.state = {
      available_dishes: []
    };
    // this.test = []
  }

  // shouldComponentUpdate(nextState) {
  //   console.log('uRestMenu | shouldComponentUpdate | this.state', this.state);
  //   console.log('uRestMenu | shouldComponentUpdate | nextState', nextState);
  //   return this.state.available_dishes !== nextState.available_dishes;
  //
  // }
  arrDiff(a1, a2) {
    console.log('uRestMenu | arrDiff | a1', a1);
    console.log('uRestMenu | arrDiff | a2', a2);

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }

    for (var k in a) {
      diff.push(k);
    }

    return diff;
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
                    if ($.inArray(fullDish, available_dishes) === -1) {
                      // console.log('uRestMenu | componentInit | fullDish not exists in available_dishes', fullDish);
                      available_dishes.push(fullDish)
                    }
                  }
                });

              }
            });
            // console.log('uRestMenu | componentInit | setState | available_dishes', available_dishes);
            // console.log('uRestMenu | componentInit | this.state.available_dishes', this.state);
            this.setState({
              available_dishes: available_dishes
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

  render() {
    console.log('uRestMenu | render | this.props', this.props);
    console.log('uRestMenu | render | this.state', this.state);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes || !this.state || !this.state.available_dishes ) {
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
                  </li>
                  {
                    this.state.available_dishes.map((dish, i) => {
                      return (
                        <li className="menuItem list-group-item" key={i}>
                          <div className="innerItem name">
                            {dish.name}
                          </div>
                          <div className="innerItem name">
                            {dish.defaultPrice}
                          </div>
                          <div className="innerItem description">
                            Add
                          </div>
                          <div className="innerItem Price">
                            Remove
                          </div>
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
