import React, { useCallback } from "react";
import { format } from "date-fns";

import Calendar from "@/components/Calendar";
import EventForm from "@/components/EventForm";
import UpdateEventForm from "@/components/UpdateEventForm";
import { Event } from "@/utils/typings";
import {
  ACTION_TYPES,
  EventsProvider,
  useEvents,
} from "@/context/EventsContext";

const HomePage: React.FC = () => {
  const { state, dispatch } = useEvents();

  const { events, selectedDate, eventToUpdate } = state;

  const updateEvent = (id: string, title: string, isNew?: boolean) => {
    dispatch({ type: ACTION_TYPES.UPDATE_EVENT, id, title, isNew });
    dispatch({ type: ACTION_TYPES.CLEAR_EVENT });
  };

  const addEvent = useCallback(
    (date: Date, title: string) => {
      const newEvent = {
        id: `${new Date().toISOString()}-${title}`,
        title,
        date: format(date, "yyyy-MM-dd"),
      };

      dispatch({
        type: ACTION_TYPES.ADD_EVENT,
        event: { ...newEvent, isNew: true },
      });

      setTimeout(() => {
        updateEvent(newEvent.id, title, undefined);
      }, 1000);
    },
    [events]
  );

  const onDayClick = (day: Date) => {
    dispatch({ type: ACTION_TYPES.SET_SELECTED_DATE, date: day });
    dispatch({ type: ACTION_TYPES.CLEAR_EVENT });
  };

  const onDeleteEvent = (eventId: string) => {
    dispatch({ type: ACTION_TYPES.DELETE_EVENT, id: eventId });
  };

  const onEditEvent = (event: Event) => {
    dispatch({ type: ACTION_TYPES.SET_EVENT_TO_UPDATE, event });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Interactive Event Scheduler
      </h1>
      <Calendar
        events={events}
        onDayClick={onDayClick}
        onDeleteEvent={onDeleteEvent}
        onEditEvent={onEditEvent}
      />
      {selectedDate && !eventToUpdate && (
        <EventForm selectedDate={selectedDate} addEvent={addEvent} />
      )}
      {eventToUpdate && (
        <UpdateEventForm
          event={eventToUpdate}
          onUpdate={updateEvent}
          onCancel={() => dispatch({ type: ACTION_TYPES.CLEAR_EVENT })}
        />
      )}
    </div>
  );
};

const HomePageWrapper = () => (
  <EventsProvider>
    <HomePage />
  </EventsProvider>
);

export default HomePageWrapper;
