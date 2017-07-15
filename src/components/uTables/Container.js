/**
 * Created by liorf on 3/25/17.
 */

import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget } from 'react-dnd';

class Container extends Component {

  constructor(props) {
    // console.log('Container | constructor | props', props);
    super(props);
    this.state = { cards: props.list };
  }
  pushCard(card) {
    console.log('Container | pushCard | card', card);
    console.log('Container | pushCard | this.state', this.state);
    this.setState(update(this.state, {
      cards: {
        $push: [ card ]
      }
    }));
    if (this.props.addToAvailable) {
      this.props.addToAvailable(card);
    } else if (this.props.addToSelected) {
      this.props.addToSelected(card);
    }
    // console.log('Container | pushCard | this.state', this.state);
  }

  removeCard(index) {
    // console.log('Container | removeCard | card', index);
    // console.log('Container | removeCard | this.state', this.state);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1]
        ]
      }
    }));
    if (this.props.removeFromAvailable) {
      this.props.removeFromAvailable(index);
    } else if (this.props.removeFromSelected) {
      this.props.removeFromSelected(index);
    }
    // console.log('Container | removeCard | this.state', this.state);
  }

  moveCard(dragIndex, hoverIndex) {
    // console.log('Container | moveCard | dragIndex', dragIndex);
    // console.log('Container | moveCard | hoverIndex', hoverIndex);
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }
  render() {
    const { cards } = this.state;
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    const style = {
      width: "200px",
      height: "404px",
      border: '1px dashed gray'
    };

    const backgroundColor = isActive ? 'lightgreen' : '#FFF';
    // console.log('Container | render | cards', cards);
    if (cards.length > 0) {
      return connectDropTarget(
        <div style={{style, backgroundColor}}>
          <h3>{this.props.text}</h3>
          {cards.map((card, i) => {
            return (
              <Card
                key={card.id}
                index={i}
                listId={this.props.id}
                card={card}
                removeCard={this.removeCard.bind(this)}
                moveCard={this.moveCard.bind(this)} />
            );
          })}
        </div>
      );
    } else {
      return connectDropTarget(
        <div style={{style, backgroundColor}}>
          <h3>{this.props.text}</h3>
          <div>Empty</div>
        </div>
      );
    }

  }
}

const cardTarget = {
  drop(props, monitor, component ) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
    return {
      listId: id
    };
  }
};

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Container);
