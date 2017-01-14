import React from 'react';
import ListOfDishes from './ListOfDishes';
import './dishes.styl';
import Popup from '../Popup/popup';
import AddDish from './AddDish.js';
import EditDish from './EditDish.js';
import DeleteDish from './DeleteDish.js';
import { Popover, ButtonToolbar, OverlayTrigger, Button} from 'react-bootstrap';

class DishesManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'main',
      selectedDish: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.editDish = this.editDish.bind(this);
    this.deleteDish = this.deleteDish.bind(this);
    this.addDish = this.addDish.bind(this);
  }

  componentDidMount() {
    // console.log('DishesManager | componentDidMount', this.props);
    // TODO: Ajax to load dishes
    if (!this.props.appData.data.dishes) {
      this.props.getDishes();
    }
  }

  exitPopup() {
    this.setState({
      mode: 'main'
    });
  };

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
    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close" title="Popover bottom">
        <AddDish handleClick={this.handleAddClick.bind(this)}/>
      </Popover>
    );

    // console.log('DishesManager | render', this.state);
    if (!this.props.appData.data.dishes) {
      // console.log('DishesManager | loading');
      return (
        <div>Loading</div>
      )
    } else {
      switch (this.state.mode) {
        case 'add':
          return (
            <div id="dishes">
            <span>
              Dishes Manager
            </span>
              <ListOfDishes dishes={this.props.appData.data.dishes} editDish={this.editDish} deleteDish={this.deleteDish}/>
              <a onClick={this.addDish}>Add Dish</a>
            </div>
          // return (
          // <Popover id="popover-trigger-click-root-close" title="Popover bottom">
          //   <AddDish handleClick={this.handleAddClick.bind(this)}/>
          // </Popover>
            // <Popup exitPopup={this.exitPopup.bind(this)}>
            //   <AddDish handleClick={this.handleAddClick.bind(this)}/>
            // </Popup>
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
              {/*<a onClick={this.addDish}>Add Dish</a>*/}
              <ButtonToolbar>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverClickRootClose}>
                  <Button>Add Dish</Button>
                </OverlayTrigger>
              </ButtonToolbar>
            </div>
          )
      }
    }


  }
}

export default DishesManager;
