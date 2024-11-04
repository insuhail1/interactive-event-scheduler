import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@/typings/event";

type State = {
  loading: boolean;
  events: Event[];
  selectedDate: string | null;
  eventToUpdate: Event | null;
};

const initialState: State = {
  loading: false,
  events: [],
  selectedDate: null,
  eventToUpdate: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    addEventStart(state, _action: PayloadAction<Event>) {
      state.loading = true;
    },
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload);
      state.loading = false;
    },
    addEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(
        (event) => event.id !== action.payload,
      );
    },
    updateEvent(
      state,
      action: PayloadAction<{ id: string; title: string; isNew?: boolean }>,
    ) {
      const { id, title, isNew } = action.payload;
      const existingEvent = state.events.find((event) => event.id === id);
      if (existingEvent) {
        existingEvent.title = title;
        existingEvent.isNew = isNew;
      }
    },
    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
    setEventToUpdate(state, action: PayloadAction<Event>) {
      state.eventToUpdate = action.payload;
    },
    clearEvent(state) {
      state.eventToUpdate = null;
    },
  },
});

export const {
  addEvent,
  addEvents,
  addEventStart,
  deleteEvent,
  updateEvent,
  setSelectedDate,
  setEventToUpdate,
  clearEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
