import React from "react";
import { Event } from "@/utils/typings";
import EventItem from "./EventItem";
import { cn } from "@/utils/cn";

interface CalendarDayCellProps {
  dayData: any;
  onDayClick: (date: Date) => void;
  onDeleteEvent: (id: string) => void;
  onEditEvent: (event: Event, e: React.MouseEvent) => void;
  deletedEvents: string[];
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  dayData,
  onDayClick,
  onDeleteEvent,
  onEditEvent,
  deletedEvents,
}) => {
  const { date, formattedDate, isCurrentMonth, isToday, events } = dayData;

  return (
    <div
      className={cn(
        "p-2 border hover:bg-gray-100 text-center",
        !isCurrentMonth
          ? "text-gray-400"
          : isToday
          ? "bg-blue-200 font-bold"
          : ""
      )}
      onClick={() => onDayClick(date)}
    >
      <span className="block mb-1 text-sm sm:text-base">{formattedDate}</span>
      <div className="flex flex-col gap-2">
        {events.map((event: Event) => (
          <EventItem
            key={event.id}
            event={event}
            isDeleted={deletedEvents.includes(event.id)}
            onDelete={onDeleteEvent}
            onEdit={onEditEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CalendarDayCell);
