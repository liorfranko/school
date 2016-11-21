/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    
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
