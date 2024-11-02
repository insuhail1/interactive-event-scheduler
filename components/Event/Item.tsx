import React from "react";

import { Event } from "@/typings/event";
import { cn } from "@/utils/cn";

interface EventItemProps {
  event: Event;
  isDeleted: boolean;
  onEdit: (event: Event, e: React.MouseEvent) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, isDeleted, onEdit }) => {
  const eventOpacity = isDeleted
    ? "opacity-0"
    : event.isNew
      ? "opacity-50"
      : "opacity-100";

  return (
    <div
      key={event.id}
      className={cn(
        "flex w-full items-center justify-between overflow-clip bg-blue-100 p-1 text-xs text-blue-600",
        "cursor-text border-l-2 border-blue-700 transition-opacity duration-500",
        eventOpacity,
      )}
      onClick={(e) => onEdit(event, e)}
    >
      <span>{event.title}</span>
    </div>
  );
};

export default React.memo(EventItem);
