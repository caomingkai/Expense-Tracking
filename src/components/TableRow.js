import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';


class TableRow extends Component{
    constructor(){
        super();
        this.state={
            isDisplay: true
        }
    }

    handleToggle(){
        this.setState({
            isDisplay: !this.state.isDisplay
        });
    }

    handleUpdate(event){
        event.preventDefault(event);
        const newEntry = {
          date: this.refs.date.value,
          title: this.refs.title.value,
          amount: Number.parseInt(this.refs.amount.value, 0)
        }
        RecordsAPI.update(this.props.entry.id, newEntry)
        .then(
            response =>{
                const oldNew = {"old": this.props.entry, "new": response.data};
                this.props.handleUpdateRecord(oldNew);
                this.setState({isDisplay: true});
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    handleDelete(event){
        event.preventDefault(event);
        RecordsAPI.remove(this.props.entry.id)
        .then(
            response => {
                this.props.handleDeleteRecord(this.props.entry);
            }
        ).catch(
            error => console.log(error.message)
        )

    }

    RowDisplay(){
        return(
          <tr>
            <td>{this.props.entry.date}</td>
            <td>{this.props.entry.title}</td>
            <td>{this.props.entry.amount}</td>
            <td>
                <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)} >Edit</button>
                <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}  >Delete</button>
            </td>
          </tr>
      );
    }

    RowEdit(){
        return(
            <tr>
              <td><input type="text" className="form-control" defaultValue={this.props.entry.date} ref="date" /></td>
              <td><input type="text" className="form-control" defaultValue={this.props.entry.title} ref="title" /></td>
              <td><input type="text" className="form-control" defaultValue={this.props.entry.amount} ref="amount" /></td>
              <td>
                <button className="btn btn-info mr-1" onClick={this.handleUpdate.bind(this)}>Update</button>
                <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>Cancel</button>
              </td>
            </tr>
      );
    }
    render(){
        return this.state.isDisplay ? this.RowDisplay() : this.RowEdit();
    }
}

export default TableRow;

TableRow.propTypes ={
    entry: PropTypes.object,
    handleUpdateRecord: PropTypes.func,
    handleDeleteRecord: PropTypes.func
}
