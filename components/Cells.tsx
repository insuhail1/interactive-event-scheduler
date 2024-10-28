import React, { useState, Suspense, lazy } from "react";
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
import { cn } from "@/utils/cn";
import { Event } from "@/utils/typings";
import { ACTION_TYPES, useEvents } from "@/context/EventsContext";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Spinner } from "@/components/ui/Spinner";

const EventForm = lazy(() => import("./EventForm"));
const UpdateEventForm = lazy(() => import("./UpdateEventForm"));

interface CellsProps {
  currentMonth: Date;
}

const Cells: React.FC<CellsProps> = ({ currentMonth }) => {
  const { state, dispatch } = useEvents();
  const { events, eventToUpdate } = state;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store the selected day for dialog
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deletedEvents, setDeletedEvents] = useState<string[]>([]);

  const onDeleteEvent = (eventId: string) => {
    dispatch({ type: ACTION_TYPES.DELETE_EVENT, id: eventId });
  };

  const onEditEvent = (event: Event) => {
    toggleDialog();
    dispatch({ type: ACTION_TYPES.SET_EVENT_TO_UPDATE, event });
  };

  const onDayClick = (day: Date) => {
    setSelectedDate(day);
    toggleDialog();
    dispatch({ type: ACTION_TYPES.SET_SELECTED_DATE, date: day });
    dispatch({ type: ACTION_TYPES.CLEAR_EVENT });
  };

  const handleDeleteEvent = (eventId: string) => {
    setDeletedEvents((prev) => [...prev, eventId]);
    setTimeout(() => {
      onDeleteEvent(eventId);
    }, 500);
  };

  const updateEvent = (id: string, title: string, isNew?: boolean) => {
    dispatch({ type: ACTION_TYPES.UPDATE_EVENT, id, title, isNew });
    dispatch({ type: ACTION_TYPES.CLEAR_EVENT });
  };

  function toggleDialog() {
    setDialogOpen((prev) => !prev);
  }

  const generateCalendarRows = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: any[] = [];
    let day = startDate;

    while (day <= endDate) {
      const daysInWeek: any[] = [];
      for (let i = 0; i < 7; i++) {
        const dayData = createDayData(day, monthStart);
        daysInWeek.push(dayData);
        day = addDays(day, 1);
      }
      rows.push(daysInWeek);
    }
    return rows;
  };

  const createDayData = (day: Date, monthStart: Date) => {
    const formattedDate = format(day, "d");
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isToday = isSameDay(day, new Date());
    const dayEvents = getEventsForDay(day);

    return {
      date: day,
      formattedDate,
      isCurrentMonth,
      isToday,
      events: dayEvents,
    };
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => format(day, "yyyy-MM-dd") === event.date);
  };

  const renderDayCell = (dayData: any) => {
    const { date, formattedDate, isCurrentMonth, isToday, events } = dayData;

    return (
      <div
        className={cn(
          `p-2 border hover:bg-gray-100 text-center`,
          !isCurrentMonth
            ? "text-gray-400"
            : isToday
            ? "bg-blue-200 font-bold"
            : ""
        )}
        key={date.toString()}
        onClick={() => onDayClick(date)}
      >
        <span className="block mb-1 text-sm sm:text-base">{formattedDate}</span>
        <div className="flex flex-col gap-2">
          {events.map((event: Event) => renderEvent(event))}
        </div>
      </div>
    );
  };

  const renderEvent = (event: Event) => {
    const isEventDeleted = deletedEvents.includes(event.id);
    const eventOpacity = isEventDeleted
      ? "opacity-0"
      : event.isNew
      ? "opacity-50"
      : "opacity-100";

    return (
      <div
        key={event.id}
        className={cn(
          `flex justify-between items-center bg-blue-100 w-full p-1 text-xs text-blue-600`,
          "border-l-2 border-blue-700",
          `cursor-text transition-opacity duration-500`,
          eventOpacity
        )}
        onClick={(e) => {
          e.stopPropagation();
          onEditEvent(event);
        }}
      >
        <span>{event.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteEvent(event.id);
          }}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          X
        </button>
      </div>
    );
  };

  return (
    <div>
      {generateCalendarRows().map((week, weekIndex) => (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7"
          key={weekIndex}
        >
          {week.map((dayData: any) => renderDayCell(dayData))}
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
        <DialogContent className="min-h-[200px]">
          <Suspense fallback={<Spinner />}>
            {selectedDate && !eventToUpdate && (
              <EventForm
                selectedDate={selectedDate}
                updateEvent={updateEvent}
                toggleDialog={toggleDialog}
              />
            )}
            {eventToUpdate && (
              <UpdateEventForm
                event={eventToUpdate}
                onUpdate={updateEvent}
                onCancel={() => {
                  dispatch({ type: ACTION_TYPES.CLEAR_EVENT });
                  toggleDialog();
                }}
              />
            )}
          </Suspense>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(Cells);
