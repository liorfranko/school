import React from 'react';
import Tab from './../Tab/tab';



class TabHolder extends React.Component {
	constructor(props) {
    super(props);


    this.state = {
      tabToShow: 1
    };

    this.tabToShow = this.tabToShow.bind(this);
  }

  tabToShow(ind) {
    console.log('tabToShow', ind);
    this.setState({
      tabToShow: ind
    });
  }

  render() {
    var style = {
          listStyle: 'none',
          margin: '0px',
          padding: '0px',
          width: 'auto'
        };
    return (
    <ul style={style}>
          {this.props.tabs.map((tab, i) => {
            console.log(i)
            console.log(tab)
            return (
                <Tab key={i} num={i} name={tab.name} chosen={tab.chosen} chosenByState={this.state.tabToShow === i} changeTabs={this.tabToShow}/>
              )
          })
        }
    </ul>
    );
  }
}

export default TabHolder;
