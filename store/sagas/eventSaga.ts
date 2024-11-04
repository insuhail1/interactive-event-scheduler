import { takeLatest, delay } from "redux-saga/effects";
import { addEvent, deleteEvent, updateEvent } from "@/store/slices/eventSlice";

function* handleAddEvent() {
  try {
    yield delay(500);
  } catch (error) {
    console.error("Failed to add event:", error);
  }
}

function* handleDeleteEvent() {
  try {
    yield delay(500);
  } catch (error) {
    console.error("Failed to delete event:", error);
  }
}

function* handleUpdateEvent() {
  try {
    yield delay(500);
  } catch (error) {
    console.error("Failed to update event:", error);
  }
}

function* watchEventActions() {
  yield takeLatest(addEvent.type, handleAddEvent);
  yield takeLatest(deleteEvent.type, handleDeleteEvent);
  yield takeLatest(updateEvent.type, handleUpdateEvent);
}

export default watchEventActions;
