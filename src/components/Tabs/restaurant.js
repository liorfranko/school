import React from 'react';


class Restaurant extends React.Component {
    constructor(props) {
        // console.log('in Logout');
        super(props);
    }
    render() {
        // console.log(this.props.p.tabs[0].name);


        return (
            <div>
                {(() => {
                    switch (this.props.actionType) {
                        case "add":
                            return (
                                <div>
                                    <div>Adding new Restaurant</div>
                                    <div>Restaurant Name:       <input type="text"/></div>
                                    <div>Restaurant Address:    <input /></div>
                                </div>
                            );
                        case "delete":
                            return <div>Deleting Restaurant ID: {this.props.resId} </div>;
                        case "edit":
                            return <div>Editing Restaurant ID: {this.props.resId} </div>;
                        default:
                            return <div>Default case</div>;
                    }
                })()}
            </div>
        )
    }
}
export default Restaurant;

