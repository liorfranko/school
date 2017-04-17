/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
import SubMenuManager from '../SubMenus/SubMenuManager'
import * as $ from 'jquery';

//FIXME - Fix loading of dishes per submenu.

class uRestMenu extends React.Component {
  constructor(props) {
    // console.log('uRestMenu | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentDidMount() {
    console.log('uRestMenu | componentDidMount | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      // console.log('RestMenu | componentDidMount | rest', rest);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        let menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
        // console.log('RestMenu | componentDidMount | menu', menu);
        if (!this.props.appData.data.dishes) {
          // console.log('RestMenu | componentDidMount | getDishes()');
          this.props.getDishes();
        } else {
          if (!this.props.appData.data.rests[rest].menus[menu].subMenus) {
            // console.log('RestMenu | componentDidMount | getSubMenus()');
            this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
          } else {
            console.log('uRestMenu | componentDidMount | this.props.appData.data.rests[rest].menus[menu].subMenus', subMenus);
            let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
            if (!subMenus) {
              let subMenus = [];
            }
            subMenus.map((submenu, i) => {
              console.log('uRestMenu | componentDidMount | subMenu', submenu);
              let available_dishes = [];
              if (submenu['dishArray']) {
                submenu['dishArray'].map((dish, i) => {
                  // console.log('dishArray | dish', dish);
                  if (dish !== "") {
                    // console.log('dishArray | dish', dish);
                    let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
                    // console.log('dishArray | dishIndex', dishIndex);
                    let fullDish = this.props.appData.data.dishes[dishIndex];
                    // console.log('dishArray | dishIndex', fullDish);
                    if ($.inArray(dish._id, this.props.appData.data.dishes) === -1) {
                      console.log('Dish exists');
                      available_dishes.push({id: i, dish: fullDish})
                    }
                  }
                });
                this.setState({
                  available_dishes: available_dishes,
                });
              }
            });
          }

        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log('RestMenu | componentWillReceiveProps | nextProps', nextProps);
    // console.log('RestMenu | componentWillReceiveProps | this.props', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name === this.props.params.restName);
      console.log('RestMenu | componentWillReceiveProps | rest', rest);
      if (!this.props.appData.data.rests[rest].menus) {
        this.props.getMenus(this.props.appData.data.rests[rest]._id);
      } else {
        const menu = this.props.appData.data.rests[rest].menus.findIndex(x => x.name === this.props.params.menuName);
        // console.log('RestMenu | componentDidMount | menu', menu);
        if (!this.props.appData.data.rests[rest].menus[menu].subMenus) {
          // console.log('RestMenu | componentDidMount | getSubMenus()');
          this.props.getSubMenus(this.props.appData.data.rests[rest].menus[menu]._id);
        } else {
          if (!this.props.appData.data.dishes) {
            console.log('uRestMenu | componentWillReceiveProps | getDishes()');
            this.props.getDishes();
          } else {
            console.log('uRestMenu | componentWillReceiveProps | this.props.appData.data.rests[rest].menus[menu].subMenus', subMenus);
            let subMenus = this.props.appData.data.rests[rest].menus[menu].subMenus;
            if (!subMenus) {
              let subMenus = [];
            }
            this.props.appData.data.rests[rest].menus[menu].subMenus.map((submenu, i) => {
              console.log('uRestMenu | componentWillReceiveProps | subMenu', submenu);
              let available_dishes = [];
              if (submenu['dishArray']) {
                submenu['dishArray'].map((dish, i) => {
                  // console.log('dishArray | dish', dish);
                  if (dish !== "") {
                    // console.log('dishArray | dish', dish);
                    let dishIndex = this.props.appData.data.dishes.findIndex(x => x._id === dish);
                    // console.log('dishArray | dishIndex', dishIndex);
                    let fullDish = this.props.appData.data.dishes[dishIndex];
                    // console.log('dishArray | dishIndex', fullDish);
                    if ($.inArray(dish._id, this.props.appData.data.dishes) === -1) {
                      console.log('Dish exists');
                      available_dishes.push({id: i, dish: fullDish})
                    }
                  }
                });
                this.setState({
                  available_dishes: available_dishes,
                });
              }
            });
          }
        }

      }
    }
    this.forceUpdate()
  }

  render() {

    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes || !this.state || !this.state.available_dishes || !this.state.subMenus) {
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
        let subMenus = [];
        return (
          <div>  No menus</div>
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
                          <a className="innerItem name">
                            {dish.dish.name}
                          </a>
                          <div className="innerItem name">
                            {dish.dish.defaultPrice}
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
