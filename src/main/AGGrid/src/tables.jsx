import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.min.css';

export default function Tables() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/GetTableList')
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log(result.data);
                    setList(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    //const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'keyspace_name',
            filter: true,
            editable: true,
            rowSelection: "single",
            checkboxSelection: true,
            checkbox: true,
            headerCheckboxSelection: true
        },
        {
            field: 'id',
            filter: true,
        },
        {
            field: 'max_index_interval',
            filter: true
        },
        {
            field: 'memtable_flush_period_in_ms',
            filter: true
        },
        {
            field: 'min_index_interval',
            filter: true
        },
        {
            field: 'read_repair_chance',
            filter: true
        },
        {
            field: 'speculative_retry',
            filter: true
        },
        {
            field: 'table_name',
            filter: true
        }
    ]);

    // Example load data from sever
    useEffect(() => {
        fetch('http://localhost:8080/GetTableList')
            .then(result => result.json())
            .then(rowData => setRowData(rowData.slice(1, rowData.length)))
    }, []);

    return (
        <div className="App">
            <div className="toolbar" role="banner">
                <img className="image" alt="JPMC Logo PLaceholder"
                    src="https://vestar.com/wp-content/uploads/2015/05/chase-logo.jpg"></img>
                <h2>Cassandra Clusters Application</h2>
            </div>
            <div className="row">
                <div className="content" role="main">
                    <h2>Table Information:</h2>
                    <div className="ag-theme-balham-dark" style={{ width: 1620, height: 500 }}>
                        <AgGridReact
                            rowData={rowData} // Row Data for Rows
                            columnDefs={columnDefs} // Column Defs for Columns
                            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                            rowSelection='multiple' // Options - allows click selection of rows
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}