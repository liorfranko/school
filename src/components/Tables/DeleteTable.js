/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteTable extends React.Component {
  constructor(props) {
    // console.log('DeleteTable | constructor');
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.props.chosenTable);
  }


  render() {
    // console.log('DeleteTable | render', this.props);
    if (!this.props.chosenTable) {
      return (
        <div></div>
      )
    }
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="DeleteTableForm" onSubmit={this.handleSubmit}>
          <label>
            <div>Table Number:
              {this.props.chosenTable['tableNum']}
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <input type="submit" form="DeleteTableForm" value="Delete" className="btn btn-default"/>
        <Button onClick={this.props.exit}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}


export default DeleteTable;
