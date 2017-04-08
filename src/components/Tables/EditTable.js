/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

// class EditTable extends React.Component {
//   constructor(props) {
//     console.log('EditTable | constructor, props', props);
//     super(props);
//     this.state = {
//       tableNum: this.props.chosenTable.tableNum,
//       tableId: this.props.chosenTable._id,
//       restaurantId: this.props.chosenTable.restaurantId
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//
//   }
//
//   handleChange(event) {
//     console.log('EditTable | handleChange', event.target.value);
//     this.setState({[event.target.name]: event.target.value})
//   }
//
//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.handleClick(this.state);
//   }
//
//   render() {
//     console.log('EditTable | render');
//     return (
//       <div>
//         {this.props.exit}
//         <div>
//           Edit Table
//         </div>
//         <div>
//           <form onSubmit={this.handleSubmit}>
//             <label>
//               <div>Table Number:
//                 <input type="text" name="restMenuName" value={this.state.tableNum} onChange={this.handleChange}/>
//               </div>
//             </label>
//             <input type="submit" value="Submit"/>
//           </form>
//         </div>
//       </div>
//
//     )
//
//   }
// }
// export default EditTable;


class EditTable extends React.Component {
  constructor(props) {
    console.log('EditTable | constructor | props', props);
    super(props);
    if (! props.chosenTable) {
      this.state = {
        tableNum: '',
        tableId: '',
        restaurantId: '',
      };
    } else {
      this.state = {
        tableNum: this.props.chosenTable['tableNum'],
        tableId: this.props.chosenTable['_id'],
        restaurantId: this.props.chosenTable['restaurantId'],
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    console.log('EditDish | componentWillReceiveProps | nextProps', nextProps);
    console.log('EditDish | componentWillReceiveProps | this.props', this.props);
    if (! nextProps.chosenTable) {
      this.state = {
        tableNum: '',
        tableId: '',
        restaurantId: '',
      };
    } else {
      this.setState (
        {
          tableNum: nextProps.chosenTable['tableNum'],
          tableId: nextProps.chosenTable['_id'],
          restaurantId: nextProps.chosenTable['restaurantId'],
        }
      )
    }
  }

  handleChange(event) {
    // console.log('EditDish | handleChange', event.target.value);
    if (event.target.name == 'tableNum') {
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
    console.log('EditTable | render | props', this.props);
    return (
      <Modal show={this.props.show} onHide={this.props.exit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="AddTableForm" onSubmit={this.handleSubmit}>
            <label>
              <div>
                Table Number:
                <input type="text" name="tableNum" value={this.state.tableNum} onChange={this.handleChange}
                       required/>
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


export default EditTable;
