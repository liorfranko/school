/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import QRCode  from 'qrcode.react';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class QrCode extends React.Component {
  constructor(props) {
    // console.log('Restaurant | constructor | this.props', props);
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: true,
    };
  }

  handleOpen () {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
    browserHistory.goBack();
  };

  render() {
    // console.log('QrCode | render | props', this.props);
    const actions = [];
    return (
      <div>
        <Dialog
          title={`Table ${this.props.params.tableNum} QR Code`}
          actions={actions}
          modal={false}
          open={this.handleOpen}
          onRequestClose={this.handleClose}
        >
          <QRCode value={`http://${this.props.publicDns}/uRestaurants/${this.props.params.restName}/uTables/${this.props.params.tableNum}`} />
        </Dialog>
      </div>
    );
  }
}
export default QrCode;
