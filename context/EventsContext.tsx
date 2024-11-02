import React, {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren,
} from "react";

import { Event } from "@/typings/event";

type State = {
  events: Event[];
  selectedDate: Date | null;
  eventToUpdate: Event | null;
};

export enum ACTION_TYPES {
  ADD_EVENT = "ADD_EVENT",
  DELETE_EVENT = "DELETE_EVENT",
  UPDATE_EVENT = "UPDATE_EVENT",
  SET_SELECTED_DATE = "SET_SELECTED_DATE",
  SET_EVENT_TO_UPDATE = "SET_EVENT_TO_UPDATE",
  CLEAR_EVENT = "CLEAR_EVENT",
}

type Action =
  | { type: ACTION_TYPES.ADD_EVENT; event: Event }
  | { type: ACTION_TYPES.DELETE_EVENT; id: string }
  | {
      type: ACTION_TYPES.UPDATE_EVENT;
      id: string;
      title: string;
      isNew?: boolean;
    }
  | { type: ACTION_TYPES.SET_SELECTED_DATE; date: Date }
  | { type: ACTION_TYPES.SET_EVENT_TO_UPDATE; event: Event }
  | { type: ACTION_TYPES.CLEAR_EVENT };

const initialState: State = {
  events: [],
  selectedDate: null,
  eventToUpdate: null,
};

const eventReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.ADD_EVENT:
      return { ...state, events: [...state.events, action.event] };
    case ACTION_TYPES.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.id),
      };
    case ACTION_TYPES.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.id
            ? {
                ...event,
                title: action.title,
                isNew: action.isNew,
              }
            : event,
        ),
      };
    case ACTION_TYPES.SET_SELECTED_DATE:
      return { ...state, selectedDate: action.date };
    case ACTION_TYPES.SET_EVENT_TO_UPDATE:
      return { ...state, eventToUpdate: action.event };
    case ACTION_TYPES.CLEAR_EVENT:
      return { ...state, eventToUpdate: null };
    default:
      return state;
  }
};

const EventsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const EventsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
