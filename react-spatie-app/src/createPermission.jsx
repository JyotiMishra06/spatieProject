import React, { useEffect, useState } from "react"; // Import useState
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";
export default function CreateRoles() {
  const [showModal, setShowModal] = useState(false);

  const [permissionName, setPermissionName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [editingPermission, setEditingPermission] = useState(null)
  const handleShowModal = (permissions = null) => {
    setEditingPermission(permissions)
    setPermissionName(permissions ? permissions.name : "")
    setShowModal(true)
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPermission(null);
  };
  const fetchPermissions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/getPermissions");
      setPermissions(response.data);
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  }
  useEffect(() => {
    fetchPermissions();
  }, []);
  const handlePermissionNameChange = (e) => {
    setPermissionName(e.target.value);
  };
  // const InputContent = (
  //   <>
  //     <div>
  //       <label htmlFor="floatingInput">Permission Name</label>
  //     </div>
  //     <div className="form-floating mb-3">
  //       <input type="email" className="form-control" id="floatingInput" value={permissionName}
  //         onChange={handlePermissionNameChange} />
  //     </div>
  //   </>
  // );

  const handleSubmit = async () => {
    if (!permissionName) {
      setErrorMessage("Permission name is required.");
      return;
    }
    try {
      if (editingPermission) {
        await axios.put(`http://127.0.0.1:8000/api/permissions/${editingPermission.id}`, {
          name: permissionName
        })
        setPermissions(permissions.map(permission => permission.id === editingPermission.id ? { ...permission, name: permissionName } : permission))
        Swal.fire("Updated!", "Permission has been updated successfully.", "success");
      }
      else {
        // Create new role
        const response = await axios.post("http://127.0.0.1:8000/api/permissions", {
          name: permissionName,
        });
        setPermissions([...permissions, response.data.permission]); // Assuming response.data.role is the new role
        Swal.fire("Created!", "Permission has been created successfully.", "success");
      }
      setShowModal(false);
      setPermissionName("");
    }
    catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Something went wrong.");
      } else {
        setErrorMessage("Failed to save role.");
      }
    }
  }
  const handleDelete = async (permissionId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        // Delete request to your API
        await axios.delete(`http://127.0.0.1:8000/api/permissions/${permissionId}`);

        // Update the state to remove the deleted role
        setPermissions(permissions.filter((permission) => permission.id !== permissionId));

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Role has been deleted successfully.',
          showConfirmButton: false,
          timer: 1500
        });
      }

    } catch (error) {

    }

  }

  return (
    <>
      <div className="container mt-4">
        {/* <Modal
          title="Create Permission"
          body={InputContent}
          showModal={showModal}
          handleClose={handleCloseModal}
          footerContent={
            <>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Confirm
              </button>
            </>
          }
        /> */}


        <Modal
          title={editingPermission ? "Update Permission" : "Create Permission"}
          body={
            <>
              <div>
                <label htmlFor="floatingInput">Permission Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  value={permissionName}
                  onChange={handlePermissionNameChange}
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
          {/* Full width card */}
          <div className="col-md-8">
            <div className="card shadow-lg">
              {/* Add an image to the card */}
              <div className="card-body">
                <button type="button" class="btn btn-primary" style={{ float: 'right' }} onClick={() => handleShowModal(null)}>Create Permission</button>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Permission</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      permissions.map((permissions, index) => (
                        <tr key={permissions.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{permissions.name}</td>
                          <td>
                            <button
                              className="btn btn-primary me-2"
                              // onClick={() => handleUpdate(role.id)}
                              onClick={() => handleShowModal(permissions)}
                            >
                              <i className="fas fa-edit"></i> {/* Update icon */}
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(permissions.id)}
                            >
                              <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                            </button>
                          </td>
                        </tr>
                      ))
                    }
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
