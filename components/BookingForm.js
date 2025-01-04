import { useState } from "react";

export default function BookingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.date || !formData.time) {
      alert("Please fill all the required fields!");
      return;
    }
    onSubmit(formData); // Pass the data to parent
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Book a Table</h2>
      <div className="mb-4">
        <label className="block font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Number of Guests</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
