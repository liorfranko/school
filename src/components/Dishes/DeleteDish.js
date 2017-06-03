/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class DeleteDish extends React.Component {
  constructor(props) {
    // console.log('DeleteDish | constructor | props', props);
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick();
  }

  render() {
    // console.log('DeleteDish | render', this.props);
    if (! this.props.dish) {
      return (null);
    } else {
      return (
        <Modal show={this.props.show} onHide={this.props.exit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Dish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="DeleteDishForm" onSubmit={this.handleSubmit}>
              <label>
                <div>Dish Name:
                  {this.props.dish['name']}
                </div>
                <div>
                  Dish Description:
                  {this.props.dish['description']}
                </div>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" form="DeleteDishForm" value="Delete" className="btn btn-default"/>
            <Button onClick={this.props.exit}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}

DeleteDish.propTypes = {
  handleClick: PropTypes.func,
  dish: PropTypes.object,
  item: PropTypes.object,
  exit: PropTypes.func,
  deleteDish: PropTypes.func,
  dishNum: PropTypes.number,
  show: PropTypes.bool
};
export default DeleteDish;
