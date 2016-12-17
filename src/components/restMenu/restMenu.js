/**
 * Created by liorf on 12/10/16.
 */
import React from 'react';

class RestMenu extends React.Component {
  constructor(props) {
    console.log('RestMenu | constructor | this.props', props);
    super(props);
    this.addSubMenu = this.addSubMenu.bind(this);
    this.editSubMenu = this.editSubMenu.bind(this);
  }

  addSubMenu() {
    console.log('RestMenu | addSubmenu | this.props', this.props);
    // this.props.addSubMenu('test');
  }

  editSubMenu() {
    console.log('RestMenu | editSubMenu | this.props', this.props);
    // this.props.editSubMenu('test');
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
              <a onClick={this.addSubMenu} className="innerItem">Add Submenu</a>
              <a onClick={this.editSubMenu} className="innerItem">Edit Submenu</a>
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
              <a onClick={this.addSubMenu} className="innerItem">Add Submenu</a>
              <a onClick={this.editSubMenu} className="innerItem">Edit Submenu</a>
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
              <a onClick={this.addSubMenu} className="innerItem">Add Submenu</a>
              <a onClick={this.editSubMenu} className="innerItem">Edit Submenu</a>
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
              <a onClick={this.addSubMenu} className="innerItem">Add Submenu</a>
              <a onClick={this.editSubMenu} className="innerItem">Edit Submenu</a>
            </div>
          </li>

        </ul>
      </div>
    )
  }
}

export default RestMenu;
