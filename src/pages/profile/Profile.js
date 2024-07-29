import React from 'react'
import { Navigate, Outlet , Link} from 'react-router-dom'
import './Profile.css'
const Profile = () => {
  return (
    <div className='profile-container' style={{
        height:"80vh", border:'1px solid black', display:'flex', padding:'10px'
    }}>

      <div className='sidebar-nav-container' 
      style={{
        height:"80vh", border:'1px solid black', backgroundColor:'lightgray', width:'200px', color:'black', textDecoration:'none'
      }}
      >
        <Link to='account' className='nav-link' style={{backgroundColor:'red'}}>Account</Link>
        <Link to='setting'className='nav-link'>Setting</Link>
        <Link to='privacy'className='nav-link'>Privacy</Link>
        {/* <Outlet/> */}
      </div>
      <div className='profile-component'>
        <div>this is profile page</div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Profile
