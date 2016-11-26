/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class DeleteDish extends React.Component {
  constructor(props) {
    // console.log('DeleteDish | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick();
  }


  render() {
    // console.log('DeleteDish | render', this.props);
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
