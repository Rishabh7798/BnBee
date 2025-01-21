import express from 'express';
import { loginAdmin, bookingsAdmin, bookingCancel, addHotel, allHotels, adminDashboard } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/hotelController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-hotel", authAdmin, upload.single('image'), addHotel)
adminRouter.get("/bookings", authAdmin, bookingsAdmin)
adminRouter.post("/cancel-booking", authAdmin, bookingCancel)
adminRouter.get("/all-hotels", authAdmin, allHotels)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;