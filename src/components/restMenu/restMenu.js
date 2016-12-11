/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';

class RestMenu extends React.Component {
  constructor(props) {
    console.log('RestMenu | constructor | this.props', props);
    super(props);
    this.addSubMenu = this.addSubMenu.bind(this);
  }

  addSubMenu() {
    console.log('RestMenu | addSubmenu | this.props', this.props)
    this.addSubMenu('test');
  }
  render() {
    return (
      <div id="subMenu">RestMenu
        Name: {this.props.params.menuName}
        <ul className="subMenuList list-group">
          <li className="subMenuItem list-group-item">
            <div className="innerItem sub1">
              Submenu1
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
            </div>
            <div className="innerItem sub1">
              Submenu2
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
            </div>
            <div className="innerItem sub1">
              Submenu3
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
            </div>
            <div className="innerItem sub1">
              Submenu4
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
              <div className="innerItem">
                <div className="innerItem"> innerSub</div>
                <div className="innerItem"> Edit</div>
                <div className="innerItem"> Delete</div>
              </div>
            </div>
          </li>
          <a onClick={this.addSubMenu}>Add restaurant</a>
          {/*<div className="innerItem">Add Submenu</div>*/}
          <div className="innerItem">Edit Menu</div>
        </ul>
      </div>
    )
  }
}

export default RestMenu;
