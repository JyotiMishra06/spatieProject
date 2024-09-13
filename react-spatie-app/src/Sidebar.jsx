import React, { useState } from "react";
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
          <li><Link to="/create-roles">Create Roles</Link></li>
          <li><Link to="/create-permissions">Create Permissions</Link></li>
          <li><Link to="/assign-permissions">Assign Permissions To Roles</Link></li>
        
       
           
            
          </ul>
        </nav>
      </div>

      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "❌" : "☰"}
      </button>
    </>
  );
};

export default Sidebar;
