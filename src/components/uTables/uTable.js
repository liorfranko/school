/**
 * Created by liorf on 4/17/17.
 */
import React from 'react';

class uTable extends React.Component {
  constructor(props) {
    console.log('uTable | constructor | this.props', props);
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    console.log('uTable | componentDidMount', this.props);
    if (!this.props.appData.data.rests) {
      this.props.getAllRests();
    } else {
      let rest = this.props.appData.data.rests.findIndex(x => x.name===this.props.params.restName);
      if (!this.props.appData.data.dishes) {
        this.props.getDishesUid(this.props.appData.data.rests[rest]._id);
      }
    }
  }
  render() {
    console.log('uTable | render | this.props.appData', this.props);
    // const src = require("../../Images/5.gif");
    // const styleDiv = {
    //   fontSize: 30
    // };
    return (
      <div>Test</div>
    );
  }
}

export default uTable;
