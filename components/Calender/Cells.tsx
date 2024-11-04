import React, { useState, useMemo, useCallback, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setSelectedDate,
  clearEvent,
  deleteEvent,
  updateEvent,
  setEventToUpdate,
} from "@/store/slices/eventSlice";

import CalendarDayCell from "./Cell";
import CalendarDialog from "./Dialog";

const Cells: React.FC<{ currentMonth: Date }> = ({ currentMonth }) => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.event.events);
  const eventToUpdate = useSelector(
    (state: RootState) => state.event.eventToUpdate,
  );

  const [rowHeight, setRowHeight] = useState("auto");

  useEffect(() => {
    const headerElement = document.getElementById("header");
    if (headerElement) {
      const headerHeight = headerElement.clientHeight;
      const availableHeight = window.innerHeight - headerHeight;
      const calculatedRowHeight = availableHeight / 5;
      setRowHeight(`${calculatedRowHeight - 10}px`);
    }
  }, []);

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

  const toggleDialog = useCallback(() => setDialogOpen((prev) => !prev), []);

  const onDayClick = useCallback(
    (day: Date) => {
      toggleDialog();
      dispatch(setSelectedDate(day.toISOString()));
      dispatch(clearEvent());
    },
    [dispatch, toggleDialog],
  );

  const onDeleteEvent = useCallback(
    (eventId: string) => {
      setDeletedEvents((prev) => [...prev, eventId]);
      setTimeout(() => dispatch(deleteEvent(eventId)), 500);
    },
    [dispatch],
  );

  const updateEventHandler = useCallback(
    (id: string, title: string, isNew?: boolean) => {
      dispatch(updateEvent({ id, title, isNew }));
      dispatch(clearEvent());
    },
    [],
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
    <>
      <div className="flex flex-1 flex-col">
        {calendarRows.map((week, index) => (
          <div
            className="grid grid-cols-7"
            key={index}
            style={{ height: rowHeight }}
          >
            {week.map((dayData) => (
              <CalendarDayCell
                key={dayData.date.toString()}
                dayData={dayData}
                onDayClick={onDayClick}
                onEditEvent={(event, e) => {
                  e.stopPropagation();
                  dispatch(setEventToUpdate(event));
                  toggleDialog();
                }}
                deletedEvents={deletedEvents}
              />
            ))}
          </div>
        ))}
      </div>

      <CalendarDialog
        isDialogOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        onDeleteEvent={onDeleteEvent}
        eventToUpdate={eventToUpdate}
        updateEvent={updateEventHandler}
      />
    </>
  );
};

export default React.memo(Cells);
