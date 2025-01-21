import jwt from "jsonwebtoken";
import bookingModel from "../models/bookingModel.js";
import hotelModel from "../models/hotelModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all booking list
const bookingsAdmin = async (req, res) => {
    try {

        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for booking cancellation
const bookingCancel = async (req, res) => {
    try {

        const { bookingId } = req.body
        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        res.json({ success: true, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Hotel
const addHotel = async (req, res) => {

    try {

        const { name, email, password, location, hotelSince, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add Hotel
        if (!name || !email || !password || !location || !hotelSince || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const hotelData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            location,
            hotelSince,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newHotel = new hotelModel(hotelData)
        await newHotel.save()
        res.json({ success: true, message: 'Hotel Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all Hotels list for admin panel
const allHotels = async (req, res) => {
    try {

        const hotels = await hotelModel.find({}).select('-password')
        res.json({ success: true, hotels })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const hotels = await hotelModel.find({})
        const users = await userModel.find({})
        const bookings = await bookingModel.find({})

        const dashData = {
            hotels: hotels.length,
            bookings: bookings.length,
            customers: users.length,
            latestBookings: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    bookingsAdmin,
    bookingCancel,
    addHotel,
    allHotels,
    adminDashboard
}