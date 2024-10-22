export interface Event {
  date: string;
  id: string;
  isNew?: boolean;
  title: string;
}

export interface CalendarProps {
  events: Event[];
  onDayClick: (day: Date) => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (event: Event) => void;
}

export interface HeaderProps {
  currentMonth: Date;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}

export interface CellsProps {
  currentMonth: Date;
  events: Event[];
  deletedEvents: string[];
  onDayClick: (date: Date) => void;
  onEditEvent: (event: Event) => void;
  handleDeleteEvent: (eventId: string) => void;
}

export interface UpdateEventFormProps {
  event: { id: string; title: string; date: string };
  onUpdate: (id: string, title: string) => void;
  onCancel: () => void;
}
