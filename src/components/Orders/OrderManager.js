/**
 * Created by liorf on 11/26/16.
 */
import React from 'react';
import './Orders.styl';
import {Accordion, Panel} from 'react-bootstrap';

// import ListOfTables from './uListOfTables';
// import {Button} from 'react-bootstrap';

class OrderManager extends React.Component {
  constructor(props) {
    console.log('OrderManager | constructor', props);
    super(props);
    // this.state = {};

    this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    // this.tick = this.tick.bind(this);

  }

  componentInit() {
    console.log('OrderManager | componentInit');

    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      this.props.appData.data.rests.map((rest, i) => {
        console.log('OrderManager | componentInit | rest', rest);
        if (!rest.tables) {
          this.props.getTables(rest._id);
        } else {
          rest.tables.map((table, j) => {
            if (!table.orders) {
              this.props.getOrdersByTableId(table._id);
            }
          })
        }
      })
    }
  }

  componentDidMount() {
    // this.timer = setInterval(this.tick, 5000);
    this.componentInit();
  }
  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  componentWillReceiveProps() {
    this.componentInit();
  }
  // tick () {
  //   this.props.getRests();
  //   // this.componentInit();
  // }
  render() {
    console.log('OrderManager | props', this.props);
    // setInterval(
    //   function() { componentInit() }
    //     , 5000);

    // console.log('OrderManager | this.state', this.state);
    // let styleDiv = {
    //   fontSize: 30
    // };
    return (
      <div id="Orders" className="panel panel-default">
        {/*<div className="panel-heading" style={styleDiv}>{this.props.rest.name}</div>*/}
        <div className="panel-body">
          {
            this.props.appData.data.rests ? (
              this.props.appData.data.rests.map((rest, i) => {
                console.log('OrderManager | rest', rest);
                return (
                  <Accordion key={i}>
                    <Panel header={rest.name} eventKey={i} key={i}>
                      {
                        rest.tables ? (
                          rest.tables.map((table, j) => {
                            return (
                              <ul className="OrdersList" key={j}>
                                <Accordion>
                                  <Panel header={table.tableNum} eventKey={j}>
                                    <li className="OrdersItem list-group-item">
                                      <div className="innerItem id">Order ID</div>
                                      <div className="innerItem date">Date</div>
                                      <div className="innerItem orderSum">Order Sum</div>
                                      <div className="innerItem sumPaid">Paid</div>
                                    </li>
                                    {
                                      table.orders ? (
                                        table.orders.map((order, t) => {
                                          return (
                                              <li className="OrdersItem list-group-item" key={t}>
                                                <div className="innerItem id">{order._id}</div>
                                                <div className="innerItem date">{order.date}</div>
                                                <div className="innerItem orderSum">{order.orderSum}</div>
                                                <div className="innerItem sumPaid">{order.sumPaid}</div>
                                              </li>
                                          )
                                        })
                                      ) : null
                                    }
                                  </Panel>
                                </Accordion>
                              </ul>
                            )
                          })
                        ) : null
                      }
                    </Panel>
                  </Accordion>
                );

              })
            ) : null
          }
          {/*<ul className="restMenuList list-group">*/}
          {/*<li className="menuItem list-group-item">*/}
          {/*<Accordion>*/}
          {/*<Panel header="Collapsible Group Item #1" eventKey="1">*/}
          {/*Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf*/}
          {/*moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.*/}
          {/*Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda*/}
          {/*shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea*/}
          {/*proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim*/}
          {/*aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.*/}
          {/*</Panel>*/}
          {/*<Panel header="Collapsible Group Item #2" eventKey="2">*/}
          {/*Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf*/}
          {/*moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.*/}
          {/*Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda*/}
          {/*shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea*/}
          {/*proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim*/}
          {/*aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.*/}
          {/*</Panel>*/}
          {/*<Panel header="Collapsible Group Item #3" eventKey="3">*/}
          {/*Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf*/}
          {/*moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.*/}
          {/*Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda*/}
          {/*shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea*/}
          {/*proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim*/}
          {/*aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.*/}
          {/*</Panel>*/}
          {/*</Accordion>*/}
          {/*</li>*/}
          {/*</ul>*/}
          {/*Orders*/}
        </div>
      </div>
    )
  }
}
// OrderManager.propTypes = {
//   appData: PropTypes.object,
//   getRests: PropTypes.func,
//   getDishes: PropTypes.func,
//   getMenus: PropTypes.func,
//   getSubMenus: PropTypes.func,
//   getTables: PropTypes.func,
//   addRest: PropTypes.func,
//   addDish: PropTypes.func,
//   addSubMenu: PropTypes.func,
//   addTable: PropTypes.func,
//   editRest: PropTypes.func,
//   editDish: PropTypes.func,
//   editRestMenu: PropTypes.func,
//   editSubMenu: PropTypes.func,
//   editTable: PropTypes.func,
//   deleteRest: PropTypes.func,
//   deleteDish: PropTypes.func,
//   deleteRestMenu: PropTypes.func,
//   deleteSubMenu: PropTypes.func,
//   deleteTable: PropTypes.func,
//   params: PropTypes.object,
//   publicDns: PropTypes.string
// };
export default OrderManager;
