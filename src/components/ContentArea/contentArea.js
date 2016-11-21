import React from 'react';
import Home from './../Tabs/home';
import Restaurants from './../Tabs/restaurants';
import Dishes from './../Tabs/dishes';
import Logout from './../Tabs/logout';

class ContentArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      resList: null
    };
    this.handler = this.handler.bind(this)
  }

  componentDidMount() {
    var json = {
      userId: '5826fdc1680d800d2064d1da',
    };
    this.postDataToServer('getRestaurants', 'user_Id=' + json.userId)
  }

  postDataToServer(url, data) {
    var $ = require('jquery');
    $.post({
      url: 'http://35.156.80.173/WebService1.asmx/' + url,
      dataType: 'json',
      cache: false,
      data: data,
      success: function (data) {
        this.setState({resList: data});
        this.setState({loading: false});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
        alert('there is some problems loading data, please check the logs')
      }.bind(this)
    });
  }


  handler(e) {
    console.log('in contentArea');
    var json = {
      userId: '5826fdc1680d800d2064d1da',
    };
    this.postDataToServer('getRestaurants', 'user_Id=' + json.userId);
  }

  render() {
    var style = {
      width: 'auto',
      margin: '20px 0 20px 0',
      padding: '10px',
      border: '3px solid #E3E3E3',
    };
    return (
      <div style={style}>
        {(() => {
          switch (this.props.tab) {
            case "Home":
              return <Home />;
            case "Restaurants":
              return <Restaurants parentData={this.state} updateState={this.handler.bind(this)}/>;
            case "Dishes":
              return <Dishes />;
            case "Logout":
              return <Logout />;
            default:
              return <Home />;
          }
        })()}
      </div>
    );
  }
}
export default ContentArea;

