/**
 * Created by Alex on 21/11/2016.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Homepage extends Component {
  constructor(props) {
    // console.log('Homepage | constructor | props', props);
    super(props);
  }

  render() {
    // console.log('Homepage | render', this.props);
    let styleDiv = {
      fontSize: 30
    };
    return (
      <div className>
        <div>
          <h1>Welcome</h1>
          <p>
            This is where you can see the menus, if you'd like to edit the menus, just <a href="#">login</a> and edit
            away :)
          </p>
        </div>
      </div>
    );
    // const src = require("../../Images/5.gif");
    // if (this.props.appData.priv === 'user') {
    //   return (
    //     <div className>
    //       <div>
    //         <h1>Welcome</h1>
    //         <p>
    //           This is where you can see the menus, if you'd like to edit the menus, just <a href="#">login</a> and edit
    //           away :)
    //         </p>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div className="panel panel-default">
    //       <div className="panel-heading" style={styleDiv}>Homepage</div>
    //       <div className="panel-body">
    //         <h1>
    //           Manager - Homepage
    //         </h1>
    //       </div>
    //     </div>
    //   );
    // }
  }
}
Homepage.propTypes = {
  appData: PropTypes.object
};
export default Homepage;
