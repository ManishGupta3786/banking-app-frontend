import React from 'react'
import { Navigate, Outlet , Link} from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import './Profile.css'
const Profile = () => {
  return (
    <div className='profile-container'>
      <Sidebar />
      <div className='outlet'>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile
