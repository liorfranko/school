/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class EditDish extends React.Component {
  constructor(props) {
    console.log('EditDish | constructor | props', props);
    super(props);
    if (! props.dish) {
      this.state = {
        dishName: '',
        dishId: '',
        dishDescription: '',
        defaultPrice: '',
      };
    } else {
      this.state = {
        dishName: this.props.dish['name'],
        dishId: this.props.dish['_id'],
        dishDescription: this.props.dish['description'],
        defaultPrice: this.props.dish['defaultPrice'],
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    // console.log('EditDish | componentWillReceiveProps | nextProps', nextProps);
    // console.log('EditDish | componentWillReceiveProps | nextProps', this.props);
    if (! nextProps.dish) {
      this.state = {
        dishName: '',
        dishId: '',
        dishDescription: '',
        defaultPrice: '',
      };
    } else {
      this.setState (
        {
          dishName: nextProps.dish['name'],
          dishId: nextProps.dish['_id'],
          dishDescription: nextProps.dish['description'],
          defaultPrice: nextProps.dish['defaultPrice'],
        }
      )
    }
  }

  handleChange(event) {
    // console.log('EditDish | handleChange', event.target.value);
    if (event.target.name == 'defaultPrice') {
      if (event.target.value == parseInt(event.target.value, 10)) {
        // console.log('EditDish | isInteger');
        this.setState({[event.target.name]: event.target.value});
      }
      else {
        // console.log('EditDish | not Integer');
        alert('The price can be only numbers')
      }
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state);
  }

  render() {
    // console.log('EditDish | render | props', this.props);
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Dish</Modal.Title>
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
      </Modal.Footer>
    </Modal>
    )

  }
}


export default EditDish;
