import React, { useState, useMemo, useCallback } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ACTION_TYPES, useEvents } from "@/context/EventsContext";
import CalendarDayCell from "./Cell";
import CalendarDialog from "./Dialog";

const Cells: React.FC<{ currentMonth: Date }> = ({ currentMonth }) => {
  const { state, dispatch } = useEvents();
  const { events, eventToUpdate } = state;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [deletedEvents, setDeletedEvents] = useState<string[]>([]);

  const eventsByDate = useMemo(() => {
    const map = new Map();
    events.forEach((event) => {
      const date = format(new Date(event.date), "yyyy-MM-dd");
      if (!map.has(date)) map.set(date, []);
      map.get(date).push(event);
    });
    return map;
  }, [events]);

  const getEventsForDay = useCallback(
    (day: Date) => eventsByDate.get(format(day, "yyyy-MM-dd")) || [],
    [eventsByDate],
  );

  const clearEvent = useCallback(
    () => dispatch({ type: ACTION_TYPES.CLEAR_EVENT }),
    [dispatch],
  );

  const toggleDialog = useCallback(() => setDialogOpen((prev) => !prev), []);

  const onDayClick = useCallback(
    (day: Date) => {
      setSelectedDate(day);
      toggleDialog();
      dispatch({ type: ACTION_TYPES.SET_SELECTED_DATE, date: day });
      dispatch({ type: ACTION_TYPES.CLEAR_EVENT });
    },
    [dispatch, toggleDialog],
  );

  const onDeleteEvent = useCallback(
    (eventId: string) => {
      setDeletedEvents((prev) => [...prev, eventId]);
      setTimeout(
        () => dispatch({ type: ACTION_TYPES.DELETE_EVENT, id: eventId }),
        500,
      );
    },
    [dispatch],
  );

  const updateEvent = useCallback(
    (id: string, title: string, isNew?: boolean) => {
      dispatch({ type: ACTION_TYPES.UPDATE_EVENT, id, title, isNew });
      dispatch({ type: ACTION_TYPES.CLEAR_EVENT });
    },
    [dispatch],
  );

  const calendarRows = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(endOfMonth(monthStart));

    const rows = [];
    let day = startDate;
    while (day <= endDate) {
      rows.push(
        Array.from({ length: 7 }, () => {
          const dayData = {
            date: day,
            formattedDate: format(day, "d"),
            isCurrentMonth: isSameMonth(day, monthStart),
            isToday: isSameDay(day, new Date()),
            events: getEventsForDay(day),
          };
          day = addDays(day, 1);
          return dayData;
        }),
      );
    }
    return rows;
  }, [currentMonth, getEventsForDay]);

  return (
    <div>
      {calendarRows.map((week, index) => (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7"
          key={index}
        >
          {week.map((dayData) => (
            <CalendarDayCell
              key={dayData.date.toString()}
              dayData={dayData}
              onDayClick={onDayClick}
              onEditEvent={(event, e) => {
                e.stopPropagation();
                dispatch({ type: ACTION_TYPES.SET_EVENT_TO_UPDATE, event });
                toggleDialog();
              }}
              deletedEvents={deletedEvents}
            />
          ))}
        </div>
      ))}
      <CalendarDialog
        isDialogOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        selectedDate={selectedDate}
        onDeleteEvent={onDeleteEvent}
        eventToUpdate={eventToUpdate}
        updateEvent={updateEvent}
        clearEvent={clearEvent}
      />
    </div>
  );
};

export default React.memo(Cells);
