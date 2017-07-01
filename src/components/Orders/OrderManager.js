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
    // console.log('OrderManager | constructor', props);
    super(props);
    // this.state = {};

    this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.componentInit = this.componentInit.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    // this.tick = this.tick.bind(this);

  }

  componentInit() {
    // console.log('OrderManager | componentInit');

    if (!this.props.appData.data.rests) {
      this.props.getRests();
    } else {
      this.props.appData.data.rests.map((rest, i) => {
        // console.log('OrderManager | componentInit | rest', rest);
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
    const styleDiv = {
      fontSize: 30
    };
    return (
      <div id="Orders" className="panel panel-default">
        <div className="panel-heading" style={styleDiv}>Restaurants:</div>
        <div className="panel-body">
          {
            this.props.appData.data.rests ? (
              this.props.appData.data.rests.map((rest, i) => {
                {/*console.log('OrderManager | rest', rest);*/}
                return (
                  <Accordion key={i}>
                    <Panel header={rest.name} eventKey={i}>
                      <ul className="OrdersList">
                        <li className="OrdersItem list-group-item" style={{backgroundColor:"#f5f5f5"}}>
                          <div><strong>Tables:</strong></div>
                        </li>
                      </ul>
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
