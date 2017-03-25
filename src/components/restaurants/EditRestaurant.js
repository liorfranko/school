/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class EditRestaurant extends React.Component {
  constructor(props) {
    // console.log('EditRestaurant | constructor');
    super(props);
    this.state = {
      resName: this.props['resName'],
      resId: this.props['resId'],
      resAddress: this.props['resAddress'],
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    // console.log('EditDish | componentWillReceiveProps | nextProps', nextProps);
    // console.log('EditDish | componentWillReceiveProps | nextProps', this.props);

    this.setState (
      {
        resName: nextProps['resName'],
        resId: nextProps['resId'],
        resAddress: nextProps['resAddress']
      }
    )
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
          {/*<Button onClick={this.handleSubmit}>Submit</Button>*/}
        </Modal.Footer>
      </Modal>

      // <div>
      //   {this.props.exit}
      //   <div>Edit Restaurant</div>
      //   <div>
      //     <form onSubmit={this.handleSubmit}>
      //       <label>
      //         <div>Restaurant Name:
      //           <input type="text" name="resName" value={this.state.resName} onChange={this.handleChange}/>
      //         </div>
      //         <div>
      //           Restaurant Address:
      //           <input type="text" name="resAddress" value={this.state.resAddress} onChange={this.handleChange}/>
      //         </div>
      //       </label>
      //       <input type="submit" value="Submit"/>
      //     </form>
      //   </div>
      // </div>
    )

  }
}


export default EditRestaurant;
