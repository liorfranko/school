/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class DeleteDish extends React.Component {
  constructor(props) {
    console.log('DeleteDish | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postDataToServer = this.postDataToServer.bind(this);
  }

  postDataToServer(url, data) {
    var $ = require('jquery');
    $.post({
      url: 'http://35.156.80.173/WebService1.asmx/' + url,
      cache: false,
      data: data,
      success: function (recData) {
        console.log('DeleteDish | postDataToServer done', recData);
        this.props.handleClick();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postDataToServer('removeDish', '&dish_Id=' + this.props['dishId'] + '&user_Id=5826fdc1680d800d2064d1da');
  }


  render() {
    console.log('DeleteDish | render', this.props);
    return (
      <div>
        {this.props.exit}
        <div >Deleting Dish</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Dish Name:
                <div>{this.props['dishName']}</div>
              </div>
              <div>
                Dish Description:
                <div>{this.props['dishDescription']}</div>
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


export default DeleteDish;
