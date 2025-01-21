import React, { useContext } from 'react'
import { HotelContext } from './context/HotelContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddHotel from './pages/Admin/AddHotel';
import HotelsList from './pages/Admin/HotelsList';
import Login from './pages/Login';
import HotelBookings from './pages/Hotel/HotelBookings';
import HotelDashboard from './pages/Hotel/HotelDashboard';
import HotelProfile from './pages/Hotel/HotelProfile';

const App = () => {

  const { dToken } = useContext(HotelContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-bookings' element={<AllBookings />} />
          <Route path='/add-hotel' element={<AddHotel />} />
          <Route path='/hotel-list' element={<HotelsList />} />
          <Route path='/hotel-dashboard' element={<HotelDashboard />} />
          <Route path='/hotel-bookings' element={<HotelBookings />} />
          <Route path='/hotel-profile' element={<HotelProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App