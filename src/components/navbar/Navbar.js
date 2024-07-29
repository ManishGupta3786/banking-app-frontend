import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import MyContext from '../../context/context'
const Navbar = () => {
  const { isLogin, setIsLogin } = useContext(MyContext);

  const handleLogout = () => {
    setIsLogin(false)
    localStorage.removeItem('token');
  }
  
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  })
  
  return (
    <div className='nav-container'>
      <div className='nav-left-container'>
        <div className='nav-left-tab'>
          <NavLink to='/'>Home</NavLink>
        </div>
        <div className='nav-left-tab'>
          <NavLink to='/banking'>Banking</NavLink>
        </div>
        {/* <div className='nav-left-tab'>
          <NavLink to='/profile'>Profile</NavLink>
        </div> */}
      </div>

      <div className='nav-right-container'>
        {!isLogin ? (
          <>
            <div className='nav-right-tab'>
              <NavLink to='/login'>Login</NavLink>
            </div>
            <div className='nav-right-tab'>
              <NavLink to='/signup'>SignUp</NavLink>
            </div>
          </>
        ) : (
          <>
            <div className='nav-right-tab'>
              <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
