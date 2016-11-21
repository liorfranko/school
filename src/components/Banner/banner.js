import React from 'react';

class Banner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const src = require('../../Images/banner.jpg');
        // var elmnt = this.props.width;
        // console.log(elmnt.offsetHeight)
        // console.log(this.props.width)
        var style = {
            height: '200px',
            backgroundSize: 'cover',
            border: '3px solid #E3E3E3',
            backgroundImage: 'url(' + src + ')',
            backgroundRepeat: 'no-repeat'
        };
        // console.log(style)
        return (
            < div style = {style} > </div >
    )
        ;
    }
}

export default Banner;