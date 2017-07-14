const React = require('react');
const mui = require('material-ui');
const ModeEdit = require('material-ui/svg-icons/editor/mode-edit').default;
const Check = require('material-ui/svg-icons/navigation/check').default;
const Cancel = require('material-ui/svg-icons/navigation/cancel').default;
const Delete = require('material-ui/svg-icons/action/delete').default;
const Launch = require('material-ui/svg-icons/action/launch').default;
const times = require('lodash.times');
const {IconButton, Toggle, TextField, RaisedButton, DatePicker} = mui;
// const browserHistory = require('react-router');
import {browserHistory} from 'react-router';

// const injectTapEventPlugin = require('react-tap-event-plugin')
// injectTapEventPlugin()

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      headerColumns: [],
      rows: [],
      enableDelete: true,
      onChange: function () {},
      onDelete: function () {}
    }
  },

  getInitialState: function () {
    return {
      rows: this.props.rows,
      hoverValue: false,
      currentRow: false
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  update: function () {
    // console.log('update');
    let row = this.state.rows.filter((row) => {
      return row.selected
    });

    if (this.props.onChange(row[0])) {
      // console.log('True');
      return true
    } else {
      // console.log('False');
      return false
    }
  },

  getCellValue: function (cell) {
    let self = this;
    let id = cell && cell.id;
    let type = this.props.headerColumns.map((header) => {
      return header.type
    })[id];
    let selected = cell && cell.selected;
    let value = cell && cell.value;
    let rowId = cell && cell.rowId;
    let header = cell && cell.header;
    let width = cell && cell.width;
    let textFieldId = [id, rowId, header, 'text'].join('-');
    let datePickerId = [id, rowId, header, 'date'].join('-');

    let textFieldStyle = {
      width: width
    };

    let datePickerStyle = {
      width: width
    };

    let onTextFieldChange = (e) => {
      let target = e.target;
      let value = target.value;
      let rows = self.state.rows;
      rows[rowId].columns[id].value = value;
      self.setState({rows: rows})
    };

    let onDatePickerChange = (e, date) => {
      let rows = self.state.rows;
      rows[rowId].columns[id].value = date;
      self.setState({rows: rows})
    };

    let onToggle = (e) => {
      let rows = self.state.rows;
      rows[rowId].columns[id].value = !rows[rowId].columns[id].value;
      self.setState({rows: rows})
    };

    if (header || (type && type === 'ReadOnly')) {
      return <p style={{color: '#888'}}>{value}</p>
    }

    if (type) {
      if (selected) {
        if (type === 'TextField') {
          return <TextField
            id={textFieldId}
            onChange={onTextFieldChange}
            style={textFieldStyle}
            value={value}
          />
        }
        if (type === 'DatePicker') {
          return <DatePicker
            id={datePickerId}
            onChange={onDatePickerChange}
            mode='landscape'
            style={datePickerStyle}
            value={value}
          />
        }
        if (type === 'Toggle') {
          return <Toggle onToggle={onToggle} toggled={value} />
        }
      }
      else {
        if (type === 'Toggle') {
          return <Toggle disabled onToggle={onToggle} toggled={value} />
        }
        if (type === 'DatePicker') {
          return <DatePicker
            id={datePickerId}
            onChange={onDatePickerChange}
            mode='landscape'
            style={datePickerStyle}
            value={value}
            disabled={Boolean(true)}
          />
        }
      }
    }

    return <TextField
      id={textFieldId}
      style={textFieldStyle}
      disabled
      value={value}
    />
  },

  renderHeader: function () {
    let headerColumns = this.props.headerColumns;
    let columns = headerColumns.map((column, id) => {
      return {value: column.value}
    });
    let row = {columns: columns, header: true};

    return this.renderRow(row)
  },

  renderRow: function (row) {
    let self = this;
    let columns = row.columns;
    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      padding: row.header ? 0 : 12,
      border: 0,
      borderBottom: '1px solid #ccc',
      height: 50
    };
    const checkboxStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      width: 50,
      height: 24,
      alignItems: 'center'
    };

    const deleteButtonStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      width: 50,
      height: 24,
      alignItems: 'center',
      padding: '0 12 0'
    };

    let rowId = row.id;
    let rowKey = ['row', rowId].join('-');

    const onRowClick = function (e) {
      let rows = self.state.rows;
      rows.forEach((row, i) => {
        if (rowId !== i) row.selected = false;
      });
      rows[rowId].selected = !rows[rowId].selected;
      self.setState({rows: rows})
    };

    let r = self.state.rows[rowId];
    let selected = (r && r.selected) || false;

    let button = selected ? <Check /> : <ModeEdit />;
    let tooltip = selected ? 'Done' : 'Edit';

    const onDeleteRow = function (e) {
      let rows = self.state.rows;
      let deleteEvent = {};
      rows.forEach((row, i) => {
        if (rowId === i) {
          rows.splice(i, 1);
          deleteEvent = {rowId, row}
        }
      });
      rows.forEach((row, i) => {
        row.id = i
      });
      self.setState({rows: rows});
      if (deleteEvent !== {}) self.props.onDelete(deleteEvent)
    };

    const onLaunchRow = function (e) {
      // console.log('onLaunchRow | rowId', rowId);
      // console.log('onLaunchRow | self.state.rows', self.state.rows);
      let rows = self.state.rows;
      rows.forEach((row, i) => {
        if (rowId === i) {
          console.log('row is:', row);
          row.columns.forEach((col) => {
            if (col.field === 'Link') {
              browserHistory.push(col.value);
            }
          })
        }
      });
    };

    const onClick = function (e) {
      if (selected) {
         if(self.update()) {
           onRowClick(e)
         }
      } else {
        onRowClick(e)
      }
    };

    const deleteButton = (!this.props.enableDelete || selected || row.header) ? <div style={deleteButtonStyle} />
      : <IconButton style={deleteButtonStyle} tooltip={'Delete this row'} onClick={onDeleteRow}>
        <Delete />
      </IconButton>;

    const cancelButton = !(this.props.enableDelete && selected) || row.header ? <div style={deleteButtonStyle} />
      : <IconButton style={deleteButtonStyle} tooltip={'Cancel'} onClick={onDeleteRow}>
        <Cancel />
      </IconButton>;

    const launchButton = (!this.props.enableDelete || selected || row.header) ? <div style={deleteButtonStyle} />
      : <IconButton style={deleteButtonStyle} tooltip={'Open'} onClick={onLaunchRow}>
        <Launch />
      </IconButton>;

    const checkbox = row.header ? <div style={checkboxStyle} />
      : <IconButton style={checkboxStyle} tooltip={tooltip} onClick={onClick}>
        {button}
      </IconButton>;

    return (
      <div key={rowKey} className='row' style={rowStyle}>
        {checkbox}
        {columns.map((column, id) => {
          if (!column.hidden) {
            const width = this.props.headerColumns.map((header) => {
              return (header && header.width) || false
            })[id];
            const cellStyle = {
              display: 'flex',
              flexFlow: 'row nowrap',
              flexGrow: 0.15,
              flexBasis: 'content',
              alignItems: 'center',
              height: 30,
              width: width || 200
            };
            let columnKey = ['column', id].join('-');
            column.selected = selected;
            column.rowId = rowId;
            column.id = id;
            column.header = row.header;
            column.width = cellStyle.width;
            return (
              <div key={columnKey} className='cell' style={cellStyle}>
                <div>
                  {this.getCellValue(column)}
                </div>
              </div>
            )
          }
        })}
        {deleteButton}
        {cancelButton}
        {launchButton}
      </div>
    )
  },

  render: function () {
    let self = this;
    const style = {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Roboto, sans-serif'
    };

    const buttonStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      marginTop: 10
    };

    let rows = this.state.rows;
    let columnTypes = this.props.headerColumns.map((header) => {
      return header.type
    });

    const onButtonClick = (e) => {
      let newColumns = times(columnTypes.length, (index) => {
        const defaults = {
          'TextField': '',
          'Toggle': true
        };

        let value = defaults[columnTypes[index]];

        return {value: value}
      });

      let updatedRows = rows.map((row) => {
        if (row.selected) {
          self.update();
          row.selected = false
        }
        return row
      });
      updatedRows.push({columns: newColumns, selected: true});
      self.setState({rows: updatedRows})
    };

    return (
      <div className='container' style={style}>
        {this.renderHeader()}
        {rows.map((row, id) => {
          row.id = id;
          return this.renderRow(row)
        })}
        <RaisedButton
          onClick={onButtonClick}
          style={buttonStyle}
          label='Add Row'
        />
      </div>
    )
  }
});