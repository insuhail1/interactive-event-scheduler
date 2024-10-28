import React, { Suspense } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Spinner } from "@/components/ui/Spinner";
import { Event } from "@/utils/typings";
import { DialogTitle } from "@radix-ui/react-dialog";

const EventForm = React.lazy(() => import("./EventForm"));
const UpdateEventForm = React.lazy(() => import("./UpdateEventForm"));

interface CalendarDialogProps {
  isDialogOpen: boolean;
  toggleDialog: () => void;
  selectedDate: Date | null;
  eventToUpdate: Event | null;
  updateEvent: (id: string, title: string, isNew?: boolean) => void;
  clearEvent: () => void;
}

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  isDialogOpen,
  toggleDialog,
  selectedDate,
  eventToUpdate,
  updateEvent,
  clearEvent,
}) => {
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
              onCancel={() => {
                clearEvent();
                toggleDialog();
              }}
            />
          )}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(CalendarDialog);
