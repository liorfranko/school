/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import ListOfDishes from '../Dishes/ListOfDishes';
import {Modal, Button} from 'react-bootstrap';

class AddRestSubMenu extends React.Component {
  constructor(props) {
    console.log('AddRestSubMenu | constructor props', props);
    super(props);
    this.state = {
      resSubMenuName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateDishes = this.updateDishes.bind(this);
  }

  handleChange(event) {
    // console.log('AddRestMenu | handleChange', event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  // updateDishes(data) {
  //   var newArray = this.state.dishes.slice();
  //   newArray.push(data);
  //   this.setState({
  //     dishes: newArray
  //   });
    // console.log('AddRestMenu | updateDishes data', data);
    // console.log('AddRestMenu | updateDishes', this.state);
  // }

  handleSubmit(event) {
    event.preventDefault();
    console.log('AddRestMenu | handleSubmit', this.props);
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
        <input type="submit" form="AddSubMenuForm" value="Submit"/>
        <Button onClick={this.props.exit}>Close</Button>
        {/*<Button type="submit" onClick={this.handleSubmit} form="AddDishForm">Submit</Button>*/}
      </Modal.Footer>
    </Modal>
      // <div>
      //   {this.props.exit}
      //   <div>Adding new Menu</div>
      //   <div>
      //     <form onSubmit={this.handleSubmit}>
      //       <label>
      //         <div>Menu Name:
      //           <input type="text" name="resMenuName" value={this.state.resMenuName} onChange={this.handleChange} required/>
      //         </div>
      //       </label>
      //       <input type="submit" value="Submit"/>
      //     </form>
      //   </div>
      // </div>
    )
  }
}


export default AddRestSubMenu;
