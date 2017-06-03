import React from 'react';
import ListOfDishes from './ListOfDishes';
import './dishes.styl';
import AddDish from './AddDish.js';
import EditDish from './EditDish.js';
import DeleteDish from './DeleteDish.js';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';


class DishesManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: 0,
      showEditModal: false,
      showAddModal: false,
      showDeleteModal: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.openEditDish = this.openEditDish.bind(this);
    this.openDeleteDish = this.openDeleteDish.bind(this);
    this.openAddDish = this.openAddDish.bind(this);
  }

  componentDidMount() {
    // console.log('DishesManager | componentDidMount', this.props);
    if (!this.props.appData.data.dishes) {
      this.props.getDishes();
    }
  }

  exitPopup() {
    this.setState({
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false
    });
  }

  handleAddClick(data) {
    // console.log('DishesManager | handleAddClick | data', data);
    this.props.addDish(data);
    this.setState({
      showAddModal: false,
      selectedDish: 0
    });
  }

  handleEditClick(data) {
    // console.log('DishesManager | handleEditClick', this.state);
    this.props.editDish(data);
    this.setState({
      showEditModal: false,
      selectedDish: 0
    });
  }

  handleDeleteClick() {
    // console.log('DishesManager | handleDeleteClick', this.state.selectedDish);
    this.props.deleteDish(this.state.selectedDish);
    this.setState({
      showDeleteModal: false,
      selectedDish: 0
    });
  }

  openEditDish(data) {
    // console.log('DishesManager | editDish', data);
    this.setState({
      selectedDish: data,
      showEditModal: true
    });
  }

  openDeleteDish(data) {
    // console.log('DishesManager | deleteDish', data);
    this.setState({
      selectedDish: data,
      showDeleteModal: true
    });
  }

  openAddDish() {
    // console.log('DishesManager | addDish', this.state);
    this.setState({
      showAddModal: true
    });
  }

  render() {
    // console.log('DishesManager | render', this.state);
    // console.log('DishesManager | this.props.appData.data.dishes', this.props.appData.data.dishes);
    const src = require("../../Images/5.gif");
    const styleDiv = {
      fontSize: 30
    };
    if (!this.props.appData.data.dishes) {
      // console.log('DishesManager | loading');
      return (
        <div id="dishes" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Dishes:</div>
          <div className="panel-body">
            <img src={src}/>
          </div>
        </div>
      );
    } else {
      return (
        <div id="dishes" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Dishes:</div>
          <div className="panel-body">
            <ListOfDishes dishes={this.props.appData.data.dishes}
                          editDish={this.openEditDish}
                          deleteDish={this.openDeleteDish}/>
            <Button onClick={this.openAddDish}>Add Dish</Button>
            <AddDish handleClick={this.handleAddClick} exit={this.exitPopup}
                     show={this.state.showAddModal}/>
            <EditDish
              dish={this.props.appData.data.dishes[this.state.selectedDish]}
              handleClick={this.handleEditClick}
              exit={this.exitPopup}
              show={this.state.showEditModal}
            />
            <DeleteDish
              dish={this.props.appData.data.dishes[this.state.selectedDish]}
              handleClick={this.handleDeleteClick}
              exit={this.exitPopup}
              show={this.state.showDeleteModal}
            />
          </div>
        </div>
      );
    }
  }
}

DishesManager.propTypes = {
  appData: PropTypes.object,
  getDishes: PropTypes.func,
  addDish: PropTypes.func,
  editDish: PropTypes.func,
  deleteDish: PropTypes.func
};
export default DishesManager;
