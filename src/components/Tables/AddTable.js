/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import ListOfDishes from '../Dishes/ListOfDishes';
import {Modal, Button} from 'react-bootstrap';

class AddTable extends React.Component {
  constructor(props) {
    // console.log('AddRestMenu | constructor props', props);
    super(props);
    this.state = {
      tableNum: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateDishes = this.updateDishes.bind(this);
  }

  handleChange(event) {
    // console.log('AddDish | handleChange', event.target.value);
    if (event.target.name == 'tableNum') {
      if (event.target.value == parseInt(event.target.value, 10)) {
        // console.log('AddDish | isInteger');
        this.setState({[event.target.name]: event.target.value});
      }
      else {
        // console.log('AddDish | not Integer');
        alert('The table number can be only numbers')
      }
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log('AddRestMenu | handleSubmit', this.props);
    this.props.handleClick(this.props.rest._id, this.state);

  }

  render() {
    // console.log('AddRestMenu | props', this.props);
    // console.log('AddRestMenu | state', this.state);
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Adding new Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="AddTableForm" onSubmit={this.handleSubmit}>
          <label>
            <div>Table Number:
              <input type="text" name="tableNum" value={this.state.tableNum} onChange={this.handleChange} required/>
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <input type="submit" form="AddTableForm" value="Submit" className="btn btn-default"/>
        <Button onClick={this.props.exit}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}


export default AddTable;
