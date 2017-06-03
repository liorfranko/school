/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class DeleteRestMenu extends React.Component {
  constructor(props) {
    // console.log('DeleteRestMenu | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.props.chosenMenu);
  }


  render() {
    // console.log('DeleteRestMenu | render', this.props);
    if (!this.props.chosenMenu) {
      return (
        null
      );
    }
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="DeleteMenuForm" onSubmit={this.handleSubmit}>
          <label>
            <div>Menu Name:
              {this.props.chosenMenu['name']}
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <input type="submit" form="DeleteMenuForm" value="Delete" className="btn btn-default"/>
        <Button onClick={this.props.exit}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

DeleteRestMenu.propTypes = {
  handleClick: PropTypes.func,
  exit: PropTypes.func,
  show: PropTypes.bool,
  chosenMenu: PropTypes.object
};
export default DeleteRestMenu;
