import React from 'react';

class HoverImage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  };

  mouseOver () {
    this.setState({hover: true});
  };

  mouseOut () {
    this.setState({hover: false});
  };

  render () {
    // console.log(this.props);
    var imageStyle = {
      opacity: '1',
      cursor: 'pointer'
    };
    var src = this.props.img;
    if (this.state.hover) {
      imageStyle = {
        opacity: '0.6',
        cursor: 'pointer'
      };
    }
    return (
      <div>
        <img style={imageStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} src={src} height="20"
             width="20" onClick={() => this.props.handleClick(this.props)}/>
      </div>
    )

  }
}
export default HoverImage;
