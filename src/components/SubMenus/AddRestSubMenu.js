/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class AddRestSubMenu extends React.Component {
  constructor(props) {
    // console.log('AddRestSubMenu | constructor props', props);
    super(props);
    this.state = {
      resSubMenuName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('AddRestMenu | handleChange', event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('AddRestMenu | handleSubmit', this.props);
    this.props.handleClick(this.props.menu._id, this.state.resSubMenuName);

  }

  render() {
    // console.log('AddRestMenu | props', this.props);
    // console.log('AddRestMenu | state', this.state);
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Adding new Sub Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="AddSubMenuForm" onSubmit={this.handleSubmit}>
          <label>
            <div>Sub Menu Name:
              <input type="text" name="resSubMenuName" value={this.state.resSubMenuName} onChange={this.handleChange} required/>
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <input type="submit" form="AddSubMenuForm" value="Submit" className="btn btn-default"/>
        <Button onClick={this.props.exit}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

AddRestSubMenu.propTypes = {
  handleClick: PropTypes.func,
  menu: PropTypes.object,
  show: PropTypes.bool,
  exit: PropTypes.func
};
export default AddRestSubMenu;
