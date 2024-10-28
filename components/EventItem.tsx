import React, { useCallback } from "react";
import { Event } from "@/utils/typings";
import { cn } from "@/utils/cn";

interface EventItemProps {
  event: Event;
  isDeleted: boolean;
  onDelete: (id: string) => void;
  onEdit: (event: Event, e: React.MouseEvent) => void;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  isDeleted,
  onDelete,
  onEdit,
}) => {
  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(event.id);
    },
    [event.id, onDelete]
  );

  const eventOpacity = isDeleted
    ? "opacity-0"
    : event.isNew
    ? "opacity-50"
    : "opacity-100";

  return (
    <div
      key={event.id}
      className={cn(
        "flex justify-between items-center bg-blue-100 w-full p-1 text-xs text-blue-600",
        "border-l-2 border-blue-700 cursor-text transition-opacity duration-500",
        eventOpacity
      )}
      onClick={(e) => onEdit(event, e)}
    >
      <span>{event.title}</span>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        X
      </button>
    </div>
  );
};

export default React.memo(EventItem);
