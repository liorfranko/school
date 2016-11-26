/**
 * Created by Alex on 21/11/2016.
 */

import React from 'react';
import Menu from './menu/Menu';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '5826fdc1680d800d2064d1da',
      data: {},
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(data) {
    this.setState({
      data: Object.assign({}, this.state.data, data)
    });
  }

  render() {
    // console.log('App.js | this.state', this.state);
    return (
      <div className="container">
        <div>Header - Logo + Menu</div>
        <Menu menu={[
          {name: 'homepage', path: '/'}, {name: 'rests', path: 'rests'}, {name: 'dishes', path: 'dishes'}
          ]}/>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child, {appData: this.state.data, uid: this.state.uid, updateState: this.updateState}))}
        <div>Footer - links, & other shit</div>
      </div>
    )
  }

}

export default App;
