import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUser, updateUser, deleteUser } from "../store/userSlice";
import { tableData } from "../data/tableData";

const CustomTable = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);

  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const jobRoles = ["Product Manager", "QA Engineer", "Software Engineer"];

  useEffect(() => {
    if (userData.length === 0) {
      // Initial data loading
      tableData.forEach((user) => dispatch(addUser(user)));
    }
  }, [dispatch, userData]);

  const handleEdit = (index) => {
    setEditRow(index);
    setFormData({ ...userData[index] });
  };

  const handleUpdate = (index) => {
    dispatch(updateUser({ index, userData: formData }));
    setEditRow(null);
  };

  //Handling user deletion
  const handleDelete = (selectedIndex) => {
    dispatch(deleteUser(selectedIndex));
    if (editRow === selectedIndex) {
      setEditRow(null);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  //Handling adding new user data
  const handleAddButton = () => {
    setIsAdding(true);
    const newUser = {
      name: "",
      jobRole: jobRoles[0],
      isMarried: false,
      isNew: true,
    };
    dispatch(addUser(newUser));
    setFormData(newUser);
  };

  //Handling submitting functionality where added user data
  const handleSubmitNew = (index) => {
    const updatedUser = { ...formData, isNew: false };
    dispatch(updateUser({ index, userData: updatedUser }));
    setIsAdding(false);
    setFormData({});
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
          {userData.map((user, index) => (
            <tr key={index}>
              <td>
                {editRow === index || user.isNew ? (
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editRow === index || user.isNew ? (
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
                  user.jobRole
                )}
              </td>
              <td>
                {editRow === index || user.isNew ? (
                  <input
                    id="isMarried"
                    type="checkbox"
                    checked={formData.isMarried}
                    onChange={handleInputChange}
                  />
                ) : user.isMarried ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>
              <td>
                {user.isNew ? (
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
      <Link to={`/profile`}>Go to next</Link>
    </div>
  );
};

export default CustomTable;
