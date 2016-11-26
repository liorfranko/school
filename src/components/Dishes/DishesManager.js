import React from 'react';
import ListOfDishes from './ListOfDishes';
import './dishes.styl';
import Popup from '../Popup/popup';
import * as $ from 'jquery';
import AddDish from './AddDish.js';
import EditDish from './EditDish.js';
import DeleteDish from './DeleteDish.js';

class DishesManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'main',
      selectedDish: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.editDish = this.editDish.bind(this);
    this.deleteDish = this.deleteDish.bind(this);
    this.addDish = this.addDish.bind(this);
  }

  componentDidMount() {
    // console.log('DishesManager | componentDidMount', this.props);
    // TODO: Ajax to load dishes
    if (!this.props.appData.dishes) {
      this.props.getDishes();
      // this.getDishes(this.props.uid);
    }
  }

  exitPopup() {
    this.setState({
      mode: 'main'
    });
  };

  handleClick() {
    // console.log('DishesManager | handleClick');
    this.setState({mode: 'main'});
    this.getDishes();
  }

  handleAddClick (data) {
    // console.log('DishesManager | handleAddClick', this.state);
    this.props.addDish(data);
    this.setState({mode: 'main'});
  }

  handleEditClick (data) {
    // console.log('DishesManager | handleEditClick', this.state);
    this.props.editDish(data);
    this.setState({mode: 'main'});
  }
  handleDeleteClick () {
    // console.log('DishesManager | handleDeleteClick', this.state.selectedDish);
    this.props.deleteDish(this.state.selectedDish);
    this.setState({mode: 'main'});
  }
  getDishes() {
    // console.log("DishesManager | getDishes");
    // TODO: Ajax to fetch
    const options = {
      url: 'http://35.156.80.173/WebService1.asmx/getDishes',
      data: {
        user_Id: this.props.uid
      }
    };

    $.post(options, (data) => {
      const items = JSON.parse(data).items || [];
      // console.log('DishesManager | getDishes data', data);
      // console.log('DishesManager | getDishes items ', items);
      this.setState({
        dishes: items
      });
      this.props.updateState({dishes: items});

    });
  }

  editDish(data) {
    // console.log('DishesManager | editDish', data);
    this.setState({
      mode: 'edit',
      selectedDish: data
    });
  }

  deleteDish(data) {
    // console.log('DishesManager | deleteDish', data);
    this.setState({
      mode: 'delete',
      selectedDish: data
    });
  }

  addDish() {
    // console.log('DishesManager | addDish', this.state);
    this.setState({
      mode: 'add'
    });
  }

  render() {
    console.log('DishesManager | render', this.state);
    if (!this.props.appData.data.dishes) {
      console.log('DishesManager | loading');
      return (
        <div>Loading</div>
      )
    } else {
      switch (this.state.mode) {
        case 'add':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <AddDish handleClick={this.handleAddClick.bind(this)}/>
            </Popup>
          );
        case 'edit':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <EditDish dishId={this.props.appData.data.dishes[this.state.selectedDish]._id}
                        dishName={this.props.appData.data.dishes[this.state.selectedDish].name}
                        dishDescription={this.props.appData.data.dishes[this.state.selectedDish].description}
                        defaultPrice={this.props.appData.data.dishes[this.state.selectedDish].defaultPrice}
                        handleClick={this.handleEditClick.bind(this)}
              />
            </Popup>
          );
        case 'delete':
          return (
            <Popup exitPopup={this.exitPopup.bind(this)}>
              <DeleteDish dishId={this.props.appData.data.dishes[this.state.selectedDish]._id}
                          dishName={this.props.appData.data.dishes[this.state.selectedDish].name}
                          dishDescription={this.props.appData.data.dishes[this.state.selectedDish].description}
                          defaultPrice={this.props.appData.data.dishes[this.state.selectedDish].defaultPrice}
                          handleClick={this.handleDeleteClick.bind(this)}
              />
            </Popup>
          );
        default:
          return (
            <div id="dishes">
            <span>
              Dishes Manager
            </span>
              <ListOfDishes dishes={this.props.appData.data.dishes} editDish={this.editDish} deleteDish={this.deleteDish}/>
              <div onClick={this.addDish}>Add Dish</div>
            </div>
          )
      }
    }


  }
}

export default DishesManager;
