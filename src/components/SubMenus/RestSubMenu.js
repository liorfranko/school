/**
 * Created by liorf on 12/10/16.
 */
import React, { Component } from 'react';
import {render} from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
//{"subMenu_Id":"583cb590422ce433e4abec81","items":[{"Id":"ABCD"},{"Id":"EFGH"},{"Id":"IJKL"}]}

class RestSubMenu extends Component {
  constructor(props) {
    super(props);
    let available_dishes = [];
    let selected_dishes = [];
    this.props.appData.data.dishes.map((dish) => {
      available_dishes.push(dish.name)
    });
    console.log('RestSubMenu | available_dishes ', available_dishes);
    this.state = {
      available_dishes: available_dishes,
      selected_dishes: selected_dishes
    };
  }
  render() {
    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "20px"
    };
    let listOne = [];
    this.state.available_dishes.map((dish, i) => {
      listOne.push({id: i, text: dish})
    });
    let listTwo = [];
    this.state.selected_dishes.map((dish, i) => {
      listTwo.push({id: i, text: dish})
    });
    return (
      <div style={{style}}>
        <Container id={1} list={listOne} text="Available Dishes"/>
        <Container id={2} list={listTwo} text="Selected Dishes"/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(RestSubMenu);
