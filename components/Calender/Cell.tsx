import React from "react";

import { Event } from "@/typings/event";
import EventItem from "@/components/Event/Item";
import { cn } from "@/utils/cn";

interface CalendarDayCellProps {
  dayData: {
    events: Event[];
    isToday: boolean;
    date: Date;
    formattedDate: string;
    isCurrentMonth: boolean;
  };
  onDayClick: (date: Date) => void;
  onEditEvent: (event: Event, e: React.MouseEvent) => void;
  deletedEvents: string[];
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  dayData,
  onDayClick,
  onEditEvent,
  deletedEvents,
}) => {
  const { date, formattedDate, isCurrentMonth, isToday, events } = dayData;

  return (
    <div
      className={cn(
        "min-h-24 border p-2 text-center hover:bg-gray-100",
        !isCurrentMonth
          ? "text-gray-400"
          : isToday
            ? "bg-blue-200 font-bold"
            : "",
      )}
      onClick={() => onDayClick(date)}
    >
      <span className="mb-1 block text-sm sm:text-base">{formattedDate}</span>
      <div className="flex flex-col gap-2">
        {events.map((event: Event) => (
          <EventItem
            key={event.id}
            event={event}
            isDeleted={deletedEvents.includes(event.id)}
            onEdit={onEditEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CalendarDayCell);
