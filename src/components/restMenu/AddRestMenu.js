/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import ListOfDishes from '../Dishes/ListOfDishes';
import {Modal, Button} from 'react-bootstrap';

class AddRestMenu extends React.Component {
  constructor(props) {
    // console.log('AddRestMenu | constructor props', props);
    super(props);
    this.state = {
      resMenuName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateDishes = this.updateDishes.bind(this);
  }

  handleChange(event) {
    // console.log('AddRestMenu | handleChange', event.target);
    this.setState({[event.target.name]: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
    // console.log('AddRestMenu | handleSubmit', this.props);
    this.props.handleClick(this.state, this.props.rest._id);

  }

  render() {
    // console.log('AddRestMenu | props', this.props);
    // console.log('AddRestMenu | state', this.state);
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Adding new Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="AddMenuForm" onSubmit={this.handleSubmit}>
          <label>
            <div>Menu Name:
              <input type="text" name="resMenuName" value={this.state.resMenuName} onChange={this.handleChange} required/>
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <input type="submit" form="AddMenuForm" value="Submit" className="btn btn-default"/>
        <Button onClick={this.props.exit}>Close</Button>
        {/*<Button type="submit" onClick={this.handleSubmit} form="AddDishForm">Submit</Button>*/}
      </Modal.Footer>
    </Modal>
    )
  }
}


export default AddRestMenu;
