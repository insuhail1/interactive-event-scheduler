import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { UpdateEventFormProps } from "@/typings/event";

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({
  event,
  onUpdate,
  onCancel,
  onDeleteEvent,
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

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onCancel();
      onDeleteEvent(event.id);
    },
    [event.id, onDeleteEvent, onCancel],
  );

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="mb-2 text-lg font-semibold">
        Update {event.title} Date: {new Date(event.date).toLocaleDateString()}
      </h3>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mr-2 w-full rounded border p-2"
        required
      />
      <Button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-green-500 hover:bg-green-700 sm:w-max"
      >
        {loading ? "Updating..." : "Update Event"}
      </Button>

      <Button
        onClick={handleDelete}
        className="ml-2 w-full text-red-500 hover:text-red-700 sm:w-max"
        variant="destructive"
      >
        X Delete
      </Button>
    </form>
  );
};

export default UpdateEventForm;
