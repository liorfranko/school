/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class EditDish extends React.Component {
  constructor(props) {
    // console.log('EditDish | constructor');
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
  }

  handleChange(event) {
    // console.log('EditDish | handleChange', event.target.value);
    if (event.target.name == 'defaultPrice') {
      if (event.target.value == parseInt(event.target.value, 10)) {
        // console.log('EditDish | isInteger');
        this.setState({[event.target.name]: event.target.value});
      }
      else {
        // console.log('EditDish | not Integer');
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
