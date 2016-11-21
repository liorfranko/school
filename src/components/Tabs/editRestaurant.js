/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class EditRestaurant extends React.Component {
  constructor(props) {
    console.log('in AddRestaurant');
    super(props);
    this.state = {
      resName: this.props['resName'],
      resId: this.props['resId'],
      resAddress: this.props['resAddress'],
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
    this.setState({loading: true});
    console.log(this.state);
    this.postDataToServer('editRestaurant', '&restaurant_Id=' + this.props['resId'] + '&name=' + this.state['resName'] + '&address='+this.state['resAddress'], this.props['handleClick'])
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
                <input type="text" name="resName" value={this.state.resName} onChange={this.handleChange}/>
              </div>
              <div>
                Restaurant Address:
                <input type="text" name="resAddress" value={this.state.resAddress} onChange={this.handleChange}/>
              </div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )

  }
}


export default EditRestaurant;
