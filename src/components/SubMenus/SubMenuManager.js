/**
 * Created by liorf on 12/17/16.
 */
import React from 'react';
import './subMenu.styl';
import EditTable from '../../components/EditTable';


class subMenuManager extends React.Component {
  constructor(props) {
    // console.log('subMenuManager | constructor', props);
    super(props);
    this.exitPopup = this.exitPopup.bind(this);
    this.addRestSubMenu = this.addRestSubMenu.bind(this);
    this.deleteRestSubMenu = this.deleteRestSubMenu.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      selectedSubMenu: 0
    }
  }
  onChange(row) {
    // console.log('subMenuManager | onChange | row is:', row);
    // console.log('subMenuManager | onChange | this.props.menu is:', this.props);
    for (let i = 0; i < row.columns.length; i++) {
      // console.log('DishesManager | onChange | row is: ', row.columns[i]);
      if (row.columns[i].id === 0) {
        // console.log('DishesManager | onChange | row is: name');
        if (row.columns[i].value === "") {
          // console.log('DishesManager | onChange | row is empty');
          alert('Name can\'t empty.');
          return false
        }
      }
    }

    if (row.columns[1]) {
      let data = {
        menuId: this.props.menu._id,
        subMenuName: row.columns[0].value,
        subMenuId: row.columns[1].value,
      };
      // this.props.editSubMenu(data);
      this.props.editSubMenu(data);
    } else {
      this.props.addSubMenu(this.props.menu._id, row.columns[0].value);
    }
    return true
  }

  onDelete(e) {
    // console.log('subMenuManager | onDelete', this.props);
    let subMenu = this.props.menu.subMenus[e.rowId];
    // console.log('subMenuManager | onDelete | subMenu', subMenu);
    let data = {
      menuId: subMenu.menuId,
      _id: subMenu._id,
    };
    if (subMenu) {
      this.props.delSubMenu(data);
    }
  }

  exitPopup() {
    this.setState({
      showAddModal: false,
      showDeleteModal: false,
      selectedSubMenu: 0
    });
  };

  addRestSubMenu() {
    // console.log('subMenuManager | addRestSubMenu');
    this.setState({
      showAddModal: true
    });
  };

  deleteRestSubMenu(data) {
    // console.log('subMenuManager | deleteRestSubMenu | data', data);
    this.setState({
      showDeleteModal: true,
      selectedSubMenu: data
    });
  };

  handleAddClick(...data) {
    // console.log('subMenuManager | handleAddClick this.props', this.props);
    this.props.addSubMenu(...data);
    this.setState({
      showAddModal: false
    });
  }

  handleDeleteClick(...data) {
    // console.log('subMenuManager | handleDeleteClick this.props', data);
    this.props.delSubMenu(...data);
    this.setState({
      selectedSubMenu: 0,
      showDeleteModal: false
    });
  }

  render() {
    // console.log('subMenuManager | render | this.props', this.props);
    // console.log('subMenuManager | render | this.state', this.state);
    const styleDiv = {
      fontSize: 30
    };
    const headers = [
      {value: 'Name', type: 'TextField'},
    ];
    let rows = [];
    this.props.subMenus.map((row, index) => {
      rows.push(
        {
          columns: [
            {value: row.name, field: 'name', required: true},
            {value: row._id, field: 'id', hidden: true},
            {value: `/Admin/Restaurants/${this.props.rest.name}/Menus/${this.props.menu.name}/Submenus/${row.name}`, field: 'Link', link: true, hidden: true}
          ]
        }
      )
    });
    return (
      <div id="subMenu" className="panel panel-default">
        <div className="panel-heading" style={styleDiv}>{this.props.menu['name']}</div>
        <div className="panel-body">
          <EditTable
            onChange={this.onChange}
            onDelete={this.onDelete}
            rows={rows}
            headerColumns={headers}
            enableDelete={true}
          />
          {/*Sub Menus:*/}
          {/*<ListOfSubMenus*/}
            {/*subMenus={this.props.subMenus}*/}
            {/*dishes={this.props.dishes}*/}
            {/*delSubMenu={this.deleteRestSubMenu}*/}
            {/*rest={this.props.rest}*/}
            {/*menu={this.props.menu}*/}
          {/*/>*/}
          {/*<AddRestSubMenu*/}
            {/*handleClick={this.handleAddClick.bind(this)}*/}
            {/*exit={this.exitPopup.bind(this)}*/}
            {/*show={this.state.showAddModal}*/}
            {/*menu={this.props.menu}*/}
          {/*/>*/}
          {/*<Button onClick={this.addRestSubMenu}>Add Sub Menu</Button>*/}
          {/*<DeleteRestSubMenu*/}
            {/*chosenSubMenu={this.props.subMenus[this.state.selectedSubMenu]}*/}
            {/*handleClick={this.handleDeleteClick.bind(this)}*/}
            {/*exit={this.exitPopup.bind(this)}*/}
            {/*show={this.state.showDeleteModal}*/}
          {/*/>*/}
        </div>
      </div>
    )

  }
}

export default subMenuManager;
