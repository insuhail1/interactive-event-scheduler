export interface Event {
  date: string;
  id: string;
  isNew?: boolean;
  title: string;
}

export interface UpdateEventFormProps {
  event: { id: string; title: string; date: string };
  onUpdate: (id: string, title: string, isNew?: undefined) => void;
  onCancel: () => void;
}
