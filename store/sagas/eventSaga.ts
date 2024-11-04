import { takeLatest, put, delay } from "redux-saga/effects";
import { addEvent, addEventStart } from "@/store/slices/eventSlice";

function* handleAddEvent(action: ReturnType<typeof addEvent>) {
  try {
    const { payload } = action;

    addEvent(payload);
    yield put(addEvent(payload));
    yield delay(500);
  } catch (error) {
    console.error("Failed to add event:", error);
  }
}

function* watchEventActions() {
  yield takeLatest(addEventStart.type, handleAddEvent);
}

export default watchEventActions;
