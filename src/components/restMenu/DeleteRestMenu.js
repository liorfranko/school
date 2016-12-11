/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';

class DeleteRestMenu extends React.Component {
  constructor(props) {
    console.log('DeleteRestMenu | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.props.chosenMenu);
  }


  render() {
    console.log('DeleteRestMenu | render', this.props);
    return (
      <div>
        {this.props.exit}
        <div >Deleting Menu</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Menu Name:
                <div>{this.props.chosenMenu['name']}</div>
              </div>
              <div>Are you sure you want to delete?</div>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}


export default DeleteRestMenu;
