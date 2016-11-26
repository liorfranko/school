/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class DeleteRestaurant extends React.Component {
  constructor(props) {
    // console.log('DeleteRestaurant | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick();
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
