/**
 * Created by liorf on 12/4/16.
 */

// TODO fix the HTML of this page
import React from 'react';
import TableManager from '../uTables/utableManager';

class uRestaurant extends React.Component {
  constructor(props) {
    // console.log('uRestaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentInit = this.componentInit.bind(this);
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
        console.log('uRestaurant | componentInit | getDishesUid()');
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

  render() {
    console.log('uRestaurant | render |this.props', this.props);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.rests) {
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
                    <div>{menu.name}</div>
                    {menu.subMenus ?
                      <div>{menu.subMenus.map((submenu, i) => {
                        {/*console.log('uRestaurant | render | submenu', submenu);*/
                        }
                        return (
                          <li className="restItem list-group-item" key={i}>
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
                          </li>
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

export default uRestaurant;
