import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import './Banking.css';
const Banking = () => {

  return (
    <div className='dashboard-container'>
        <Sidebar />
        <div className='outlet'>
        <Outlet />
        </div>
    </div>
  )
}

export default Banking
