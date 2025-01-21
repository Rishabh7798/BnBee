import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import hotelModel from "../models/hotelModel.js";
import bookingModel from "../models/bookingModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
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

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book booking 
const bookBooking = async (req, res) => {

    try {

        const { userId, hotId, slotDate, slotTime } = req.body
        const hotData = await hotelModel.findById(hotId).select("-password")

        if (!hotData.available) {
            return res.json({ success: false, message: 'Hotel Not Available' })
        }

        let slots_booked = hotData.slots_booked

        // checking for slot availability 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete hotData.slots_booked

        const bookingData = {
            userId,
            hotId,
            userData,
            hotData,
            amount: hotData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newBooking = new bookingModel(bookingData)
        await newBooking.save()

        // save new slots data in hotData
        await hotelModel.findByIdAndUpdate(hotId, { slots_booked })

        res.json({ success: true, message: 'Room Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel booking
const cancelBooking = async (req, res) => {
    try {

        const { userId, bookingId } = req.body
        const bookingData = await bookingModel.findById(bookingId)

        // verify booking user 
        if (bookingData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        // releasing hotel slot 
        const { hotId, slotDate, slotTime } = bookingData

        const hotelData = await hotelModel.findById(hotId)

        let slots_booked = hotelData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await hotelModel.findByIdAndUpdate(hotId, { slots_booked })

        res.json({ success: true, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user bookings for frontend my-bookings page
const listBooking = async (req, res) => {
    try {

        const { userId } = req.body
        const bookings = await bookingModel.find({ userId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of booking using razorpay
const paymentRazorpay = async (req, res) => {
    try {

        const { bookingId } = req.body
        const bookingData = await bookingModel.findById(bookingId)

        if (!bookingData || bookingData.cancelled) {
            return res.json({ success: false, message: 'Booking Cancelled or not found' })
        }

        // creating options for razorpay payment
        const options = {
            amount: bookingData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: bookingId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await bookingModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of booking using Stripe
const paymentStripe = async (req, res) => {
    try {

        const { bookingId } = req.body
        const { origin } = req.headers

        const bookingData = await bookingModel.findById(bookingId)

        if (!bookingData || bookingData.cancelled) {
            return res.json({ success: false, message: 'Booking Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Booking Fees"
                },
                unit_amount: bookingData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&bookingId=${bookingData._id}`,
            cancel_url: `${origin}/verify?success=false&bookingId=${bookingData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    try {

        const { bookingId, success } = req.body

        if (success === "true") {
            await bookingModel.findByIdAndUpdate(bookingId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookBooking,
    listBooking,
    cancelBooking,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe
}