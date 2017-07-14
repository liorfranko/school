/**
 * Created by liorf on 12/4/16.
 */

import React from 'react';
import TableManager from '../uTables/utableManager';

class uRestaurant extends React.Component {
  constructor(props) {
    // console.log('uRestaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
  }

  componentInit() {
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        this.props.appData.data.rests[rest].menus.map((menu) => {
          if (!menu.subMenus) {
            this.props.getSubMenus(menu._id);
          }
        })
      }
      if (!this.props.appData.data.rests[rest].tables) {
        this.props.getTables(this.props.appData.data.rests[rest]._id);
      }
      if (!this.props.appData.data.dishes) {
        // console.log('uRestaurant | componentInit | getDishesUid()');
        this.props.getDishesUid(this.props.appData.data.rests[rest].userId);
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

  recursiveCloneChildren(children) {
    return React.Children.map(children, child => {
      let childProps = {};
      if (React.isValidElement(child)) {
        childProps = {
          appData: this.props.appData,
          getSubMenus: this.props.getSubMenus,
          getOrdersByTableId: this.props.getOrdersByTableId,
          addOrder: this.props.addOrder,
          editOrderSumPaid: this.props.editOrderSumPaid,
          editOrderDishes: this.props.editOrderDishes
        };
      }
      childProps.children = this.recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    })
  }

  render() {
    // console.log('uRestaurant | render |this.props', this.props);
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
          <div>
            {this.props.params.tableName ? this.recursiveCloneChildren(this.props.children) : (
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
                                </li>
                                {submenu.dishArray ?
                                  <div>{submenu.dishArray.map((dish, j) => {
                                    let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
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
            )
            }
          </div>

        );
      }
    }
  }
}

export default uRestaurant;
