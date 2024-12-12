import React, { useEffect, useState } from 'react';
import { EmployeeData } from './data';

const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const selectedData = data.find(item => item.id === id);
    if (selectedData) {
      setId(id);
      setFirstName(selectedData.firstname);
      setLastName(selectedData.lastname);
      setAge(selectedData.age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0 && window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (firstName.trim() === "" || lastName.trim() === "" || age.trim() === "") {
      alert("All fields are required!");
      return;
    }

    if (id) {
      // Update existing record
      setData(data.map(item =>
        item.id === id
          ? { ...item, firstname: firstName, lastname: lastName, age }
          : item
      ));
    } else {
      alert("Select an employee to edit or use 'Add New Employee' to add a new one.");
    }

    handleClear(); // Clear input fields after saving
  };

  const handleAddNewEmployee = () => {
    if (firstName.trim() === "" || lastName.trim() === "" || age.trim() === "") {
      alert("All fields are required to add a new employee!");
      return;
    }

    const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
    setData([...data, { id: newId, firstname: firstName, lastname: lastName, age }]);
    handleClear(); // Clear input fields after adding
  };

  const handleClear = () => {
    setId(null);
    setFirstName("");
    setLastName("");
    setAge("");
  };

  return (
    <div className='App'>
      <div style={{ display: "flex", justifyContent: 'center', marginTop: "10px", marginBottom: "10px" }}>
        <div>
          <label>First Name:
            <input
              type="text"
              placeholder='Enter First Name'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label>Last Name:
            <input
              type="text"
              placeholder='Enter Last Name'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label>Age:
            <input
              type="text"
              placeholder='Enter Age'
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div>
          <button className='btn btn-primary' onClick={handleSave}>Save</button> &nbsp;
          <button className='btn btn-danger' onClick={handleClear}>Clear</button> &nbsp;
          <button className='btn btn-success' onClick={handleAddNewEmployee}>Add New Employee</button>
        </div>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
