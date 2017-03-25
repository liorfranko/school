/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class AddDish extends React.Component {
  constructor(props) {
    // console.log('AddDish | constructor');
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
    if (event.target.name == 'defaultPrice') {
      if (event.target.value == parseInt(event.target.value, 10)) {
        // console.log('AddDish | isInteger');
        this.setState({[event.target.name]: event.target.value});
      }
      else {
        // console.log('AddDish | not Integer');
        alert('The price can be only numbers')
      }
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state, event);
  }

  render() {
    //FIXME - Change the submit button to be the same as the modal buttons
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
                       onChange={this.handleChange} required/>
              </div>
              <div>
                Dish Price:
                <input type="text" name="defaultPrice" value={this.state.defaultPrice} onChange={this.handleChange}
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
    )
  }
}


export default AddDish;
