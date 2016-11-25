/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class AddRestaurant extends React.Component {
  constructor(props) {
    console.log('in AddRestaurant');
    super(props);
    this.state = {
      resName: '',
      resAddress: '',
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postDataToServer = this.postDataToServer.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
    this.postDataToServer('addRestaurant', '&user_Id=5826fdc1680d800d2064d1da&name=' + this.state['resName'] + '&address='+this.state['resAddress'], this.props['handleClick'])
  }

  postDataToServer(url, data, cb) {
    var $ = require ('jquery');
    $.post({
      url: 'http://35.156.80.173/WebService1.asmx/'+url,
      cache: false,
      data: data,
      success: function(recData) {
        console.log('done');
        this.setState({loading: false});
        console.log(recData);
        cb();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    // console.log('here');
    // console.log(this.state);
    return (
      <div>
        {this.props.exit}
        <div>Adding new Restaurant</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Restaurant Name:
                <input type="text" name="resName" value={this.state.resName} onChange={this.handleChange} required/>
              </div>
              <div>
                Restaurant Address:
                <input type="text" name="resAddress" value={this.state.resAddress} onChange={this.handleChange} required/>
              </div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )

  }
}


export default AddRestaurant;
