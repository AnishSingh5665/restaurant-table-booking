const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/bookings", bookingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
