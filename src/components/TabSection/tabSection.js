import React from 'react';
import ContentArea from './../ContentArea/contentArea';
import Navigation from './../Navigation/navigation';
// import Home from './../Tabs/home';


class TabSection extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.state = {
            tabsArr: [
                {name: 'Home', chosen: true,color: 'black'},
                {name: 'Restaurants', chosen: false,color: 'white'},
                {name: 'Dishes', chosen: false,color: 'white'},
                {name: 'Logout', chosen: false,color: 'white'}
            ]
        }
    }

    handleClick (ind) {
        var newState = this.state.tabsArr.map ((tab, i) => {
            if (i == ind) {
                tab.chosen = true;
                tab.color = 'black';
            } else {
                tab.chosen = false;
                tab.color = 'white';
            }

        });
        this.setState(newState);
    }

    handleMouseEnter (ind) {
        var newState = this.state.tabsArr.map ((tab, i) => {
            if (i == ind) {
                tab.color = 'lightblue';
            }

        });
        this.setState(newState);
    }

    handleMouseLeave (ind) {
        var newState = this.state.tabsArr.map ((tab, i) => {
            if (i == ind) {
                if (tab.chosen) {
                    tab.color = 'black'
                } else {
                    tab.color = 'white';
                }

            }
        });
        this.setState(newState);
    }

    render() {
        var tab = this.state.tabsArr.find(function (getTab) {return getTab.name && getTab.chosen== true});
        return (
            <div>
                <Navigation tabs={this.state.tabsArr.map(tab=>{return {name: tab.name, chosen: tab.chosen, color: tab.color}})}
                            handleClick={this.handleClick.bind(this)}
                            handleMouseEnter={this.handleMouseEnter.bind(this)}
                            handleMouseLeave={this.handleMouseLeave.bind(this)}/>
                <ContentArea tab={tab.name}/>
            </div>
        );
    }
}

export default TabSection;
