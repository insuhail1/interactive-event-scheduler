import React, { useState } from "react";

interface EventFormProps {
  selectedDate: Date;
  addEvent: (date: Date, event: string) => void;
}

const EventForm: React.FC<EventFormProps> = ({ selectedDate, addEvent }) => {
  const [eventText, setEventText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventText.trim()) {
      setLoading(true);
      setTimeout(() => {
        addEvent(selectedDate, eventText);
        setEventText("");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-lg font-semibold mb-2">
        Add Event for {selectedDate.toLocaleDateString()}
      </h3>
      <input
        type="text"
        placeholder="Event description"
        value={eventText}
        onChange={(e) => setEventText(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        type="submit"
        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Event"}{" "}
      </button>
    </form>
  );
};

export default EventForm;
