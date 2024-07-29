import React, { useContext } from 'react'
import './Sidebar.css';
import { Link, NavLink, Outlet } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className='sidebar-nav-container'>
            <NavLink to='deposit' className='nav-link'>Deposite Money</NavLink>
            <NavLink to='withdrawal' className='nav-link' >Withdrawal Money</NavLink>
            <NavLink to='transfer' className='nav-link' >Transfer Money</NavLink>
            <NavLink to='statement' className='nav-link' >Statements</NavLink>
        </div>
    )
}

export default Sidebar;
