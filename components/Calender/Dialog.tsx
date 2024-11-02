import React, { Suspense, useCallback } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Spinner } from "@/components/ui/Spinner";
import { Event } from "@/typings/event";

const EventForm = React.lazy(() => import("@/components/Event/CreateForm"));
const UpdateEventForm = React.lazy(
  () => import("@/components/Event/UpdateForm"),
);

interface CalendarDialogProps {
  isDialogOpen: boolean;
  toggleDialog: () => void;
  selectedDate: Date | null;
  eventToUpdate: Event | null;
  updateEvent: (id: string, title: string, isNew?: boolean) => void;
  clearEvent: () => void;
  onDeleteEvent: (id: string) => void;
}

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  isDialogOpen,
  toggleDialog,
  selectedDate,
  eventToUpdate,
  updateEvent,
  clearEvent,
  onDeleteEvent,
}) => {
  const handleCancel = useCallback(() => {
    clearEvent();
    toggleDialog();
  }, [clearEvent, toggleDialog]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogContent className="min-h-[200px]" aria-describedby="dialog">
        <DialogTitle title={eventToUpdate ? "Update" : "Create"} />
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
              onDeleteEvent={onDeleteEvent}
              onCancel={handleCancel}
            />
          )}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(CalendarDialog);
