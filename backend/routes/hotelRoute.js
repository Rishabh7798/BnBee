import express from 'express';
import { loginHotel, bookingsHotel, bookingCancel, hotelList, changeAvailability, bookingComplete, hotelDashboard, hotelProfile, updateHotelProfile } from '../controllers/hotelController.js';
import authHotel from '../middleware/authHotel.js';
const hotelRouter = express.Router();

hotelRouter.post("/login", loginHotel)
hotelRouter.post("/cancel-booking", authHotel, bookingCancel)
hotelRouter.get("/bookings", authHotel, bookingsHotel)
hotelRouter.get("/list", hotelList)
hotelRouter.post("/change-availability", authHotel, changeAvailability)
hotelRouter.post("/complete-booking", authHotel, bookingComplete)
hotelRouter.get("/dashboard", authHotel, hotelDashboard)
hotelRouter.get("/profile", authHotel, hotelProfile)
hotelRouter.post("/update-profile", authHotel, updateHotelProfile)

export default hotelRouter;