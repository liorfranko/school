/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

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
      <Modal show={this.props.show} onHide={this.props.exit}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Dish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="DeleteDishForm" onSubmit={this.handleSubmit}>
            <label>
              <div>Dish Name:
                {this.props['dishName']}
                </div>
              <div>
                Dish Description:
                {this.props['dishDescription']}
              </div>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <input type="submit" form="DeleteDishForm" value="Delete" className="btn btn-default"/>
          <Button onClick={this.props.exit}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}


export default DeleteDish;
