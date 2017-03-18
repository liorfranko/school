/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}/>
      ))}
    </ul>
  );
});
//{"subMenu_Id":"583cb590422ce433e4abec81","items":[{"Id":"ABCD"},{"Id":"EFGH"},{"Id":"IJKL"}]}

class RestSubMenu extends React.Component {
  constructor(props) {
    console.log('RestSubMenu | constructor | this.props', props);
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
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

  onSortEnd(oldIndex, newIndex) {
    console.log('RestSubMenu | constructor | this.state', this.state);
    this.setState({
      available_dishes: arrayMove(this.state.available_dishes, oldIndex, newIndex),
    });
  }

  render() {
    return (
      <div className="innerItem name">
        <div>Sub Menu name: {this.props.params.subMenuName}</div>
        <div> Selected Dishes:
          <SortableList items={this.state.selected_dishes} onSortEnd={this.onSortEnd}/>
        </div>
        <div> Available Dishes:
          <SortableList items={this.state.available_dishes} onSortEnd={this.onSortEnd}/>
        </div>
      </div>
    )
  }
}

export default RestSubMenu;
