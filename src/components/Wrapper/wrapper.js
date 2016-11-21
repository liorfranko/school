import React from 'react';
import Banner from './../Banner/banner';
import Footer from './../Footer/footer';
import TabSection from './../TabSection/tabSection';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var style = {
      width: 'auto',
      margin: '0 auto',
      padding: '10px',
      border: '5px solid #dedede',
      backgroundColor: '#fff'
          };
    return (
    <div style={style}>
          <Banner width={this}/>
          <TabSection />
          <Footer />
    </div>
    );
  }
}

export default Wrapper;
