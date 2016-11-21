/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      uid: '5826fdc1680d800d2064d1da'
    }
  }
  
  render() {
    return (
      <div>
        <div>Header - Logo + Menu</div>
        {this.props.children}
        <div>Footer - links, & other shit</div>
      </div>
    )
  }
  
}

export default App;
