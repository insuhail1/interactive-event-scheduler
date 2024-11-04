import { takeLatest, delay, call } from "redux-saga/effects";
import { addEvent, deleteEvent, updateEvent } from "@/store/slices/eventSlice";

function* simulateAsyncTask() {
  try {
    yield delay(500);
  } catch (error) {
    console.error("Async task failed:", error);
  }
}

function* handleAddEvent() {
  yield call(simulateAsyncTask);
}

function* handleDeleteEvent() {
  yield call(simulateAsyncTask);
}

function* handleUpdateEvent() {
  yield call(simulateAsyncTask);
}

function* watchEventActions() {
  yield takeLatest(addEvent.type, handleAddEvent);
  yield takeLatest(deleteEvent.type, handleDeleteEvent);
  yield takeLatest(updateEvent.type, handleUpdateEvent);
}

export default watchEventActions;
