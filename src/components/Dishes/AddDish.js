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
  }

  handleChange(event) {
    // console.log('AddDish | handleChange', event.target.value);
    if (event.target.name == 'defaultPrice') {
      if (event.target.value == parseInt(event.target.value, 10)) {
        // console.log('AddDish | isInteger');
        this.setState({[event.target.name]: event.target.value});
      }
      else {
        // console.log('AddDish | not Integer');
        alert('The price can be only numbers')
      }
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state);
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
