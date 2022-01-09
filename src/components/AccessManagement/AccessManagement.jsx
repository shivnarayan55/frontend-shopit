import React from 'react';
import Navigation from '../adminDashboard/Navbar';
import Sidebar from '../adminDashboard/Sidebar';
import "./AccessManagement.css"
import AccessTable from './AccessTable';

function AccessManagement() {
    return (
        <div className="float-container">
        <Navigation/>
        <div className="adminDashboard">
            <Sidebar/>
            
           </div>

           <div  className="mainContent">
              <AccessTable/>
           </div>
           </div>    
        
    )
}

export default AccessManagement