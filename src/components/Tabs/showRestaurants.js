/**
 * Created by liorf on 11/16/16.
 */
import React from 'react';
import HoverImage from './../HoverImage/hoverImage';

class ShowRestaurants extends React.Component {
  constructor(props) {
    console.log('in ShowRestaurants');
    super(props);
  }

  render() {
    // console.log('render ShowRestaurants');
    // console.log(this.props);
    const deleteSrc = require('../../Images/delete_small.png');
    const editSrc = require('../../Images/edit_small.png');
    const addSrc = require('../../Images/add_small.png');
    var tableStyle = {
      display: 'table',
      tableLayout: 'fixed',
    };
    var tableRowStyleHeader = {
      display: 'table-row',
      borderTopColor: 'gray',
    };
    var tableRowStyleData = {
      display: 'table-row',
      borderTopColor: 'gray',
      width: '400px'
    };
    var tableCellStyle = {
      display: 'table-cell',
      width: '25%',

    };

    return (
      <div style={tableStyle}>
        <div style={tableRowStyleHeader}>
          <div style={tableCellStyle}>
            <b> Name</b>
          </div>
          <div style={tableCellStyle}>
            <b> Address</b>
          </div>
          <div style={tableCellStyle}></div>
          <div style={tableCellStyle}></div>
          <div style={tableCellStyle}><HoverImage img={addSrc} handleClick={this.props['handleClick']} type="add"/>
          </div>
        </div>
        {this.props['restaurants'].map((resData, i) => {
          return (
            <div key={i} style={tableRowStyleData}>
              <div style={tableCellStyle}>{resData.name}</div>
              <div style={tableCellStyle}>{resData.address}</div>
              <div style={tableCellStyle}>
                <HoverImage img={deleteSrc} handleClick={this.props['handleClick']} resId={resData._id}
                            type="delete"/>
              </div>
              <div style={tableCellStyle}>
                <HoverImage img={editSrc} handleClick={this.props['handleClick']} resId={resData._id} type="edit"/>
              </div>
            </div>
          )
        })}
      </div>
    );
  }

}

export default ShowRestaurants;
