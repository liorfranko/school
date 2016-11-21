import React from 'react';

class Home extends React.Component {
    constructor(props) {
        // console.log('in home');
        super(props);
    }
    render() {
        // console.log(this.props.p.tabs[0].name);
        return (
            <div>
                <div>This is Home page</div>
                <div> I don't know what data will be here </div>
            </div>
        )
    }
}
export default Home;

