/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import ListOfDishes from '../Dishes/ListOfDishes';

class AddRestMenu extends React.Component {
  constructor(props) {
    console.log('AddRestMenu | constructor');
    super(props);
    this.state = {
      restMenuName: '',
      dishes:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDishes = this.updateDishes.bind(this);
  }

  componentDidMount() {
    console.log('AddRestMenu | componentDidMount', this.props);
    if (!this.props.restManagerData.appData.data.dishes) {
      this.props.restManagerData.getDishes();
    }
  }

  handleChange(event) {
    console.log('AddRestMenu | handleChange', event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  updateDishes(data) {
    var newArray = this.state.dishes.slice();
    newArray.push(data);
    this.setState({
      dishes: newArray
    });
    console.log('AddRestMenu | updateDishes data', data);
    console.log('AddRestMenu | updateDishes', this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick(this.state);
  }

  render() {
    console.log('AddRestMenu | props', this.props);
    console.log('AddRestMenu | state', this.state);
    var style = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
    };
    var leftStyle = {
      background: 'green',
      width: '70%',
    };
    var rightStyle = {
      background: 'blue',
      width: '30%'
    };
    if (!this.props.restManagerData.appData.data.dishes) {
      console.log('AddRestMenu | loading');
      return (
        <div>Loading</div>
      )
    } else {
      return (
        <div>
          {this.props.exit}
          <div>Adding new Menu</div>
          <div name="menuContainer" style={style}>
            <div name="menuLeft" style={leftStyle}>
              <form onSubmit={this.handleSubmit}>
                <label>
                  <div>Menu Name:
                    <input type="text" name="restMenuName" value={this.state.restMenuName} onChange={this.handleChange}
                           required/>
                  </div>
                  <div>Dishes:</div>
                  {
                    this.state.dishes.map((dish, i) => {
                      console.log('dish | ', dish);
                      return (
                        <div key={i}>{dish[i].name}</div>
                      );
                    })
                  }
                </label>
                <input type="submit" value="Submit"/>
              </form>
            </div>
            <div name="menuRight" style={rightStyle}>
              Dishes:
              <ListOfDishes dishes={this.props.restManagerData.appData.data.dishes} type="inMenu"
                            updateDishes={this.updateDishes}/>
            </div>
          </div>
        </div>
      )
    }
  }
}


export default AddRestMenu;
