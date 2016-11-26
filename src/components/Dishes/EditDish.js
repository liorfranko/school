/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class EditDish extends React.Component {
  constructor(props) {
    console.log('EditDish | constructor');
    super(props);
    this.state = {
      dishName: this.props['dishName'],
      dishId: this.props['dishId'],
      dishDescription: this.props['dishDescription'],
      defaultPrice: this.props['defaultPrice'],
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
    console.log('EditDish | handleSubmit', this.state);
    this.postDataToServer('editDish', '&dish_Id=' + this.state['dishId'] + '&name=' + this.state['dishName'] + '&description='+this.state['dishDescription'] + '&default_Price='+this.state['defaultPrice'], this.props['handleClick'])
  }

  postDataToServer(url, data, cb) {
    var $ = require ('jquery');
    $.post({
      url: 'http://35.156.80.173/WebService1.asmx/'+url,
      cache: false,
      data: data,
      success: function(recData) {
        // console.log('EditDish | postDataToServer done', recData);
        this.setState({loading: false});
        cb();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    // console.log('EditDish | render');
    return (
      <div>
        {this.props.exit}
        <div>Edit Dish</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Dish Name:
                <input type="text" name="dishName" value={this.state.dishName} onChange={this.handleChange}/>
              </div>
              <div>
                Dish Description:
                <input type="text" name="dishDescription" value={this.state.dishDescription} onChange={this.handleChange}/>
              </div>
              <div>
                Dish Price:
                <input type="text" name="defaultPrice" value={this.state.defaultPrice} onChange={this.handleChange}/>
              </div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )

  }
}


export default EditDish;
