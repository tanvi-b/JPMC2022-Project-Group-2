
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.min.css';

console.log("Application has started.");

const Keyspaces = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/GetKeySpaces')
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
      field: 'replication.class',
      filter: true
    },
    {
      field: 'replication.replication_factor',
      filter: true
    },
    {
      field: 'durable_writes',
      filter: true
    }
  ]);

  // Example load data from sever
  useEffect(() => {
    fetch('http://localhost:8080/GetKeySpaces')
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
          <h2>Cassandra Keyspaces:</h2>
          <div className="ag-theme-balham-dark" style={{ width: 803, height: 500 }}>
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
};





//2021 code and other useful testing code
// function App() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [list, setList] = useState([]);

//   const [rowData] = useState([
//     { make: "Toyota", model: "Celica", price: 35000 },
//     { make: "Ford", model: "Mondeo", price: 32000 },
//     { make: "Porsche", model: "Boxster", price: 72000 }
//   ]);

//   const [columnDefs] = useState([
//     { field: 'make' },
//     { field: 'model' },
//     { field: 'price' }
//   ])

//   useEffect(() => {
//     axios.get('http://localhost:8080/GetKeySpaces')
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           console.log(result.data);
//           setList(result.data);
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       )
//   }, [])

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div className='App'>
//         <div className="ag-theme-alpine" style={{ height: 400, width: 1080 }}>
//           <AgGridReact
//             rowData={rowData}
//             columnDefs={columnDefs}>
//           </AgGridReact>
//         </div>
//         <ul>
//           {list.map((keyspace, index) => (
//             <li key={index}>{keyspace.keyspace_name}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

// }

// return (
//   <div className="App">
//     <div className="toolbar" role="banner">
//       <img widtd="50" height="40" alt="JPMC Logo PLaceholder"
//         src="https://vestar.com/wp-content/uploads/2015/05/chase-logo.jpg"></img>

//       <h2>Cassandra Clusters Application</h2>

//       <div className="spacer"></div>

//     </div>

//     <div className="row">
//       <div className="column1">
//         <div className="content" role="main">

//           <h2>Table Information:</h2>

//           <input type="file" accept=".csv" id="fileUpload" onClick={csvtoJS} />
//           <table className="table-stats">
//             <tbody>
//               <tr className="dlheader">
//                 <td className="dlheader">Keyspace Name</td>
//                 <td className="dlheader">Table Name</td>
//                 <td className="dlheader">Num Partitions</td>
//                 <td className="dlheader">Partition Row Stats</td>
//                 <td className="dlheader">Column Definitions</td>
//                 <td className="dlheader">Table Size</td>
//                 <td className="dlheader">Partition Size Stats</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="column2">

//       </div>

//       <div className="column3">
//         <div className="sidebar-menu">
//           <div className="logo">
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
//             <h2>Cluster Information:</h2>
//           </div>
//           <section className="container">

//             <div className="one">
//               <ul>
//                 <li>
//                   <p>Cluster Name:</p>
//                 </li>
//                 <li>
//                   <p>Number of Tables:</p>
//                 </li>
//                 <li>
//                   <p>User Generated Tables:</p>
//                 </li>
//                 <li>
//                   <p>Cluster Size:</p>
//                 </li>
//               </ul>
//             </div>

//             <div className="two">
//               <ul>
//                 <li>
//                   <p>D7329D209426CC3CAF298FC6CBC2B52B6A707BFC</p>
//                 </li>
//                 <li>
//                   <p>D7329D209426CC3CAF298FC6CBC2B52B6A707BFC</p>
//                 </li>
//                 <li>
//                   <p>D7329D209426CC3CAF298FC6CBC2B52B6A707BFC</p>
//                 </li>
//                 <li>
//                   <p>D7329D209426CC3CAF298FC6CBC2B52B6A707BFC</p>
//                 </li>
//               </ul>
//             </div>
//             <center>
//               <label>
//                 Click To Add Cluster Information
//                 <input type="file" name="inputfile" id="inputfile" className="input input2" accept=".txt"></input>
//               </label>
//             </center>

//             <br></br>

//             <pre id="output"></pre>

//           </section>
//         </div>
//       </div>

//     </div>
//   </div >
// );

/*
function Upload() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof (FileReader) != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var table = document.createElement("table");
        var rows = e.target.result.split("\n");
        for (var i = 1; i < rows.lengtd; i++) {
          var cells = rows[i].split(",");
          if (cells.lengtd > 1) {
            var row = table.insertRow(-1);
            for (var j = 0; j < cells.lengtd; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = cells[j];
            }
          }
        }
        var dvCSV = document.getElementById("dvCSV");
        dvCSV.innerHTML = "";
        dvCSV.appendChild(table);
      }
      reader.readAsText(fileUpload.value[0]);
    } else {
      alert("tdis browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}
*/

function csvtoJS() {
  const x = document.querySelector("input");

  x.addEventListener("change", () => {

    const fr = new FileReader();

    fr.onloadend = e => {

      let r = fr.result.split("\n").map(e => {
        return e.split(",")
      });

      r.forEach(e => {

        let m = e.map(e => {
          return `<td className="dlinfo hover01">${e}</td>`;
        }).join("");

        console.log(m);
        console.log(r);

        const ce = document.createElement("tr");

        ce.innerHTML = m;

        if (ce.innerText !== "") {
          document.querySelector("table").append(ce);
        }

      });
    }
    fr.readAsText(x.files[0]);

  })
}

function mount() {

}

function input2() {
  var t = document.getElementById('inputfile');

  if (t) {
    t.addEventListener('change', () => {

      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById('output').textContent = fr.result;
      }
      fr.readAsText(t.files[0]);
    })
  } else {
    alert("ID not found.");
  }
}

export default Keyspaces;