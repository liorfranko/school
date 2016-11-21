import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const src = require('../../Images/bar_background.png');
    var style = {
        clear: 'both',
        width: 'auto',
        height: '40px',
        marginTop: '20px',
        backgroundImage: 'url('+ src +')',
        textShadow: '0.1em 0.1em #333',
        color: '#fff',
        textAlign: 'center',
          };
    return (
      <div style={style}>
    </div>
    );
  }
}

export default Footer;