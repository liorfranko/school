/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import ListOfDishes from '../Dishes/ListOfDishes';

class AddRestMenu extends React.Component {
  constructor(props) {
    console.log('AddRestMenu | constructor props', props);
    super(props);
    this.state = {
      resMenuName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDishes = this.updateDishes.bind(this);
  }

  handleChange(event) {
    // console.log('AddRestMenu | handleChange', event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  updateDishes(data) {
    var newArray = this.state.dishes.slice();
    newArray.push(data);
    this.setState({
      dishes: newArray
    });
    // console.log('AddRestMenu | updateDishes data', data);
    // console.log('AddRestMenu | updateDishes', this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('AddRestMenu | handleSubmit', this.props);
    this.props.handleClick(this.state, this.props.rest._id);

  }

  render() {
    // console.log('AddRestMenu | props', this.props);
    // console.log('AddRestMenu | state', this.state);
    return (
      <div>
        {this.props.exit}
        <div>Adding new Menu</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Menu Name:
                <input type="text" name="resMenuName" value={this.state.resMenuName} onChange={this.handleChange} required/>
              </div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}


export default AddRestMenu;
