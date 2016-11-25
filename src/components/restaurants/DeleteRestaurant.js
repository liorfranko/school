/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class DeleteRestaurant extends React.Component {
  constructor(props) {
    // console.log('DeleteRestaurant | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postDataToServer = this.postDataToServer.bind(this);
  }

  postDataToServer(url, data, cb) {
    var $ = require('jquery');
    $.post({
      url: 'http://35.156.80.173/WebService1.asmx/' + url,
      cache: false,
      data: data,
      success: function (recData) {
        // console.log('DeleteRestaurant | postDataToServer done', recData);
        this.props.handleClick();

      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postDataToServer('removeRestaurant', '&restaurant_Id=' + this.props['resId'] + '&user_Id=5826fdc1680d800d2064d1da');
  }


  render() {
    // console.log('DeleteRestaurant | render', this.props);
    return (
      <div>
        {this.props.exit}
        <div >Deleting Restaurant</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Restaurant Name:
                <div>{this.props['resName']}</div>
              </div>
              <div>
                Restaurant Address:
                <div>{this.props['resAddress']}</div>
                <div>Are you sure you want to delete?</div>
              </div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}


export default DeleteRestaurant;
