import React from 'react';
import HoverImage from '../HoverImage/hoverImage';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toClose: false
    }
  }
  exitPopup () {
    this.props.exitPopup();
  }
  render() {
    const deleteSrc = require('../../Images/delete_small.png');
    let style = {
      position: 'fixed',
      fontFamily: 'Arial, Helvetica, sans-serif',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      background: 'black',
      opacity: '0.9',
    };
    let styleDiv = {
      position: 'relative',
      opacity: '1',
      top: '5%',
      left: '5%',
      height: '50%',
      width: '50%',
      margin: '10% auto',
      background: 'white',
      padding: '5px 20px 13px 20px',
      borderRadius: '12px',
    };
    let closeStyle = {
      position: 'relative',
      top: '1%',
      left: '98%',
    };
    return (
      <div style={style}>
        <div style={styleDiv}>
          {React.cloneElement(this.props.children, {
            exit: <div style={closeStyle}><HoverImage img={deleteSrc} handleClick={this.exitPopup.bind(this)}/></div>
          })}
        </div>
      </div>
    )
  }
}
export default Popup;

