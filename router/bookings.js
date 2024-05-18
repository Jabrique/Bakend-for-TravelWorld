import express from 'express';
import { createBooking, getAllBookings, getBooking } from '../controllers/bookingController.js';
import verifyToken, { verifyAdmin } from '../utils/verifyToken.js';

const bookingRoute = express.Router();

// Create a new review for a tour
bookingRoute.post('/', createBooking);

bookingRoute.get('/:id', getBooking);

bookingRoute.post('/', verifyToken, verifyAdmin, getAllBookings);

export default bookingRoute
