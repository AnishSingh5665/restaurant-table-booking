export default function BookingSummary({ reservation }) {
    return (
      <div className="max-w-md mx-auto mt-6 p-4 bg-green-100 shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
        <p><strong>Name:</strong> {reservation.name}</p>
        <p><strong>Contact:</strong> {reservation.contact}</p>
        <p><strong>Date:</strong> {reservation.date}</p>
        <p><strong>Time:</strong> {reservation.time}</p>
        <p><strong>Guests:</strong> {reservation.guests}</p>
      </div>
    );
  }
  