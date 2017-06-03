/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class AddDish extends React.Component {
  constructor(props) {
    console.log('AddDish | constructor | ', props);
    super(props);
    this.state = {
      dishName: '',
      dishDescription: '',
      defaultPrice: '',
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('AddDish | handleChange', event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state, event);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.exit}>
        <Modal.Header closeButton>
          <Modal.Title>Adding new Dish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="AddDishForm" onSubmit={this.handleSubmit}>
            <label>
              <div>Dish Name:
                <input type="text" name="dishName" value={this.state.dishName} onChange={this.handleChange} required/>
              </div>
              <div>
                Dish Description:
                <input type="text" name="dishDescription" value={this.state.dishDescription}
                       onChange={this.handleChange} />
              </div>
              <div>
                Dish Price:
                <input type="number" name="defaultPrice" value={this.state.defaultPrice} onChange={this.handleChange}
                       required/>
              </div>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <input type="submit" form="AddDishForm" value="Submit" className="btn btn-default"/>
          <Button onClick={this.props.exit}>Close</Button>
          {/*<Button type="submit" onClick={this.handleSubmit} form="AddDishForm">Submit</Button>*/}
        </Modal.Footer>
      </Modal>
    );
  }
}

AddDish.propTypes = {
  handleClick: PropTypes.func,
  show: PropTypes.bool,
  exit: PropTypes.func
};
export default AddDish;
