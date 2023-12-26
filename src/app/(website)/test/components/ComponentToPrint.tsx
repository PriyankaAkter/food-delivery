'use client'
import * as XLSX from 'xlsx';

const ComponentToPrint = () => {
  const tableData = [
    { firstname: 'Jill', lastname: 'Smith', age: 50 },
    { firstname: 'Eve', lastname: 'Jackson', age: 94 },
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the Excel file
    XLSX.writeFile(wb, 'tableData.xlsx');
  };
  return (
    <div>
      {/* Your component content */}
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.firstname}</td>
              <td>{row.lastname}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to export the table data to Excel */}
      <button onClick={exportToExcel} className="btn btn-success">
        Export to Excel
      </button>
    </div>
  )
}

export default ComponentToPrint