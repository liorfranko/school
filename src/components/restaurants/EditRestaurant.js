/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditRestaurant extends React.Component {
  constructor(props) {
    // console.log('EditRestaurant | constructor | props', props);
    super(props);
    if (! props.rest) {
      this.state = {
        resName: '',
        resId: '',
        resAddress: ''
      };
    } else {
      this.state = {
        resName: this.props.rest['name'],
        resId: this.props.rest['_id'],
        resAddress: this.props.rest['address']
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    // console.log('EditDish | componentWillReceiveProps | nextProps', nextProps);
    // console.log('EditDish | componentWillReceiveProps | nextProps', this.props);

    if (! nextProps.rest) {
      this.state = {
        resName: '',
        resId: '',
        resAddress: ''
      };
    } else {
      this.state = {
        resName: nextProps.rest['name'],
        resId: nextProps.rest['_id'],
        resAddress: nextProps.rest['address']
      };
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state);
  }

  render() {
    // console.log('EditRestaurant | render');
    return (
      <Modal show={this.props.show} onHide={this.props.exit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="AddRestaurantForm" onSubmit={this.handleSubmit}>
            <label>
              <div>Dish Name:
                <input type="text" name="resName" value={this.state.resName} onChange={this.handleChange} required/>
              </div>
              <div>
                Dish Description:
                <input type="text" name="resAddress" value={this.state.resAddress}
                       onChange={this.handleChange} required/>
              </div>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <input type="submit" form="AddRestaurantForm" value="Submit" className="btn btn-default"/>
          <Button onClick={this.props.exit}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditRestaurant.propTypes = {
  handleClick: PropTypes.func,
  exit: PropTypes.func,
  rest: PropTypes.object,
  show: PropTypes.bool
};
export default EditRestaurant;
