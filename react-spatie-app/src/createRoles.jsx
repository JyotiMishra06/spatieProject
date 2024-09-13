import React, { useEffect, useState } from "react"; // Import useState
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateRoles() {
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null); // State for editing role
  const [roleName, setRoleName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/getRoles");
      setRoles(response.data); // Assuming response.data is an array of roles
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleShowModal = (role = null) => {
    setEditingRole(role);
    setRoleName(role ? role.name : "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRole(null); 
  };

  const handleSubmit = async () => {
    if (!roleName) {
      setErrorMessage("Role name is required.");
      return;
    }

    try {
      if (editingRole) {
        // Update role
        await axios.put(`http://127.0.0.1:8000/api/roles/${editingRole.id}`, {
          name: roleName,
        });
        setRoles(roles.map(role => role.id === editingRole.id ? { ...role, name: roleName } : role));
        Swal.fire("Updated!", "Role has been updated successfully.", "success");
      } else {
        // Create new role
        const response = await axios.post("http://127.0.0.1:8000/api/roles", {
          name: roleName,
        });
        setRoles([...roles, response.data.role]); // Assuming response.data.role is the new role
        Swal.fire("Created!", "Role has been created successfully.", "success");
      }
      setShowModal(false);
      setRoleName("");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Something went wrong.");
      } else {
        setErrorMessage("Failed to save role.");
      }
    }
  };

  const handleDelete = async (roleId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/roles/${roleId}`);
        setRoles(roles.filter((role) => role.id !== roleId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Role has been deleted successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error deleting role", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete the role.',
      });
      setErrorMessage("Failed to delete role");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <Modal
          title={editingRole ? "Update Role" : "Create Role"}
          body={
            <>
              <div>
                <label htmlFor="floatingInput">Role Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text" 
                  className="form-control"
                  id="floatingInput"
                  value={roleName}
                  onChange={handleRoleNameChange}
                />
              </div>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </>
          }
          showModal={showModal}
          handleClose={handleCloseModal}
          footerContent={
            <>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Confirm
              </button>
            </>
          }
        />
      </div>

      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ float: 'right' }}
                  onClick={() => handleShowModal()}
                >
                  Create Role
                </button>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Role</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <tr key={role.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{role.name}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleShowModal(role)}
                          >
                            <i className="fas fa-edit"></i> {/* Update icon */}
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(role.id)}
                          >
                            <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
