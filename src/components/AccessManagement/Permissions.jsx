import React from 'react'
import Navigation from '../adminDashboard/Navbar';
import Sidebar from '../adminDashboard/Sidebar';
import PermissionsList from './PermissionsList';


function Permission() {


    

    return (
        <div className="float-container">
        <Navigation/>
        <div className="adminDashboard">
            <Sidebar/>
            
           </div>
           <div className="mainContent">
               <PermissionsList/>
           </div>

           
           </div>  
    )
}

export default Permission;