import React from "react";

export default function AssignPermissionToRole() {
    return (
        <div className="container-fluid mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="d-flex flex-basis">
                        {/* First Card */}
                        <div
                            className="card shadow-lg me-5 flex-grow-1"
                            style={{ width: "800px", height: "200px" }}
                        >
                            <div className="card-body">
                                <table className="table table-striped table-hover align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Admin</td>
                                            <td>
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                    />
                                                    <label
                                                        className="form-check-label ms-2"
                                                        htmlFor="flexCheckDefault"
                                                    >

                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Editor</td>
                                            <td>
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckEditor"
                                                    />
                                                    <label
                                                        className="form-check-label ms-2"
                                                        htmlFor="flexCheckEditor"
                                                    >

                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Second Card */}
                        <div
                            className="card shadow-lg me-5 flex-grow-1"
                            style={{ width: "800px", height: "200px" }}
                        >
                            <div className="card-body">
                                <table className="table table-striped table-hover align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Permission</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Admin</td>
                                            <td>
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                    />
                                                    <label
                                                        className="form-check-label ms-2"
                                                        htmlFor="flexCheckDefault"
                                                    >

                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Editor</td>
                                            <td>
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckEditor"
                                                    />
                                                    <label
                                                        className="form-check-label ms-2"
                                                        htmlFor="flexCheckEditor"
                                                    >

                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-black" style={{ backgroundColor: 'black', color: 'white' }}>Assign</button>
                    </div>
                </div>
            </div>
        </div>

    );
}
