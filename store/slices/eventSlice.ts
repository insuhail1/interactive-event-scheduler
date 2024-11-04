import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@/typings/event";

type State = {
  events: Event[];
  selectedDate: string | null;
  eventToUpdate: Event | null;
};

const initialState: State = {
  events: [],
  selectedDate: null,
  eventToUpdate: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload);
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
  deleteEvent,
  updateEvent,
  setSelectedDate,
  setEventToUpdate,
  clearEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
