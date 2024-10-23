import { UpdateEventFormProps } from "@/utils/typings";
import React, { useState } from "react";

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({
  event,
  onUpdate,
  onCancel,
}) => {
  const [title, setTitle] = useState(event.title);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      setLoading(true);

      setTimeout(() => {
        onUpdate(event.id, title);
        onCancel();
        setTitle("");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="text-lg font-semibold mb-2">
        Update {event.title} Date: {new Date(event.date).toLocaleDateString()}
      </h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 mr-2 w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 mt-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        {loading ? "Updating..." : "Update Event"}
      </button>
    </form>
  );
};

export default UpdateEventForm;
