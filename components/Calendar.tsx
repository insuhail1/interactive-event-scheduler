import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import Header from "./Header";
import Days from "./Days";
import Cells from "./Cells";
import { CalendarProps } from "@/utils/typings";

const DURATION = 500;

const Calendar: React.FC<CalendarProps> = ({
  events,
  onDayClick,
  onDeleteEvent,
  onEditEvent,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [deletedEvents, setDeletedEvents] = useState<string[]>([]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDeleteEvent = (eventId: string) => {
    setDeletedEvents((prev) => [...prev, eventId]);
    setTimeout(() => {
      onDeleteEvent(eventId);
    }, DURATION);
  };

  return (
    <div className="p-4">
      <Header
        currentMonth={currentMonth}
        onNextMonth={nextMonth}
        onPrevMonth={prevMonth}
      />
      <Days currentMonth={currentMonth} />
      <Cells
        currentMonth={currentMonth}
        events={events}
        deletedEvents={deletedEvents}
        onDayClick={onDayClick}
        onEditEvent={onEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default Calendar;
