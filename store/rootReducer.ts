import { combineReducers } from "redux";
import eventReducer from "@/store/slices/eventSlice";

const rootReducer = combineReducers({
  event: eventReducer,
});

export default rootReducer;
