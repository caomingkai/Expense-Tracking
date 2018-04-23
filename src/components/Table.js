import React from 'react';
import TableRow from './TableRow';
import PropTypes from 'prop-types';

function Table(props){
    return (
            <table className = "table table-bordered">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Title</td>
                        <td>Amount</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    { props.entries.map((entry) => <TableRow key={entry.id} entry={entry}
                                                                   handleUpdateRecord = {props.handleUpdateRecord}
                                                                   handleDeleteRecord = {props.handleDeleteRecord}/>)}
                </tbody>
            </table>
        );
}

export default Table;

Table.propTypes ={
    entries: PropTypes.array,
    handleUpdateRecord: PropTypes.func,
    handleDeleteRecord: PropTypes.func,
}
