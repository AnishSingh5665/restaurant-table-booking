import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);

  // Function to fetch available slots for the selected date
  const fetchAvailableSlots = async (date) => {
    try {
      // Make a GET request to the backend API
      const response = await axios.get("http://localhost:5000/api/bookings");

      if (response.status === 200) {
        const bookings = response.data;

        // Filter unavailable slots for the selected date
        const unavailableSlots = bookings
          .filter((booking) => booking.date === date)
          .map((booking) => booking.time);

        // Define all possible time slots
        const allSlots = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

        // Calculate available slots
        const availableSlots = allSlots.filter((slot) => !unavailableSlots.includes(slot));
        setAvailableSlots(availableSlots);
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    }
  };

  // Fetch available slots whenever the date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date);
    }
  }, [formData.date]);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend API
      const response = await axios.post("http://localhost:5000/api/bookings", formData);

      if (response.status === 201) {
        alert("Table booked successfully!");
        setAvailableSlots([]); // Clear slots after booking
        setFormData({ date: "", time: "", guests: "", name: "", contact: "" }); // Reset form
      }
    } catch (error) {
      alert("Error booking table: " + error.response?.data?.message || "Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Restaurant Table Booking</h1>
      <form onSubmit={handleFormSubmit}>
        <label className="block mb-2">
          Date:
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Time:
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            className="border rounded p-2 w-full"
          >
            <option value="" disabled>
              Select a time
            </option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Number of Guests:
          <input
            type="number"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            required
            min="1"
            className="border rounded p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Contact:
          <input
            type="text"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Book Your Table
        </button>
      </form>
    </div>
  );
}
