/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class AddRestaurant extends React.Component {
  constructor(props) {
    // console.log('AddRestaurant | constructor');
    super(props);
    this.state = {
      resName: '',
      resAddress: '',
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state);
  }

  render() {
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
