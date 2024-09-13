import React from 'react';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRoles from './createRoles';
import CreatePermissions from './createPermission';
import AssignPermissionToRole from './AssignPermissionToRole';
function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<h1>Welcome to My Website</h1>} />
            <Route path="/create-roles" element={<CreateRoles />} />
            <Route path="/create-permissions" element={< CreatePermissions />} />
            <Route path="/assign-permissions" element={< AssignPermissionToRole />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
