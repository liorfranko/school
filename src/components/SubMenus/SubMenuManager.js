/**
 * Created by liorf on 12/17/16.
 */
import React from 'react';
import ListOfSubMenus from './ListOfSubMenus'
class subMenuManager extends React.Component {
  constructor(props) {
    console.log('subMenuManager | constructor', props);
    super(props)

  }
  render() {
    return (
      <ListOfSubMenus subMenus={this.props.subMenus}
                      dishes={this.props.dishes}
                      delSubMenu = {this.props.delSubMenu}
                      editSubMenu = {this.props.editSubMenu}
      />
    )
  }
}

export default subMenuManager;
