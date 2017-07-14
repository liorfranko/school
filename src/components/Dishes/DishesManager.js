import React from 'react';
import './dishes.styl';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import EditTable from '../../components/EditTable';

class DishesManager extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    // console.log('DishesManager | componentDidMount', this.props);
    if (!this.props.appData.data.dishes) {
      this.props.getDishes();
    }
  }


  onChange(row) {
    // console.log('DishesManager | onChange | row is:', row);
    // console.log('DishesManager | onChange | this.props.appData.data.dishes.length:', this.props.appData.data.dishes.length);
    for (let i = 0; i < row.columns.length; i++) {
      // console.log('DishesManager | onChange | row is: ', row.columns[i]);
      if (row.columns[i].id === 0) {
        // console.log('DishesManager | onChange | row is: name');
        if (row.columns[i].value === "" ) {
          // console.log('DishesManager | onChange | row is empty');
          alert('Name can\'t empty.');
          return false
        }
      }
      if (row.columns[i].id === 2) {
        // console.log('DishesManager | onChange | row is: price');
        if (row.columns[i].value === "" ) {
          // console.log('DishesManager | onChange | row is empty');
          alert('Price can\'t empty.');
          return false
        } else {
          // console.log('DishesManager | onChange | row is not empty');
          if (isNaN(row.columns[i].value)) {
            alert('Price is invalid \'' + row.columns[i].value + '\'.');
            return false
          }
        }
      }
    };

    if (row.columns[3]){
      // console.log('id exists | row[3]', row.columns[3]);
      let dish = this.props.appData.data.dishes.findIndex(x => x._id === row.columns[3].value);
      let data = {
        dishName: row.columns[0].value,
        dishDescription: row.columns[1].value,
        defaultPrice: row.columns[2].value,
        dishId: row.columns[3].value,
      };
      // console.log('data is:', data);
      this.props.editDish(data);
    } else {
      // console.log('id not exists - New dish');
      let data = {
        dishName: row.columns[0].value,
        dishDescription: row.columns[1].value,
        defaultPrice: row.columns[2].value,
      };
      // console.log('data is:', data);
      this.props.addDish(data);
    }
    return true
  }

  onDelete(e) {
    // console.log('DishesManager | onDelete', e);
    // console.log('DishesManager | Dish', this.props.appData.data.dishes[e.rowId]);
    let Dish = this.props.appData.data.dishes[e.rowId];
    if (Dish) {
      this.props.deleteDish(e.rowId);
    }
  }

  render() {
    // console.log('DishesManager | render', this.state);
    // console.log('DishesManager | this.props.appData.data.dishes', this.props.appData.data.dishes);
    const styleDiv = {
      fontSize: 30
    };
    const headers = [
      {value: 'Name', type: 'TextField'},
      {value: 'Description', type: 'TextField'},
      {value: 'Price', type: 'TextField'},
    ];
    let rows = [];
    if (!this.props.appData.data.dishes) {
      // console.log('DishesManager | loading');
      return (
        <div id="dishes" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Dishes:</div>
          <div className="panel-body">
              <CircularProgress />
          </div>
        </div>
      );
    } else {
      this.props.appData.data.dishes.map((row, index) => {
        rows.push(
          {
            columns: [
              {value: row.name, field: 'name', required: true},
              {value: row.description, field: 'description'},
              {value: row.defaultPrice, field: 'defaultPrice', required: true},
              {value: row._id, field: 'id', hidden: true},
              {value: 'Link', field: 'link', link: true, hidden: true}
            ]
          }
        )
      });
      return (
        <div id="dishes" className="panel panel-default">
          <div className="panel-heading" style={styleDiv}>Dishes:</div>
          <div className="panel-body">
            <EditTable
              onChange={this.onChange}
              onDelete={this.onDelete}
              rows={rows}
              headerColumns={headers}
              enableDelete={true}
            />
          </div>
        </div>
      );
    }
  }
}

DishesManager.propTypes = {
  appData: PropTypes.object,
  getDishes: PropTypes.func,
  addDish: PropTypes.func,
  editDish: PropTypes.func,
  deleteDish: PropTypes.func
};
export default DishesManager;
