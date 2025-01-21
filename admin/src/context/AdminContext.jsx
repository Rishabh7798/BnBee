import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [bookings, setBookings] = useState([])
    const [hotels, setHotels] = useState([])
    const [dashData, setDashData] = useState(false)

    // Getting all hotels data from Database using API
    const getAllHotels = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-hotels', { headers: { aToken } })
            if (data.success) {
                setHotels(data.hotels)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to change hotel Availability using API
    const changeAvailability = async (hotId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { hotId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllHotels()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all booking data from Database using API
    const getAllBookings = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/bookings', { headers: { aToken } })
            if (data.success) {
                setBookings(data.bookings.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel booking using API
    const cancelBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-booking', { bookingId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllBookings()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

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
        aToken, setAToken,
        hotels,
        getAllHotels,
        changeAvailability,
        bookings,
        getAllBookings,
        getDashData,
        cancelBooking,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider