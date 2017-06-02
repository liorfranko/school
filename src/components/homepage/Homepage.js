/**
 * Created by Alex on 21/11/2016.
 */

import React, {Component} from 'react';

class Homepage extends Component {
  constructor(props) {
    // console.log('Homepage | constructor | props', props);
    super(props);
    // this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }


  // componentDidMount() {
  //   console.log('Homepage | componentDidMount | this.props', this.props);
  //   if (this.props.getAllRests) {
  //     if (!this.props.appData.data.rests) {
  //       this.props.getAllRests();
  //     }
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log('Homepage | componentWillReceiveProps | nextProps', nextProps);
  //   if (this.props.getAllRests) {
  //     console.log('Homepage | componentWillReceiveProps | getAllRests');
  //     if (!this.props.appData.data.rests) {
  //       this.props.getAllRests();
  //     }
  //   }
  // }
  render() {
    // console.log('Homepage | render', this.props);
    let styleDiv = {
      fontSize: 30
    };
    // const src = require("../../Images/5.gif");
    if (this.props.appData.priv === 'user') {
      return (
        <div className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Homepage</div>
          <div className="panel-body">
            <h1>
              User - Homepage
            </h1>
          </div>
        </div>
      )
    } else {
      return (
        <div className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Homepage</div>
          <div className="panel-body">
            <h1>
              Manager - Homepage
            </h1>
          </div>
        </div>
      )
    }
  }
  //   if (this.props.getAllRests) {
  //     if (!this.props.appData.data.rests) {
  //       // console.log('RestaurantsManager | loading');
  //       return (
  //         <div id="rests" className="panel panel-default">
  //           <div className="panel-heading" style={styleDiv}>Restaurants:</div>
  //           <div className="panel-body">
  //             <img src={ src }/>
  //           </div>
  //         </div>
  //       )
  //     } else {
  //       return (
  //         <div className="panel panel-default">
  //           <div className="panel-heading" style={styleDiv}>Homepage</div>
  //           <div className="panel-body">
  //             <h1>
  //               User - Homepage
  //             </h1>
  //           </div>
  //         </div>
  //       )
  //     }
  //   } else {
  //     return (
  //       <div className="panel panel-default">
  //         <div className="panel-heading" style={styleDiv}>Homepage</div>
  //         <div className="panel-body">
  //           <h1>
  //             Manager - Homepage
  //           </h1>
  //         </div>
  //       </div>
  //     )
  //   }
  // }
}
// const Homepage = (props) => {
//   console.log('Homepage | props', props);
//   let styleDiv = {
//     fontSize: 30
//   };
//
//   function componentDidMount() {
//     console.log('Homepage | componentDidMount', props);
//     if (props.getAllRests) {
//       if (!this.props.appData.data.rests) {
//         this.props.getAllRests();
//       }
//     }
//   }
//
//
//
// };

export default Homepage;
