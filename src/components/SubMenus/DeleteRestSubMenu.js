/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteRestSubMenu extends React.Component {
  constructor(props) {
    // console.log('DeleteRestSubMenu | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.props.chosenSubMenu);
  }


  render() {
    // console.log('DeleteRestSubMenu | render', this.props);
    if (!this.props.chosenSubMenu) {
      return (
        <div></div>
      )
    }
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Sub Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="DeleteSubMenuForm" onSubmit={this.handleSubmit}>
          <label>
            <div>Sub Menu Name:
              {this.props.chosenSubMenu['name']}
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <input type="submit" form="DeleteSubMenuForm" value="Delete" className="btn btn-default"/>
        <Button onClick={this.props.exit}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}


export default DeleteRestSubMenu;
