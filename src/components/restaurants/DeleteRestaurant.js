/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteRestaurant extends React.Component {
  constructor(props) {
    // console.log('DeleteRestaurant | constructor');
    // console.log('DeleteRestaurant | props', props);
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick();
  }


  render() {
    // console.log('DeleteRestaurant | render', this.props);
    if (! this.props.rest) {
      return (null)
    } else {
      return (
        <Modal show={this.props.show} onHide={this.props.exit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Restaurant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="DeleteRestaurantForm" onSubmit={this.handleSubmit}>
              <label>
                <div>Dish Name:
                  {this.props.rest['name']}
                </div>
                <div>
                  Dish Description:
                  {this.props.rest['address']}
                </div>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" form="DeleteRestaurantForm" value="Delete" className="btn btn-default"/>
            <Button onClick={this.props.exit}>Close</Button>
          </Modal.Footer>
        </Modal> )
    }


      // <div>
      //   {this.props.exit}
      //   <div >Deleting Restaurant</div>
      //   <div>
      //     <form onSubmit={this.handleSubmit}>
      //       <label>
      //         <div>Restaurant Name:
      //           <div>{this.props['resName']}</div>
      //         </div>
      //         <div>
      //           Restaurant Address:
      //           <div>{this.props['resAddress']}</div>
      //           <div>Are you sure you want to delete?</div>
      //         </div>
      //       </label>
      //       <input type="submit" value="Submit"/>
      //     </form>
      //   </div>
      // </div>

  }
}


export default DeleteRestaurant;
