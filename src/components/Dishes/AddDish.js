/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class AddDish extends React.Component {
  constructor(props) {
    // console.log('AddDish | constructor');
    super(props);
    this.state = {
      dishName: '',
      dishDescription: '',
      defaultPrice: '',
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
    this.postDataToServer('addDish', '&user_Id=5826fdc1680d800d2064d1da&name=' + this.state['dishName'] + '&description='+this.state['dishDescription'] + '&defaultPrice='+this.state['defaultPrice'])
  }

  postDataToServer(url, data) {
    var $ = require ('jquery');
    $.post({
      url: 'http://35.156.80.173/WebService1.asmx/'+url,
      cache: false,
      data: data,
      success: function(recData) {
        // console.log('AddDish | postDataToServer done', recData);
        this.setState({loading: false});
        this.props.handleClick();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        {this.props.exit}
        <div>Adding new Dish</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Dish Name:
                <input type="text" name="dishName" value={this.state.dishName} onChange={this.handleChange} required/>
              </div>
              <div>
                Dish Description:
                <input type="text" name="dishDescription" value={this.state.dishDescription} onChange={this.handleChange} required/>
              </div>
              <div>
                Dish Price:
                <input type="text" name="defaultPrice" value={this.state.defaultPrice} onChange={this.handleChange} required/>
              </div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )

  }
}


export default AddDish;
