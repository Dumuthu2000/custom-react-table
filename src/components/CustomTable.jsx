import React, { useEffect, useState } from "react";
import { tableData } from "../data/tableData";

const CustomTable = () => {
  const [data, setData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const jobRoles = ["Product Manager", "QA Engineer", "Software Engineer"];

  useEffect(() => {
    setData(tableData);
  }, []);

  const handleEdit=(index)=>{
    setEditRow(index);
    setFormData({ ...data[index] });
  };

  const handleUpdate=(index)=>{
    const updatedData = [...data];
    updatedData[index] = formData;
    setData(updatedData);
    setEditRow(null);
  };

  const handleInputChange=(e)=>{
    const { id, value, type, checked } = e.target;
    setFormData((prev)=>({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddButton=()=>{
    setIsAdding(true);
    setFormData({ name: "", jobRole: jobRoles[0], isMarried: false });
    setData([
      ...data,
      { name: "", jobRole: jobRoles[0], isMarried: false, isNew: true },
    ]);
  };

  const handleSubmitNew=(index)=>{
    const updatedData = [...data];
    updatedData[index] = { ...formData, isNew: false };
    setData(updatedData);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete=(selectedIndex)=>{
    const filteredData = data.filter((_, index) => index !== selectedIndex);
    setData(filteredData);
    if (editRow === selectedIndex){
        setEditRow(null);  
    } 
  };

  return (
    <div>
      <div>
        <button onClick={handleAddButton}>Add</button>
      </div>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Role</th>
            <th>Married</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((userData, index) => (
            <tr key={index}>
              <td>
                {editRow === index || userData.isNew ? (
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.name
                )}
              </td>
              <td>
                {editRow === index || userData.isNew ? (
                  <select
                    id="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                  >
                    {jobRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                ) : (
                  userData.jobRole
                )}
              </td>
              <td>
                {editRow === index || userData.isNew ? (
                  <input
                    id="isMarried"
                    type="checkbox"
                    checked={formData.isMarried}
                    onChange={handleInputChange}
                  />
                ) : userData.isMarried ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>
              <td>
                {userData.isNew ? (
                  <button onClick={() => handleSubmitNew(index)}>Submit</button>
                ) : editRow === index ? (
                  <button onClick={() => handleUpdate(index)}>Update</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
