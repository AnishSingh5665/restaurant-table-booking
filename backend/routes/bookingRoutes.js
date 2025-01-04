const express = require("express");
const { createBooking, getBookings, deleteBooking } = require("../controllers/bookingController");

const router = express.Router();

// Define the routes
router.post("/", createBooking); // Create a booking
router.get("/", getBookings);   // Get all bookings
router.delete("/:id", deleteBooking); // Delete a booking

module.exports = router;
