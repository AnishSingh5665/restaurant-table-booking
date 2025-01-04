const fs = require("fs");
const path = require("path");

const bookingsFilePath = path.join(__dirname, "../data/bookings.json");

// Load bookings data
const loadBookings = () => {
  if (!fs.existsSync(bookingsFilePath)) {
    fs.writeFileSync(bookingsFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(bookingsFilePath, "utf-8");
  return JSON.parse(data);
};

// Save bookings data
const saveBookings = (bookings) => {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
};

// Create a new booking
const createBooking = (req, res) => {
  const { name, contact, date, time, guests } = req.body;

  if (!name || !contact || !date || !time || !guests) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const bookings = loadBookings();
  const isSlotBooked = bookings.some(
    (booking) => booking.date === date && booking.time === time
  );

  if (isSlotBooked) {
    return res.status(400).json({ message: "Time slot already booked" });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    contact,
    date,
    time,
    guests,
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  res.status(201).json(newBooking);
};

// Get all bookings
const getBookings = (req, res) => {
  const bookings = loadBookings();
  res.json(bookings);
};

// Delete a booking
const deleteBooking = (req, res) => {
  const { id } = req.params;
  let bookings = loadBookings();

  const bookingExists = bookings.find((booking) => booking.id === parseInt(id));
  if (!bookingExists) {
    return res.status(404).json({ message: "Booking not found" });
  }

  bookings = bookings.filter((booking) => booking.id !== parseInt(id));
  saveBookings(bookings);

  res.json({ message: "Booking deleted successfully" });
};

module.exports = { createBooking, getBookings, deleteBooking };
