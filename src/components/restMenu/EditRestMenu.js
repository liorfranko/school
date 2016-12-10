/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class EditRestMenu extends React.Component {
  constructor(props) {
    console.log('EditRestMenu | constructor, props', props);
    super(props);
    this.state = {
      restMenuName: this.props.rest.name,
      restMenuId: this.props.rest._id,
      restaurantId: this.props.rest.restaurantId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    console.log('EditRestMenu | handleChange', event.target.value);
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state);
  }

  render() {
    console.log('EditRestMenu | render');
    return (
      <div>
        {this.props.exit}
        <div>
          Edit menu
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Menu Name:
                <input type="text" name="restMenuName" value={this.state.restMenuName} onChange={this.handleChange}/>
              </div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>

    )

  }
}


export default EditRestMenu;
