/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class EditRestaurant extends React.Component {
  constructor(props) {
    // console.log('EditRestaurant | constructor');
    super(props);
    this.state = {
      resName: this.props['resName'],
      resId: this.props['resId'],
      resAddress: this.props['resAddress'],
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
    // console.log('EditRestaurant | render');
    return (
      <div>
        {this.props.exit}
        <div>Edit Restaurant</div>
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
