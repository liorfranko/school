/**
 * Created by liorf on 7/15/17.
 */
import Image from 'react'
import React from 'react';


class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const imgUrl = require("../Images/placeholder-restaurants.jpg");
    let styles = {
      text: {
        // backgroundImage: 'url(' + imgUrl + ')',
        overflow: 'hidden',
        position: 'absolute'
      }
    };

    return (
      <div className="heading">
        <img src={imgUrl}/>
        <div className="h1" style={styles.text}>RestManager</div>
      </div>
    )
  }

}

export default Header;
