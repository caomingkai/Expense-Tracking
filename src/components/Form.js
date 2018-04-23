import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

class Form extends Component{

    constructor(){
        super();
        this.state={
            "date": "",
            "title": "",
            "amount": ""
        }
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        let obj = {}
        obj["" +name] = value;

        this.setState((obj));
    }

    handleSubmit(event){
        event.preventDefault();
        const entry = {
            id: Number.parseInt(this.state.amount, 0),
            date: this.state.date,
            title: this.state.title,
            amount: Number.parseInt(this.state.amount, 0)
        };

        RecordsAPI.create(entry)
        .then(
            response => {
                this.props.handleAddRecord(response.data);
                this.setState({
                    date: "",
                    title: "",
                    amount: ""
                });
            }
        ).catch(
            error => console.log(error.message)
        )

    }

    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }

    render(){
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1">
                     <input type="text" className="form-control" onChange={this.handleChange.bind(this)}  placeholder="Date" name="date" value={this.state.date} />
                </div>

                <div className="form-group mr-1">
                    <input type="text" className="form-control"  onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
                </div>

                <div className="form-group mr-1">
                    <input type="text" className="form-control"  onChange={this.handleChange.bind(this)}  placeholder="Amount" name="amount" value={this.state.amount} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}> Create Record</button>
            </form>
        );
    }
}


export default Form;
