/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import QRCode  from 'qrcode.react';

class QrCodeModal extends React.Component {
  constructor(props) {
    // console.log('QrCode | constructor | props', props);
    super(props);

  }

  render() {
    // console.log('QrCode | render | props', this.props);
    return (
      <Modal show={this.props.show} onHide={this.props.exit}>
        <Modal.Header closeButton>
          <Modal.Title>Table {this.props.chosenTable.tableNum} - QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="AddTableForm" onSubmit={this.handleSubmit}>
            <QRCode value={`http://${this.props.publicDns}/uRestaurants/${this.props.rest.name}/uTables/${this.props.chosenTable.tableNum}`} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.exit}>Close</Button>
        </Modal.Footer>
      </Modal>
    )

  }
}


export default QrCodeModal;
