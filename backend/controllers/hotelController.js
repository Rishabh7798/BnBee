import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import hotelModel from "../models/hotelModel.js";
import bookingModel from "../models/bookingModel.js";

// API for hotel Login 
const loginHotel = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await hotelModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get hotel bookings for hotel panel
const bookingsHotel = async (req, res) => {
    try {

        const { hotId } = req.body
        const bookings = await bookingModel.find({ hotId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel booking for hotel panel
const bookingCancel = async (req, res) => {
    try {

        const { hotId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)
        if (bookingData && bookingData.hotId === hotId) {
            await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })
            return res.json({ success: true, message: 'Booking Cancelled' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark booking completed for hotel panel
const bookingComplete = async (req, res) => {
    try {

        const { hotId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)
        if (bookingData && bookingData.hotId === hotId) {
            await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true })
            return res.json({ success: true, message: 'Booking Completed' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all hotels list for Frontend
const hotelList = async (req, res) => {
    try {

        const hotels = await hotelModel.find({}).select(['-password', '-email'])
        res.json({ success: true, hotels })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change hotel Availability for Admin and hotel Panel
const changeAvailability = async (req, res) => {
    try {

        const { hotId } = req.body

        const hotData = await hotelModel.findById(hotId)
        await hotelModel.findByIdAndUpdate(hotId, { available: !hotData.available })
        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get hotel profile for  hotel Panel
const hotelProfile = async (req, res) => {
    try {

        const { hotId } = req.body
        const profileData = await hotelModel.findById(hotId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update hotel profile data from  hotel Panel
const updateHotelProfile = async (req, res) => {
    try {

        const { hotId, fees, address, available } = req.body

        await hotelModel.findByIdAndUpdate(hotId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for hotel panel
const hotelDashboard = async (req, res) => {
    try {

        const { hotId } = req.body

        const bookings = await bookingModel.find({ hotId })

        let earnings = 0

        bookings.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let customers = []

        bookings.map((item) => {
            if (!customers.includes(item.userId)) {
                customers.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            bookings: bookings.length,
            customers: customers.length,
            latestBookings: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginHotel,
    bookingsHotel,
    bookingCancel,
    hotelList,
    changeAvailability,
    bookingComplete,
    hotelDashboard,
    hotelProfile,
    updateHotelProfile
}