import React, { useState, useCallback } from "react";
import { format } from "date-fns";

import { UpdateEventFormProps } from "@/typings/event";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { addEvent } from "@/store/slices/eventSlice";
import { useDispatch } from "react-redux";

interface EventFormProps {
  selectedDate: Date;
  toggleDialog: () => void;
  updateEvent: UpdateEventFormProps["onUpdate"];
}

const EventForm: React.FC<EventFormProps> = ({
  selectedDate,
  updateEvent,
  toggleDialog,
}) => {
  const dispatch = useDispatch();
  const [eventText, setEventText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddEvent = useCallback((date: Date, title: string) => {
    const newEvent = {
      id: `${new Date().toISOString()}-${title}`,
      title,
      date: format(date, "yyyy-MM-dd"),
    };

    dispatch(addEvent({ ...newEvent, isNew: true }));

    toggleDialog();

    setTimeout(() => {
      updateEvent(newEvent.id, title, undefined);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventText.trim()) {
      setLoading(true);
      setTimeout(() => {
        handleAddEvent(selectedDate, eventText);
        setEventText("");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="mb-2 text-lg font-semibold">
        Add Event for {selectedDate.toLocaleDateString()}
      </h3>
      <Input
        type="text"
        placeholder="Event description"
        value={eventText}
        onChange={(e) => setEventText(e.target.value)}
        className="mb-4 w-full rounded border p-2"
      />
      <Button
        type="submit"
        disabled={loading || !eventText}
        className="w-full sm:w-max"
      >
        {loading ? "Adding..." : "Add Event"}
      </Button>
    </form>
  );
};

export default EventForm;
