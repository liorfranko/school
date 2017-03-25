/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class AddRestaurant extends React.Component {
  constructor(props) {
    // console.log('AddRestaurant | constructor');
    super(props);
    this.state = {
      resName: '',
      resAddress: '',
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('AddRestaurant | handleChange', event.target);
    this.setState({[event.target.name]: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state);
  }

  render() {
    return (
    <Modal show={this.props.show} onHide={this.props.exit}>
      <Modal.Header closeButton>
        <Modal.Title>Adding new Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="AddDishForm" onSubmit={this.handleSubmit}>
          <label>
            <div>Restaurant Name:
              <input type="text" name="resName" value={this.state.resName} onChange={this.handleChange} required/>
            </div>
            <div>
              Restaurant Address:
              <input type="text" name="resAddress" value={this.state.resAddress}
                     onChange={this.handleChange} required/>
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
      // <div>
      //   {this.props.exit}
      //   <div>Adding new Restaurant</div>
      //   <div>
      //     <form onSubmit={this.handleSubmit}>
      //       <label>
      //         <div>Restaurant Name:
      //           <input type="text" name="resName" value={this.state.resName} onChange={this.handleChange} required/>
      //         </div>
      //         <div>
      //           Restaurant Address:
      //           <input type="text" name="resAddress" value={this.state.resAddress} onChange={this.handleChange} required/>
      //         </div>
      //       </label>
      //       <input type="submit" value="Submit"/>
      //     </form>
      //   </div>
      // </div>
    )

  }
}


export default AddRestaurant;
