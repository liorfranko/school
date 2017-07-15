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
    const imgUrl = require("../../Images/placeholder-restaurants.jpg");
    let styles = {
      wrapper: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        width: '100%',
      },
      text: {
        position: 'absolute',
        overflow: 'hidden',
        fontSize: '40px',
        fontSizeAdjust: 'true',
        color: 'white',
        fontWeight:'bold'
      },
    };
    return (
      <div>
        <div style={styles.wrapper}>
          <div style={styles.text}>Welcome to Rest Manager</div>
          <img src={imgUrl} />
        </div>
      </div>
    );

  }
}
Homepage.propTypes = {
  appData: PropTypes.object
};
export default Homepage;
