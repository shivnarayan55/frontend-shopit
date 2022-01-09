import React from 'react';
import Navigation from '../adminDashboard/Navbar';
import Sidebar from '../adminDashboard/Sidebar';
import "../adminDashboard/adminDashboard.css";
import UserTable from './UserTable';
import './UserManagement.css'

function UserManagement() {
    return (
        <div className="float-container">
        <Navigation/>
        <div className="adminDashboard">
            <Sidebar/>
            
           </div>

           <div className="mainContent">
               <UserTable/>
           </div>
           </div>  
    )
}

export default UserManagement;