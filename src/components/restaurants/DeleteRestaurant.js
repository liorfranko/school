/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class DeleteRestaurant extends React.Component {
  constructor(props) {
    // console.log('DeleteRestaurant | constructor');
    // console.log('DeleteRestaurant | props', props);
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick();
  }


  render() {
    // console.log('DeleteRestaurant | render', this.props);
    if (! this.props.rest) {
      return (null);
    } else {
      return (
        <Modal show={this.props.show} onHide={this.props.exit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Restaurant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="DeleteRestaurantForm" onSubmit={this.handleSubmit}>
              <label>
                <div>Dish Name:
                  {this.props.rest['name']}
                </div>
                <div>
                  Dish Description:
                  {this.props.rest['address']}
                </div>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" form="DeleteRestaurantForm" value="Delete" className="btn btn-default"/>
            <Button onClick={this.props.exit}>Close</Button>
          </Modal.Footer>
        </Modal> );
    }
  }
}
DeleteRestaurant.propTypes = {
  handleClick: PropTypes.func,
  exit: PropTypes.func,
  rest: PropTypes.object,
  show: PropTypes.bool
};

export default DeleteRestaurant;
