import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const src = require('../../Images/bar_background.png');
    var DivStyle = {
      height: '60px',
      border: '3px solid #E3E3E3',
      marginTop: '20px',
      backgroundImage: 'url(' + src + ')',
      textShadow: '0.1em 0.1em #333'
    };

    var LiStyle = {
      fontSize: '24px',
      float: 'left',
      position: 'relative',
      width: '180px',
      height: '50px'
    };
    var UlStyle = {
      listStyleType: 'none',
      margin: '0px',
      padding: '0px',
      overflow: 'hidden'
    };
    return (
      <div style={DivStyle}>
        <ul style={UlStyle}>
          {this.props.tabs.map((tab, i) => {
            return (
              <li key={i} style={LiStyle}><a onClick={() => this.props.handleClick(i)}
                                             onMouseEnter={() => this.props.handleMouseEnter(i)}
                                             onMouseLeave={() => this.props.handleMouseLeave(i)}
                                             style={{color: '' + tab.color + ''}}> {tab.name}
              </a></li>
            );
          })
          }
        </ul>
      </div>
    );
  }
}

export default Navigation;
