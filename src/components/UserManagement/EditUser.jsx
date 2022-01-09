import React, { useEffect, useState } from 'react';
import Navigation from '../adminDashboard/Navbar';
import Sidebar from '../adminDashboard/Sidebar';
import "../adminDashboard/adminDashboard.css";
import './UserManagement.css';
import EditUserForm from './EditUserForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



function EditUser(props) {

    

    const location = useLocation();

    useEffect(()=> {

        

        
        

    },[])
    
   

    return (
        <div className="float-container">
        <Navigation/>
        <div className="adminDashboard">
            <Sidebar/>
            
           </div>
           

           <div className="mainContent">
               <EditUserForm/>
               
               
           </div>
           </div>  
    )
}

export default EditUser;