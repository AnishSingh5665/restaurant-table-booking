export default function AvailableSlots({ slots, onSelect }) {
    return (
      <div className="max-w-md mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4">Available Slots</h2>
        {slots.length === 0 ? (
          <p>No slots available for the selected date and time.</p>
        ) : (
          <ul className="space-y-2">
            {slots.map((slot, index) => (
              <li key={index}>
                <button
                  onClick={() => onSelect(slot)}
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  {slot}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  