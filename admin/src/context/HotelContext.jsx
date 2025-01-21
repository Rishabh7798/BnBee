import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const HotelContext = createContext()

const HotelContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [bookings, setBookings] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    // Getting hotel booking data from Database using API
    const getBookings = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/hotel/bookings', { headers: { dToken } })

            if (data.success) {
                setBookings(data.bookings.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting hotel profile data from Database using API
    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/hotel/profile', { headers: { dToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel hotel booking using API
    const cancelBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/hotel/cancel-booking', { bookingId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getBookings()
                // after creating dashboard
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to Mark booking completed using API
    const completeBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/hotel/complete-booking', { bookingId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getBookings()
                // Later after creating getDashData Function
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting hotel dashboard data using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/hotel/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        dToken, setDToken, backendUrl,
        bookings,
        getBookings,
        cancelBooking,
        completeBooking,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
    }

    return (
        <HotelContext.Provider value={value}>
            {props.children}
        </HotelContext.Provider>
    )


}

export default HotelContextProvider