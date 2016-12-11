/**
 * Created by liorf on 12/4/16.
 */


import React from 'react';
import RestMenuManager from '../restMenu/restMenuManager'
// import ListOfDishes from '../Dishes/ListOfDishes';
// import api from '../../api/API'

class Restaurant extends React.Component {
  constructor(props) {
    // console.log('Restaurant | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log('Restaurant | componentDidMount', this.props);
    var rest = this.props.appData.data.rests.findIndex(x => x.name==this.props.params.restName);
    // console.log('Restaurant | componentDidMount | rest', rest);
    // console.log('Restaurant | componentDidMount | this.props.appData.data.rests[rest].menus', this.props.appData.data.rests[rest]);
    if (!this.props.appData.data.rests) {
      this.props.getRests();
    }
    if (!this.props.appData.data.rests[rest].menus) {
      this.props.getMenus(this.props.appData.data.rests[rest]._id);
    }  }

  render() {
    console.log('Restaurant | render |this.props', this.props);
    if (!this.props.appData.data.rests) {
      return (
        <div>Loading</div>
      )
    } else {
      var rest = this.props.appData.data.rests.findIndex(x => x.name==this.props.params.restName);
      if (!this.props.appData.data.rests[rest].menus) {
        return (
          <div>Loading</div>
        )
      } else {
        return (
          <div> Restaurant name:  {this.props.appData.data.rests[rest].name}
            <RestMenuManager rest={this.props.appData.data.rests[rest]} menus={this.props.appData.data.rests[rest].menus} addRestMenu={this.props.addRestMenu}/>
            {/*<ListOfDishes  dishes={this.props.appData.data.dishes} type="inMenu"/>*/}
          </div>
        )
      }
    }
  }
}

export default Restaurant;
